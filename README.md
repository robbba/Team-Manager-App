# Team Manager

The active application is the standalone [`index.html`](index.html). For the smoothest portable workflow in Edge, keep `index.html`, any `assets/` files, and `data.json` together in one folder and open the app from a simple local static server such as `http://localhost:8080`.

## Planner files

Team Manager now auto-loads `./data.json` on startup. This is the normal portable planner source for shared use.

Browser storage provides automatic crash and reload recovery, but it is not a replacement for saving the JSON file. The JSON file contains personnel, activities, assignments, statuses, holidays, settings, courses, requirements, and grid preferences. Store portable folders in the approved secure location for your environment.

## Portable Edge workflow

Recommended folder layout:

```text
portable-team-manager/
├── index.html
├── data.json
└── assets/   (if present in your build)
```

Recommended startup:

- Serve the folder locally for reliable `fetch('./data.json')` behavior in Edge.
- `python -m http.server 8080`
- `py -m http.server 8080`
- Then open `http://localhost:8080`

Opening `index.html` directly with `file://` may block or inconsistently allow loading `data.json`, depending on browser policy. If `data.json` is missing, unreadable, or invalid, Team Manager shows a clear message and you can use **Open Different JSON** as the manual fallback.

Use **Open Different JSON** to temporarily work from another planner file and **Save As** to create a writable copy. That override is for exceptions; the next normal launch returns to `data.json`.

While the auto-loaded `data.json` (or a writable override file) stays available, Team Manager keeps checking for external changes. If the planner changes outside the app, you will see a notification with **Refresh** so you can apply the latest data explicitly. If you already have unsaved edits, the app keeps the existing merge behavior and warns you to save when ready.

## Work time codes

Work Time Codes can count assigned dates as **Days** or as **Hours**. Hour codes use either a fixed amount per assigned date or an administrative time interval entered on the assignment. Legacy codes with the `VAKT` or `ATF` abbreviation migrate to a fixed 24 hours; other legacy hour codes use entered time.

Administrative compensation is independent of the physical shift. For example, an ATF assignment can report `ATF (24h)` while its physical shift remains `Night (1930-0730)`. No overtime-rate calculation is performed.

**Additional Work / Overtime (OT)** is recorded independently on an employee date. It can coexist with a status or activity, is added to timed hours in Workload and Summary, and does not change absence or availability. The app records hours and an optional note; it does not calculate overtime rates or pay.

## Schedule behavior

Planned assignments remain visible with diagonal hatching, but only Confirmed activities count in Workload, Summary, availability, and reports. Day and Night use lighter and darker shades of the assigned Work Time Code color.

Dragging across dates creates a visible selection. **Remove from [activity]** removes only that activity from the selected dates; daily statuses and other activities remain. **Clear all selected cells** is the separate action for clearing everything in the selection. Both actions participate in Undo and browser recovery.

In Grid View, use **Import .ics holidays** in the Holidays section. Standard all-day `VEVENT` entries are shown for review before import. Only events in the active planner year are offered.
