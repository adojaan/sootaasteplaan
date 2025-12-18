# Soo Taasteplaan

Soo taastamise tegevuste plaanimine — an interactive drag-and-drop ordering game for learning bog restoration steps.

## Quick Start

### For Development
```bash
# Start a local server
python -m http.server 8000
# or
npx http-server . -p 8000

# Open http://localhost:8000 in browser
```

### For Kiosk Deployment (Production)

See [Installation Guide](#installation-guide) below.

---

## Features

- 🎯 10 draggable cards representing bog restoration steps
- 🔀 Special "communication" card that applies to arrows between steps
- 📊 Validation with correct/partial/incorrect feedback
- ⏱️ Inactivity timer with auto-reset (60s idle → prompt, 10s more → reset)
- 🖥️ Kiosk mode with right-click disabled and hidden exit backdoor
- 📈 Statistics dashboard (`statistika.php`) with session analytics
- 🔄 Auto-update from GitHub with browser restart

---

## Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/sootaasteplaan.git
cd sootaasteplaan
```

### Step 2: Choose Your Launch Method

| File | Purpose |
|------|---------|
| `start-kiosk.bat` | Kiosk mode with remote URL (default) or custom URL as argument |
| `start-kiosk-local.bat` | Kiosk mode with local `index.html` (auto-detects path) |
| `start-kiosk.ps1` | PowerShell version (same features, needs execution policy) |

**Supported browsers:** Microsoft Edge, Google Chrome, Mozilla Firefox (tries in that order)

### Step 3: Run Manually

```batch
REM Remote URL (default)
start-kiosk.bat

REM Local file (auto-detects index.html in same folder)
start-kiosk-local.bat

REM Custom URL
start-kiosk.bat http://localhost:8000
```

### Step 4: Auto-Start on Boot

1. Press `Win + R`, type `shell:startup`, press Enter
2. Create a **shortcut** to `start-kiosk-local.bat`
3. Move the shortcut to the Startup folder

### Step 5: Auto-Update from GitHub (Optional)

The `auto-update.bat` script:
- Pulls latest changes from GitHub
- Only restarts browser if there were actual changes
- Can be scheduled to run periodically

**Setup scheduled task (Admin PowerShell):**

```powershell
$action = New-ScheduledTaskAction -Execute "C:\path\to\sootaasteplaan\auto-update.bat" -WorkingDirectory "C:\path\to\sootaasteplaan"
$trigger = New-ScheduledTaskTrigger -Daily -At "6:00AM"
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName "SooTaasteplaanAutoUpdate" -Action $action -Trigger $trigger -Settings $settings
```

---

## Kiosk Mode Features

- **Full-screen** without address bar, tabs, or window controls
- **Right-click disabled** to prevent context menu
- **Text selection disabled** to prevent accidental selection
- **Separate browser profile** so it doesn't affect your main browser
- **Secret exit:** Long-press (3 seconds) on the orange card's info icon (ⓘ)

---

## Files Overview

| File | Description |
|------|-------------|
| `index.html` | Main game HTML |
| `style.css` | Styling |
| `script.js` | Game logic with inline `gameData` |
| `start-kiosk.bat` | Windows kiosk launcher |
| `start-kiosk-local.bat` | Local file kiosk launcher |
| `start-kiosk.ps1` | PowerShell kiosk launcher |
| `auto-update.bat` | Git pull + conditional browser restart |
| `log.php` | Server-side logging endpoint |
| `statistika.php` | Statistics dashboard |
| `assets/` | Images and icons |

---

## Statistics Dashboard

Access at: `https://your-server/statistika.php`

Shows:
- Pie chart of results (correct/partial/incorrect/abandoned)
- Summary table with counts and average duration
- Time series charts (daily/weekly/monthly)
- 10×10 heatmap of card placements

---

## Troubleshooting

### PowerShell scripts won't run
Run in Admin PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Or use the `.bat` files instead (no restrictions).

### Browser not found
The scripts try Edge → Chrome → Firefox. Make sure at least one is installed.

### Git pull fails in auto-update
Make sure Git is installed and the repository was cloned (not downloaded as ZIP).
