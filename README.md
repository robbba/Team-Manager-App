# Team Manager

The active application is the standalone [`index.html`](index.html). Open it directly in a browser; no installation, login, or web server is required.

## Planner files

Use **Open JSON** to open an existing planner and **Save As** to create a new planner file. After a writable file has been opened or created, **Save** writes changes to that file. The sidebar reports **Unsaved** until a file save succeeds.

Browser storage provides automatic crash and reload recovery, but it is not a replacement for saving the JSON file. The JSON file is the portable source and contains personnel, activities, assignments, statuses, holidays, settings, courses, requirements, and grid preferences. Store planner files in the approved secure location for your environment.

In browsers that support the File System Access API, the selected JSON file is also remembered as this browser's default planner file. After you open a planner with **Open JSON** or choose a writable file with **Save As**, the app will try to auto-load that same file on the next launch. If the browser no longer has permission, or the file was moved or deleted, the app falls back to the normal manual **Open JSON** flow and asks you to reselect it.

While a writable JSON file stays connected, Team Manager keeps checking for external changes. If the file changes outside the app, you will see a notification with **Refresh** so you can reload the latest data. If you already have unsaved edits, the app keeps the existing merge behavior and warns you to save when ready.

## Work time codes

Work Time Codes can count assigned dates as **Days** or as **Hours**. Hour codes use either a fixed amount per assigned date or an administrative time interval entered on the assignment. Legacy codes with the `VAKT` or `ATF` abbreviation migrate to a fixed 24 hours; other legacy hour codes use entered time.

Administrative compensation is independent of the physical shift. For example, an ATF assignment can report `ATF (24h)` while its physical shift remains `Night (1930-0730)`. No overtime-rate calculation is performed.

**Additional Work / Overtime (OT)** is recorded independently on an employee date. It can coexist with a status or activity, is added to timed hours in Workload and Summary, and does not change absence or availability. The app records hours and an optional note; it does not calculate overtime rates or pay.

## Schedule behavior

Planned assignments remain visible with diagonal hatching, but only Confirmed activities count in Workload, Summary, availability, and reports. Day and Night use lighter and darker shades of the assigned Work Time Code color.

Dragging across dates creates a visible selection. **Remove from [activity]** removes only that activity from the selected dates; daily statuses and other activities remain. **Clear all selected cells** is the separate action for clearing everything in the selection. Both actions participate in Undo and browser recovery.

In Grid View, use **Import .ics holidays** in the Holidays section. Standard all-day `VEVENT` entries are shown for review before import. Only events in the active planner year are offered.
