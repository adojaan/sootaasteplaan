<?php
/**
 * Soo Taasteplaan - Statistics Dashboard
 * 
 * Displays analytics from game_logs.csv
 * Access: https://your-server/statistika.php
 */

// -----------------------------------------------------------------
// Prevent caching for dynamic statistics page
// Strong headers for browsers and common proxies (Squid, Varnish, etc.)
// If an upstream reverse-proxy ignores these, contact the server admin.
header('Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0');
header('Pragma: no-cache');
header('Expires: 0');
header('Surrogate-Control: no-store');
// Nginx internal accel header
header('X-Accel-Expires: 0');
// Make Last-Modified reflect current time so caches must revalidate
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
// Optional: vary by Accept-Encoding to avoid some caches serving compressed blobs wrongly
header('Vary: Accept-Encoding');
// -----------------------------------------------------------------

// ============ CONFIGURATION ============
$csvFile = __DIR__ . '/game_logs.csv';
$cardIds = [
    'tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu',
    'arvuti_mudel', 'taastamiskava', 'ehitusprojekt', 'teoks_tegemine', 'jarelevalve', 'suhtlus'
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
    'jarelevalve' => 'Mis saab edasi?',
    'suhtlus' => 'Mida inimesed arvavad?'
];

// Correct cards for each position (based on validationRules)
$correctByPosition = [
    0 => ['tahame_taastada', 'mis_on_lugu'],
    1 => ['tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu'],
    2 => ['tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu'],
    3 => ['tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu'],
    4 => ['tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu'],
    5 => ['arvuti_mudel', 'taastamiskava'],
    6 => ['arvuti_mudel', 'taastamiskava'],
    7 => ['ehitusprojekt'],
    8 => ['teoks_tegemine'],
    9 => ['jarelevalve']
];

// Canonical order for cross-table rows (the "ideal" order)
$canonicalOrder = [
    'tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu',
    'arvuti_mudel', 'taastamiskava', 'ehitusprojekt', 'teoks_tegemine', 'jarelevalve'
];

// ============ PARSE CSV ============
$sessions = [];
if (file_exists($csvFile) && is_readable($csvFile)) {
    $handle = fopen($csvFile, 'r');
    $header = fgetcsv($handle);
    while (($row = fgetcsv($handle)) !== false) {
        // CSV format (variants supported):
        // Old: "2025-12-19 16:02:48",ip,trigger,feedback_result,slot_ids,usage
        // New: 2025-12-18T20:22:46.908Z,ip,trigger,feedback_result,slot_ids,usage
        if (count($row) >= 6) {
            // Skip accidental header rows that may be embedded in the CSV
            $rawDate = trim($row[0] ?? '');
            $rawDateLower = strtolower(trim($rawDate, '"'));
            if ($rawDateLower === 'datetime' || $rawDateLower === '') {
                continue;
            }

            // Try to parse various datetime formats into server-local Y-m-d H:i:s
            $ts = false;
            // Strip surrounding quotes
            $rawDate = trim($rawDate, " \t\n\r\"");
            // Some ISO timestamps contain fractional seconds (milliseconds) before Z
            // strtotime generally understands ISO8601, but try removing fractional part if needed
            $ts = @strtotime($rawDate);
            if ($ts === false) {
                $isoNoMs = preg_replace('/\.(\d+)(?=Z$)/', '', $rawDate);
                $ts = @strtotime($isoNoMs);
            }

            // If parsing succeeded, normalize to server local datetime string, else keep raw
            $datetime = $ts !== false ? date('Y-m-d H:i:s', $ts) : $rawDate;

            // Parse slot_ids from semicolon-separated string
            $slotIdsStr = $row[4] ?? '';
            $slots = $slotIdsStr ? explode(';', $slotIdsStr) : [];

            $sessions[] = [
                'datetime' => $datetime,
                'trigger' => $row[2],
                'result' => $row[3],
                'slots' => $slots,
                'duration' => (int)($row[5] ?? 0)
            ];
        }
    }
    fclose($handle);
}

// ============ CALCULATE STATISTICS ============

// Overall counts
$counts = ['correct' => 0, 'partial' => 0, 'incorrect' => 0, 'abandoned' => 0];
$durations = ['correct' => [], 'partial' => [], 'incorrect' => [], 'abandoned' => []];
$completedSessions = []; // Non-abandoned for cross-table

foreach ($sessions as $s) {
    $result = $s['result'];
    if ($s['trigger'] === 'inactivity_reset' || $result === 'none') {
        $counts['abandoned']++;
        $durations['abandoned'][] = $s['duration'];
    } else {
        $counts[$result]++;
        $durations[$result][] = $s['duration'];
        $completedSessions[] = $s;
    }
}

// Average durations
$avgDurations = [];
foreach ($durations as $key => $arr) {
    $avgDurations[$key] = count($arr) > 0 ? round(array_sum($arr) / count($arr)) : 0;
}

// Time series data (group by date)
$dailyData = [];
foreach ($sessions as $s) {
    $date = substr($s['datetime'], 0, 10); // YYYY-MM-DD
    if (!isset($dailyData[$date])) {
        $dailyData[$date] = ['correct' => 0, 'partial' => 0, 'incorrect' => 0, 'abandoned' => 0, 'total' => 0];
    }
    if ($s['trigger'] === 'inactivity_reset' || $s['result'] === 'none') {
        $dailyData[$date]['abandoned']++;
    } else {
        $dailyData[$date][$s['result']]++;
    }
    $dailyData[$date]['total']++;
}
ksort($dailyData);

// Cross-table: for each card, count how many times it was placed in each slot
$crossTable = [];
foreach ($canonicalOrder as $cardId) {
    $crossTable[$cardId] = array_fill(0, 10, 0);
}

foreach ($completedSessions as $s) {
    foreach ($s['slots'] as $slotIndex => $cardId) {
        if (isset($crossTable[$cardId])) {
            $crossTable[$cardId][$slotIndex]++;
        }
    }
}

// Determine cell colors: correct (green), partial ±1 (blue), incorrect (red)
function getCellClass($cardId, $slotIndex, $correctByPosition, $canonicalOrder) {
    // Is this card correct for this slot?
    if (in_array($cardId, $correctByPosition[$slotIndex])) {
        return 'correct';
    }
    
    // Check adjacent positions for partial
    $adjacent = [];
    if ($slotIndex > 0) $adjacent[] = $slotIndex - 1;
    if ($slotIndex < 9) $adjacent[] = $slotIndex + 1;
    
    foreach ($adjacent as $adj) {
        if (in_array($cardId, $correctByPosition[$adj])) {
            return 'partial';
        }
    }
    
    return 'incorrect';
}

// Find max count for gradient intensity
$maxCount = 1;
foreach ($crossTable as $cardId => $slots) {
    $maxCount = max($maxCount, max($slots));
}

// ============ OUTPUT HTML ============
?>
<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Soo Taasteplaan - Statistika</title>
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
        
        .dashboard {
            max-width: 1400px;
            margin: 0 auto;
        }
        
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
        
        .card h3 {
            margin-top: 0;
            color: #3f51b5;
        }
        
        .chart-container {
            position: relative;
            height: 300px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }
        
        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        
        th { 
            background: #3f51b5; 
            color: white; 
        }
        
        tr:hover { background: #f5f5f5; }
        
        /* Cross-table specific */
        .cross-table {
            overflow-x: auto;
        }
        
        .cross-table table {
            font-size: 0.85rem;
        }
        
        .cross-table th, .cross-table td {
            text-align: center;
            padding: 0.5rem;
            min-width: 50px;
        }
        
        .cross-table th.card-name {
            text-align: left;
            min-width: 180px;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .cross-table td.card-name {
            text-align: left;
            font-weight: 500;
            background: #fafafa;
        }
        
        .cell-correct { background-color: rgba(76, 175, 80, var(--intensity)); }
        .cell-partial { background-color: rgba(33, 150, 243, var(--intensity)); }
        .cell-incorrect { background-color: rgba(244, 67, 54, var(--intensity)); }
        
        .period-selector {
            margin-bottom: 1rem;
        }
        
        .period-selector button {
            padding: 0.5rem 1rem;
            margin-right: 0.5rem;
            border: 1px solid #3f51b5;
            background: white;
            color: #3f51b5;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .period-selector button.active {
            background: #3f51b5;
            color: white;
        }
        
        .no-data {
            text-align: center;
            padding: 3rem;
            color: #666;
        }
        
        .legend {
            display: flex;
            gap: 1.5rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .legend-color {
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #3f51b5;
        }
        
        .stat-label {
            color: #666;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .row { flex-direction: column; }
            .card { min-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <h1>📊 Soo Taasteplaan - Statistika</h1>
        <?php
        // Find last submission time (latest session datetime)
        $lastSubmission = '';
        if (count($sessions) > 0) {
            $last = end($sessions);
            $lastSubmission = $last['datetime'];
            // Try to parse and format as local time
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
            <p>Mängu logisid ei ole veel kogutud või fail <code>game_logs.csv</code> ei ole leitav.</p>
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
                <h3>📋 Kokkuvõte</h3>
                <table>
                    <tr>
                        <th>Tulemus</th>
                        <th>Arv</th>
                        <th>%</th>
                        <th>Kesk. kestus</th>
                    </tr>
                    <?php 
                    $total = array_sum($counts);
                    $labels = ['correct' => 'Õige', 'partial' => 'Osaliselt', 'incorrect' => 'Vale', 'abandoned' => 'Katkestatud'];
                    foreach ($counts as $key => $count): 
                        $pct = $total > 0 ? round($count / $total * 100, 1) : 0;
                    ?>
                    <tr>
                        <td><?= $labels[$key] ?></td>
                        <td><?= $count ?></td>
                        <td><?= $pct ?>%</td>
                        <td><?= gmdate("i:s", $avgDurations[$key]) ?></td>
                    </tr>
                    <?php endforeach; ?>
                    <tr style="font-weight: bold; background: #f0f0f0;">
                        <td>Kokku</td>
                        <td><?= $total ?></td>
                        <td>100%</td>
                        <td>-</td>
                    </tr>
                </table>
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
                <h3>Tulemuste protsendid</h3>
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
        
        <!-- Cross Table -->
        <h2>🎲 Kaartide paigutus slottidesse</h2>
        <p class="subtitle">Näitab, mitu korda iga kaart paigutati igasse slotti (ainult lõpetatud sessioonid: <?= count($completedSessions) ?>)</p>
        
        <div class="legend">
            <div class="legend-item">
                <div class="legend-color" style="background: rgba(76, 175, 80, 0.7);"></div>
                <span>Õige positsioon</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: rgba(33, 150, 243, 0.7);"></div>
                <span>Osaliselt õige (±1)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: rgba(244, 67, 54, 0.7);"></div>
                <span>Vale positsioon</span>
            </div>
        </div>
        
        <div class="card cross-table">
            <table>
                <tr>
                    <th class="card-name">Kaart</th>
                    <?php for ($i = 1; $i <= 10; $i++): ?>
                    <th><?= $i ?>. slott</th>
                    <?php endfor; ?>
                </tr>
                <?php foreach ($canonicalOrder as $rowIndex => $cardId): ?>
                <tr>
                    <td class="card-name" title="<?= htmlspecialchars($cardTitles[$cardId] ?? $cardId) ?>">
                        <?= ($rowIndex + 1) ?>. <?= htmlspecialchars($cardTitles[$cardId] ?? $cardId) ?>
                    </td>
                    <?php for ($slot = 0; $slot < 10; $slot++): 
                        $count = $crossTable[$cardId][$slot];
                        $cellClass = getCellClass($cardId, $slot, $correctByPosition, $canonicalOrder);
                        $intensity = $count > 0 ? max(0.2, min(0.9, $count / $maxCount)) : 0;
                    ?>
                    <td class="cell-<?= $cellClass ?>" style="--intensity: <?= $intensity ?>;">
                        <?= $count > 0 ? $count : '-' ?>
                    </td>
                    <?php endfor; ?>
                </tr>
                <?php endforeach; ?>
            </table>
        </div>
        
        <?php endif; ?>
    </div>
    
    <script>
    <?php if (count($sessions) > 0): ?>
    // Data from PHP
    const counts = <?= json_encode($counts) ?>;
    const dailyData = <?= json_encode($dailyData) ?>;
    
    // Colors
    const colors = {
        correct: 'rgba(76, 175, 80, 0.8)',
        partial: 'rgba(33, 150, 243, 0.8)',
        incorrect: 'rgba(244, 67, 54, 0.8)',
        abandoned: 'rgba(158, 158, 158, 0.8)'
    };
    
    const labels = {
        correct: 'Õige',
        partial: 'Osaliselt',
        incorrect: 'Vale',
        abandoned: 'Katkestatud'
    };
    
    // Pie Chart
    new Chart(document.getElementById('pieChart'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(counts).map(k => labels[k]),
            datasets: [{
                data: Object.values(counts),
                backgroundColor: Object.keys(counts).map(k => colors[k]),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    // Time series charts
    let percentChart, countChart;
    
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
        
        // Prepare data
        const chartLabels = filteredDates.map(d => {
            const [y, m, day] = d.split('-');
            return `${day}.${m}`;
        });
        
        const percentData = {
            correct: [],
            partial: [],
            incorrect: [],
            abandoned: []
        };
        
        const countData = [];
        
        filteredDates.forEach(date => {
            const day = dailyData[date];
            const total = day.total || 1;
            percentData.correct.push(Math.round(day.correct / total * 100));
            percentData.partial.push(Math.round(day.partial / total * 100));
            percentData.incorrect.push(Math.round(day.incorrect / total * 100));
            percentData.abandoned.push(Math.round(day.abandoned / total * 100));
            countData.push(total);
        });
        
        // Destroy existing charts
        if (percentChart) percentChart.destroy();
        if (countChart) countChart.destroy();
        
        // Percent chart
        percentChart = new Chart(document.getElementById('percentChart'), {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [
                    { label: labels.correct, data: percentData.correct, borderColor: colors.correct, fill: false, tension: 0.3 },
                    { label: labels.partial, data: percentData.partial, borderColor: colors.partial, fill: false, tension: 0.3 },
                    { label: labels.incorrect, data: percentData.incorrect, borderColor: colors.incorrect, fill: false, tension: 0.3 },
                    { label: labels.abandoned, data: percentData.abandoned, borderColor: colors.abandoned, fill: false, tension: 0.3 }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100, title: { display: true, text: '%' } }
                },
                plugins: { legend: { position: 'bottom' } }
            }
        });
        
        // Count chart
        countChart = new Chart(document.getElementById('countChart'), {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Sessioonid',
                    data: countData,
                    backgroundColor: 'rgba(63, 81, 181, 0.7)',
                    borderColor: 'rgba(63, 81, 181, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Arv' } }
                },
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
    <?php endif; ?>
    </script>
</body>
</html>
