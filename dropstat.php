<?php
/**
 * Soo Taasteplaan - Drop Statistics Dashboard
 * 
 * Displays detailed drop analytics from drop_logs.csv
 * Access: https://your-server/dropstat.php
 */

// Prevent caching
header('Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0');
header('Pragma: no-cache');
header('Expires: 0');
header('Surrogate-Control: no-store');
header('X-Accel-Expires: 0');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Vary: Accept-Encoding');

// ============ CONFIGURATION ============
$tz = 'Europe/Tallinn';
if (function_exists('date_default_timezone_set')) {
    date_default_timezone_set($tz);
}

$csvFile = __DIR__ . '/drop_logs.csv';

$cardIds = [
    'tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu',
    'arvuti_mudel', 'taastamiskava', 'ehitusprojekt', 'teoks_tegemine', 'jarelevalve'
];

$cardTitles = [
    'tahame_taastada' => 'Tahaks soo taastada',
    'kes_on_omanik' => 'Kes on omanik?',
    'mis_on_lugu' => 'Milline on ajalugu?',
    'palju_raha' => 'Kui palju on vaja raha?',
    'milline_praegu' => 'Kes siin elavad?',
    'arvuti_mudel' => 'Katseta virtuaalselt',
    'taastamiskava' => 'Taastamiskava koostamine',
    'ehitusprojekt' => 'Ehitusprojekti tellimine',
    'teoks_tegemine' => 'Taastamistööd maastikul',
    'jarelevalve' => 'Mis saab edasi?'
];

// ============ PARSE CSV ============
$sessions = [];
if (file_exists($csvFile) && is_readable($csvFile)) {
    $handle = fopen($csvFile, 'r');
    $header = fgetcsv($handle);
    while (($row = fgetcsv($handle)) !== false) {
        // CSV format: datetime,ip,trigger,total_drops,correct_drops,incorrect_drops,failed_drops,drops,usage_time_seconds
        if (count($row) >= 9) {
            $rawDate = trim($row[0] ?? '', " \t\n\r\"");
            if (strtolower($rawDate) === 'datetime' || $rawDate === '') {
                continue;
            }

            $ts = @strtotime($rawDate);
            if ($ts === false) {
                $isoNoMs = preg_replace('/\.(\d+)(?=Z$)/', '', $rawDate);
                $ts = @strtotime($isoNoMs);
            }
            $datetime = $ts !== false ? date('Y-m-d H:i:s', $ts) : $rawDate;

            // Parse drops JSON
            $dropsJson = $row[7] ?? '[]';
            $drops = json_decode($dropsJson, true) ?: [];

            $sessions[] = [
                'datetime' => $datetime,
                'trigger' => $row[2],
                'total_drops' => (int)($row[3] ?? 0),
                'correct_drops' => (int)($row[4] ?? 0),
                'incorrect_drops' => (int)($row[5] ?? 0),
                'failed_drops' => (int)($row[6] ?? 0),
                'drops' => $drops,
                'duration' => (int)($row[8] ?? 0)
            ];
        }
    }
    fclose($handle);
}

// ============ CALCULATE STATISTICS ============

// Overall counts
$finalized = 0;
$abandoned = 0;
$totalDurations = ['finalized' => [], 'abandoned' => []];

// Drop count distribution
$dropCountDist = []; // [count => ['sessions' => n, 'durations' => [...]]]

// Daily data
$dailyData = [];

// Card × Slot cross table for correct/incorrect/failed drops
$crossTableCorrect = [];
$crossTableIncorrect = [];
$cardFailedDrops = []; // card => count of failed drops

foreach ($cardIds as $cardId) {
    $crossTableCorrect[$cardId] = array_fill(0, 10, 0);
    $crossTableIncorrect[$cardId] = array_fill(0, 10, 0);
    $cardFailedDrops[$cardId] = 0;
}

// Problematic cards and slots
$cardIncorrectTotal = [];
$slotIncorrectTotal = array_fill(0, 10, 0);

foreach ($sessions as $s) {
    $isFinalized = $s['trigger'] === 'confirm';
    $totalDrops = $s['total_drops'];
    
    // Count finalized vs abandoned
    if ($isFinalized) {
        $finalized++;
        $totalDurations['finalized'][] = $s['duration'];
    } else {
        $abandoned++;
        $totalDurations['abandoned'][] = $s['duration'];
    }
    
    // Drop count distribution
    if (!isset($dropCountDist[$totalDrops])) {
        $dropCountDist[$totalDrops] = ['sessions' => 0, 'durations' => []];
    }
    $dropCountDist[$totalDrops]['sessions']++;
    $dropCountDist[$totalDrops]['durations'][] = $s['duration'];
    
    // Daily data
    $date = substr($s['datetime'], 0, 10);
    if (!isset($dailyData[$date])) {
        $dailyData[$date] = [
            'finalized' => 0, 
            'abandoned' => 0, 
            'total' => 0,
            'failed_drops' => 0,
            'sessions_count' => 0
        ];
    }
    $dailyData[$date]['total']++;
    $dailyData[$date]['sessions_count']++;
    $dailyData[$date]['failed_drops'] += $s['failed_drops'];
    if ($isFinalized) {
        $dailyData[$date]['finalized']++;
    } else {
        $dailyData[$date]['abandoned']++;
    }
    
    // Process individual drops for cross table
    foreach ($s['drops'] as $drop) {
        $cardId = $drop['card'] ?? '';
        $slot = $drop['slot'];
        $result = $drop['result'] ?? '';
        
        if (!isset($crossTableCorrect[$cardId])) continue;
        
        if ($result === 'correct' && $slot !== null) {
            $crossTableCorrect[$cardId][$slot]++;
        } elseif ($result === 'incorrect' && $slot !== null) {
            $crossTableIncorrect[$cardId][$slot]++;
            // Track problematic cards and slots
            if (!isset($cardIncorrectTotal[$cardId])) {
                $cardIncorrectTotal[$cardId] = 0;
            }
            $cardIncorrectTotal[$cardId]++;
            $slotIncorrectTotal[$slot]++;
        } elseif ($result === 'fail') {
            $cardFailedDrops[$cardId]++;
        }
    }
}

ksort($dailyData);
ksort($dropCountDist);

// Calculate average durations
$avgDurationFinalized = count($totalDurations['finalized']) > 0 
    ? round(array_sum($totalDurations['finalized']) / count($totalDurations['finalized'])) 
    : 0;
$avgDurationAbandoned = count($totalDurations['abandoned']) > 0 
    ? round(array_sum($totalDurations['abandoned']) / count($totalDurations['abandoned'])) 
    : 0;

// Calculate total drops and average
$totalDropsSum = 0;
$totalSessionsWithDrops = 0;
foreach ($dropCountDist as $count => $data) {
    $totalDropsSum += $count * $data['sessions'];
    $totalSessionsWithDrops += $data['sessions'];
}
$avgDropsPerSession = $totalSessionsWithDrops > 0 
    ? round($totalDropsSum / $totalSessionsWithDrops, 1) 
    : 0;

// Find max count for cross table intensity
$maxCountCorrect = 1;
$maxCountIncorrect = 1;
foreach ($crossTableCorrect as $cardId => $slots) {
    $maxCountCorrect = max($maxCountCorrect, max($slots));
}
foreach ($crossTableIncorrect as $cardId => $slots) {
    $maxCountIncorrect = max($maxCountIncorrect, max($slots));
}
$maxCountFailed = max(1, max($cardFailedDrops));

// Sort problematic cards by incorrect count
arsort($cardIncorrectTotal);

// ============ OUTPUT HTML ============
?>
<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soo Taasteplaan - Droppimiste statistika</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f4f6fb;
            color: #212121;
        }
        h1 { color: #3f51b5; margin-bottom: 0.5rem; }
        h2 { color: #3f51b5; margin-top: 2rem; border-bottom: 2px solid #3f51b5; padding-bottom: 0.5rem; }
        .subtitle { color: #666; margin-bottom: 2rem; }
        
        .dashboard { max-width: 1400px; margin: 0 auto; }
        
        .row {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }
        
        .card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            flex: 1;
            min-width: 300px;
        }
        
        .card h3 { margin-top: 0; color: #3f51b5; }
        
        .chart-container { position: relative; height: 300px; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #3f51b5; color: white; }
        tr:hover { background: #f5f5f5; }
        
        .cross-table { overflow-x: auto; }
        .cross-table table { font-size: 0.85rem; }
        .cross-table th, .cross-table td { text-align: center; padding: 0.5rem; min-width: 50px; }
        .cross-table th.card-name { text-align: left; min-width: 180px; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cross-table td.card-name { text-align: left; font-weight: 500; background: #fafafa; }
        
        .cell-correct { background-color: rgba(76, 175, 80, var(--intensity)); }
        .cell-incorrect { background-color: rgba(244, 67, 54, var(--intensity)); }
        .cell-failed { background-color: rgba(255, 152, 0, var(--intensity)); }
        
        .period-selector { margin-bottom: 1rem; }
        .period-selector button {
            padding: 0.5rem 1rem;
            margin-right: 0.5rem;
            border: 1px solid #3f51b5;
            background: white;
            color: #3f51b5;
            border-radius: 4px;
            cursor: pointer;
        }
        .period-selector button.active { background: #3f51b5; color: white; }
        
        .no-data { text-align: center; padding: 3rem; color: #666; }
        
        .legend { display: flex; gap: 1.5rem; margin-top: 1rem; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 0.5rem; }
        .legend-color { width: 20px; height: 20px; border-radius: 4px; }
        
        .stat-number { font-size: 2rem; font-weight: bold; color: #3f51b5; }
        .stat-label { color: #666; font-size: 0.9rem; }
        
        .nav-link { 
            display: inline-block; 
            margin-bottom: 1rem; 
            color: #3f51b5; 
            text-decoration: none;
        }
        .nav-link:hover { text-decoration: underline; }
        
        @media (max-width: 768px) {
            .row { flex-direction: column; }
            .card { min-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <a href="statistika.php" class="nav-link">← Tagasi vanale statistikale</a>
        <h1>📊 Soo Taasteplaan - Droppimiste statistika</h1>
        <?php
        $lastSubmission = '';
        if (count($sessions) > 0) {
            $last = end($sessions);
            $lastSubmission = $last['datetime'];
            $ts = strtotime($lastSubmission);
            if ($ts !== false) {
                $lastSubmission = date('d.m.Y H:i', $ts);
            }
        }
        ?>
        <p class="subtitle">Viimati uuendatud: <?= date('d.m.Y H:i') ?> | Kokku sessioone: <?= count($sessions) ?> | Viimane tulemus: <?= htmlspecialchars($lastSubmission) ?></p>
        
        <?php if (count($sessions) === 0): ?>
        <div class="card no-data">
            <h3>Andmeid pole veel</h3>
            <p>Droppide logisid ei ole veel kogutud või fail <code>drop_logs.csv</code> ei ole leitav.</p>
        </div>
        <?php else: ?>
        
        <!-- Overview Row -->
        <div class="row">
            <div class="card">
                <h3>🎯 Tulemuste jaotus</h3>
                <div class="chart-container">
                    <canvas id="pieChart"></canvas>
                </div>
            </div>
            
            <div class="card">
                <h3>📋 Kokkuvõte droppide arvu järgi</h3>
                <div style="max-height: 350px; overflow-y: auto;">
                <table>
                    <tr>
                        <th>Droppide arv</th>
                        <th>Mängude arv</th>
                        <th>%</th>
                        <th>Kesk. kestus</th>
                    </tr>
                    <?php 
                    $totalSessions = count($sessions);
                    foreach ($dropCountDist as $dropCount => $data): 
                        $pct = $totalSessions > 0 ? round($data['sessions'] / $totalSessions * 100, 1) : 0;
                        $avgDur = count($data['durations']) > 0 ? round(array_sum($data['durations']) / count($data['durations'])) : 0;
                        $rowClass = $dropCount < 10 ? 'style="color: #999;"' : '';
                    ?>
                    <tr <?= $rowClass ?>>
                        <td><?= $dropCount ?><?= $dropCount < 10 ? ' (pooleli)' : '' ?></td>
                        <td><?= $data['sessions'] ?></td>
                        <td><?= $pct ?>%</td>
                        <td><?= gmdate("i:s", $avgDur) ?></td>
                    </tr>
                    <?php endforeach; ?>
                    <tr style="font-weight: bold; background: #e8eaf6;">
                        <td>Keskmine</td>
                        <td colspan="2"><?= $avgDropsPerSession ?> dropi/mäng</td>
                        <td>-</td>
                    </tr>
                </table>
                </div>
            </div>
        </div>
        
        <!-- Time Series -->
        <h2>📈 Dünaamika ajas</h2>
        
        <div class="period-selector">
            <button class="active" data-period="week">Viimane nädal</button>
            <button data-period="month">Viimane kuu</button>
            <button data-period="all">Kõik</button>
        </div>
        
        <div class="row">
            <div class="card">
                <h3>Lõpetatud vs katkestatud (%)</h3>
                <div class="chart-container">
                    <canvas id="percentChart"></canvas>
                </div>
            </div>
            
            <div class="card">
                <h3>Sessioonide arv</h3>
                <div class="chart-container">
                    <canvas id="countChart"></canvas>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="card">
                <h3>Keskmine ebaõnnestunud droppide arv sessiooni kohta</h3>
                <div class="chart-container">
                    <canvas id="failedChart"></canvas>
                </div>
            </div>
        </div>
        
        <!-- Cross Table -->
        <h2>🎲 Kaartide paigutamine slottidesse</h2>
        <p class="subtitle">Näitab, mitu korda iga kaart droppiti igasse slotti (kõik sessioonid, kõik droppimised)</p>
        
        <div class="legend">
            <div class="legend-item">
                <div class="legend-color" style="background: rgba(76, 175, 80, 0.7);"></div>
                <span>Õiged droppimised</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: rgba(244, 67, 54, 0.7);"></div>
                <span>Valed droppimised</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: rgba(255, 152, 0, 0.7);"></div>
                <span>Ebaõnnestunud (mööda)</span>
            </div>
        </div>
        
        <div class="card cross-table">
            <table>
                <tr>
                    <th class="card-name">Kaart</th>
                    <?php for ($i = 1; $i <= 10; $i++): ?>
                    <th><?= $i ?>.</th>
                    <?php endfor; ?>
                    <th style="background: #ff9800;">Mööda</th>
                </tr>
                <?php foreach ($cardIds as $rowIndex => $cardId): ?>
                <tr>
                    <td class="card-name" title="<?= htmlspecialchars($cardTitles[$cardId] ?? $cardId) ?>">
                        <?= htmlspecialchars($cardTitles[$cardId] ?? $cardId) ?>
                    </td>
                    <?php for ($slot = 0; $slot < 10; $slot++): 
                        $correctCount = $crossTableCorrect[$cardId][$slot];
                        $incorrectCount = $crossTableIncorrect[$cardId][$slot];
                        $totalSlot = $correctCount + $incorrectCount;
                        
                        // Show as "correct / incorrect" or just the number
                        if ($totalSlot > 0) {
                            if ($correctCount > 0 && $incorrectCount > 0) {
                                $display = "<span style='color:green'>$correctCount</span>/<span style='color:red'>$incorrectCount</span>";
                            } elseif ($correctCount > 0) {
                                $display = "<span style='color:green'>$correctCount</span>";
                            } else {
                                $display = "<span style='color:red'>$incorrectCount</span>";
                            }
                        } else {
                            $display = '-';
                        }
                        
                        // Background intensity based on total
                        $maxTotal = max($maxCountCorrect, $maxCountIncorrect);
                        $intensity = $totalSlot > 0 ? max(0.1, min(0.5, $totalSlot / $maxTotal)) : 0;
                        $bgColor = $correctCount >= $incorrectCount ? "rgba(76, 175, 80, $intensity)" : "rgba(244, 67, 54, $intensity)";
                    ?>
                    <td style="background-color: <?= $bgColor ?>;">
                        <?= $display ?>
                    </td>
                    <?php endfor; ?>
                    <?php 
                        $failedCount = $cardFailedDrops[$cardId];
                        $failedIntensity = $failedCount > 0 ? max(0.2, min(0.8, $failedCount / $maxCountFailed)) : 0;
                    ?>
                    <td class="cell-failed" style="--intensity: <?= $failedIntensity ?>;">
                        <?= $failedCount > 0 ? $failedCount : '-' ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </table>
        </div>
        
        <!-- Problematic cards and slots -->
        <h2>⚠️ Probleemsed kaardid ja slotid</h2>
        
        <div class="row">
            <div class="card">
                <h3>Kaardid, millega tehakse enim vigu</h3>
                <div class="chart-container">
                    <canvas id="problemCardsChart"></canvas>
                </div>
            </div>
            
            <div class="card">
                <h3>Slotid, kuhu tehakse enim valesid droppimisi</h3>
                <div class="chart-container">
                    <canvas id="problemSlotsChart"></canvas>
                </div>
            </div>
        </div>
        
        <?php endif; ?>
    </div>
    
    <script>
    <?php if (count($sessions) > 0): ?>
    // Data from PHP
    const finalized = <?= $finalized ?>;
    const abandoned = <?= $abandoned ?>;
    const dailyData = <?= json_encode($dailyData) ?>;
    const cardIncorrectTotal = <?= json_encode($cardIncorrectTotal) ?>;
    const slotIncorrectTotal = <?= json_encode($slotIncorrectTotal) ?>;
    const cardTitles = <?= json_encode($cardTitles) ?>;
    
    // Colors
    const colors = {
        finalized: 'rgba(76, 175, 80, 0.8)',
        abandoned: 'rgba(158, 158, 158, 0.8)'
    };
    
    // Pie Chart - only Finalized/Abandoned
    new Chart(document.getElementById('pieChart'), {
        type: 'doughnut',
        data: {
            labels: ['Lõpetatud', 'Katkestatud'],
            datasets: [{
                data: [finalized, abandoned],
                backgroundColor: [colors.finalized, colors.abandoned],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
    
    // Time series charts
    let percentChart, countChart, failedChart;
    
    function filterDataByPeriod(period) {
        const dates = Object.keys(dailyData).sort();
        const now = new Date();
        let cutoff;
        
        if (period === 'week') {
            cutoff = new Date(now - 7 * 24 * 60 * 60 * 1000);
        } else if (period === 'month') {
            cutoff = new Date(now - 30 * 24 * 60 * 60 * 1000);
        } else {
            cutoff = new Date(0);
        }
        
        const cutoffStr = cutoff.toISOString().slice(0, 10);
        return dates.filter(d => d >= cutoffStr);
    }
    
    function updateCharts(period) {
        const filteredDates = filterDataByPeriod(period);
        
        const chartLabels = filteredDates.map(d => {
            const [y, m, day] = d.split('-');
            return `${day}.${m}`;
        });
        
        const percentDataFinalized = [];
        const percentDataAbandoned = [];
        const failedAvgData = [];
        
        filteredDates.forEach(date => {
            const day = dailyData[date];
            const total = day.total || 1;
            percentDataFinalized.push(Math.round(day.finalized / total * 100));
            percentDataAbandoned.push(Math.round(day.abandoned / total * 100));
            // Average failed drops per session for this day
            const avgFailed = day.sessions_count > 0 ? (day.failed_drops / day.sessions_count).toFixed(1) : 0;
            failedAvgData.push(parseFloat(avgFailed));
        });
        
        if (percentChart) percentChart.destroy();
        if (countChart) countChart.destroy();
        if (failedChart) failedChart.destroy();
        
        // Percent chart - finalized vs abandoned
        percentChart = new Chart(document.getElementById('percentChart'), {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [
                    { label: 'Lõpetatud', data: percentDataFinalized, borderColor: colors.finalized, fill: false, tension: 0.3 },
                    { label: 'Katkestatud', data: percentDataAbandoned, borderColor: colors.abandoned, fill: false, tension: 0.3 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: '%' } } },
                plugins: { legend: { position: 'bottom' } }
            }
        });
        
        // Count chart - stacked bar with finalized and abandoned
        const countDataFinalized = [];
        const countDataAbandoned = [];
        filteredDates.forEach(date => {
            const day = dailyData[date];
            countDataFinalized.push(day.finalized || 0);
            countDataAbandoned.push(day.abandoned || 0);
        });
        
        countChart = new Chart(document.getElementById('countChart'), {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Lõpetatud',
                        data: countDataFinalized,
                        backgroundColor: colors.finalized,
                        borderColor: colors.finalized.replace('0.8', '1'),
                        borderWidth: 1
                    },
                    {
                        label: 'Katkestatud',
                        data: countDataAbandoned,
                        backgroundColor: colors.abandoned,
                        borderColor: colors.abandoned.replace('0.8', '1'),
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { 
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Arv' } } 
                },
                plugins: { legend: { position: 'bottom' } }
            }
        });
        
        // Failed drops chart
        failedChart = new Chart(document.getElementById('failedChart'), {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Kesk. ebaõnnestunud droppe',
                    data: failedAvgData,
                    borderColor: 'rgba(255, 152, 0, 0.9)',
                    backgroundColor: 'rgba(255, 152, 0, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Arv sessiooni kohta' } } },
                plugins: { legend: { display: false } }
            }
        });
    }
    
    // Period selector
    document.querySelectorAll('.period-selector button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.period-selector button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateCharts(btn.dataset.period);
        });
    });
    
    // Initial load
    updateCharts('week');
    
    // Problem cards chart
    const cardLabels = Object.keys(cardIncorrectTotal).map(id => cardTitles[id] || id);
    const cardValues = Object.values(cardIncorrectTotal);
    
    new Chart(document.getElementById('problemCardsChart'), {
        type: 'bar',
        data: {
            labels: cardLabels,
            datasets: [{
                label: 'Valesid droppimisi',
                data: cardValues,
                backgroundColor: 'rgba(244, 67, 54, 0.7)',
                borderColor: 'rgba(244, 67, 54, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { beginAtZero: true } },
            plugins: { legend: { display: false } }
        }
    });
    
    // Problem slots chart
    const slotLabels = slotIncorrectTotal.map((_, i) => `${i + 1}. slott`);
    
    new Chart(document.getElementById('problemSlotsChart'), {
        type: 'bar',
        data: {
            labels: slotLabels,
            datasets: [{
                label: 'Valesid droppimisi',
                data: slotIncorrectTotal,
                backgroundColor: 'rgba(244, 67, 54, 0.7)',
                borderColor: 'rgba(244, 67, 54, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false } }
        }
    });
    
    <?php endif; ?>
    </script>
</body>
</html>
