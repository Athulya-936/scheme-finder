# JanSaathi (local edition)

No npm, no Node, no server, no database install. Plain HTML, CSS and JavaScript.
All data stays in your own browser. Nothing is uploaded anywhere.

## Run it in VS Code
1. Open this folder in VS Code (File > Open Folder).
2. Install the free extension **Live Server** (by Ritwick Dey).
3. Right-click `index.html` > **Open with Live Server**.

You can also just double-click `index.html`. Use Chrome or Edge.
Live Server is better: your data is saved under a stable address (http://127.0.0.1:5500). If you open the file directly and later move the folder, the browser may treat it as a new site and your saved data will not show.

## Where your data lives
- Profile, checklist, settings: browser localStorage
- Certificate files (photos and PDFs): browser IndexedDB
- Both are only on this device and this browser. Use the same browser each time.
- Set a PIN under Profile to lock the app (it also locks after 5 minutes idle).
- Profile > "Delete all my data" removes everything.

## Honest limits
- The PIN hides the app screen. It does not encrypt files. Anyone who can use your unlocked computer and browser tools could still reach the stored data, so lock your computer.
- Clearing browser data or using a private window erases everything. There is no backup.
- Scheme amounts, rules, alerts and news are SAMPLE data. Verify on official websites.

## Files
```
index.html
css/style.css
js/data.js     schemes, documents, alerts, news (edit this to add schemes)
js/store.js    localStorage, IndexedDB files, PIN hashing
js/app.js      all screens and logic
```
To add a scheme, copy an entry in `js/data.js` and give it a new `id`.
