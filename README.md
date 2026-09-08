# Team Manager

The active application is the standalone [`index.html`](index.html). For the smoothest portable workflow in Edge, keep `index.html`, any `assets/` files, and your planner JSON file together in one folder and open the app from a simple local static server such as `http://localhost:8080`.

## Planner files

Team Manager can load planner data from a configured SharePoint JSON URL or from a local JSON file. If no SharePoint URL is configured (or SharePoint loading fails), the app falls back to selecting a planner JSON file before normal use.

Browser storage provides automatic crash and reload recovery, but it is not a replacement for saving the JSON file. The JSON file contains personnel, activities, assignments, statuses, holidays, settings, courses, requirements, and grid preferences. Store portable folders in the approved secure location for your environment.

## Portable Edge workflow

Recommended folder layout:

```text
portable-team-manager/
├── index.html
├── your-planner.json
├── data.example.json
└── assets/   (if present in your build)
```

Recommended startup:

- Serve the folder locally for reliable browser file and fetch behavior in Edge.
- If needed, copy `data.example.json` to a working planner file before first launch.
- `python -m http.server 8080`
- `py -m http.server 8080`
- Then open `http://localhost:8080`

Opening `index.html` directly with `file://` may block or inconsistently allow file workflows, depending on browser policy. If the selected JSON file is missing, unreadable, or invalid, Team Manager shows a clear message so you can choose a valid file.

Startup behavior:
- If a SharePoint URL is configured, Team Manager tries to load it automatically on startup.
- If SharePoint loading fails or no URL is configured, Team Manager shows a required **Choose your data file** step before normal interaction.
- Browser recovery state can still be used after a file is selected.

Use **Choose Data File** to open a planner JSON and **Save As** to create a writable copy.

Team Manager checks for external changes and keeps a visible sync status:
- **Updated** (green)
- **Syncing…** (amber)
- **Out of sync** (red)

Auto-update runs every 60 seconds by default, and **Sync Now** is available next to **Save** for manual sync.

## Work time codes

Work Time Codes can count assigned dates as **Days** or as **Hours**. Hour codes use either a fixed amount per assigned date or an administrative time interval entered on the assignment. Legacy codes with the `VAKT` or `ATF` abbreviation migrate to a fixed 24 hours; other legacy hour codes use entered time.

Administrative compensation is independent of the physical shift. For example, an ATF assignment can report `ATF (24h)` while its physical shift remains `Night (1930-0730)`. No overtime-rate calculation is performed.

**Additional Work / Overtime (OT)** is recorded independently on an employee date. It can coexist with a status or activity, is added to timed hours in Workload and Summary, and does not change absence or availability. The app records hours and an optional note; it does not calculate overtime rates or pay.

## Schedule behavior

Planned assignments remain visible with diagonal hatching, but only Confirmed activities count in Workload, Summary, availability, and reports. Day and Night use lighter and darker shades of the assigned Work Time Code color.

Dragging across dates creates a visible selection. **Remove from [activity]** removes only that activity from the selected dates; daily statuses and other activities remain. **Clear all selected cells** is the separate action for clearing everything in the selection. Both actions participate in Undo and browser recovery.

In Grid View, use **Import .ics holidays** in the Holidays section. Standard all-day `VEVENT` entries are shown for review before import. Only events in the active planner year are offered.
