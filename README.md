# Team-Manager-App

Team Manager supports two deployment modes:

- **Standalone/offline:** open `public/index.html` directly in a browser, or open the root `index.html` which forwards to it. The app works without a web server, stores the working copy locally, and uses **Export JSON** / **Import JSON** for controlled data transfer.
- **Web:** run `npm start` and open `http://localhost:3000`. The app uses the existing authenticated server API and SQLite persistence.

The standalone mode is intended for environments where a web server is unavailable or not permitted. Keep exported JSON files in the approved secure storage location for the environment.

The storage backend is selectable under **Settings → Data storage mode**. On a hosted deployment, choose **Online SQLite mode** or **Local JSON mode**. Directly opened HTML files are locked to Local JSON mode because a browser cannot reach the server API from a `file:` URL.

In Grid View, use the **Import .ics holidays** button in the Holidays / Red days section. Standard all-day `VEVENT` entries are shown in a review list before import, where you can check all, select **Future only**, check none, or select individual holidays. Only events in the active planner year are offered; matching existing events can be selected to replace their current holiday record.
