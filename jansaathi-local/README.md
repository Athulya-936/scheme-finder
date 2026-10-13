# JanSaathi (local edition)
### Government Benefits Companion

JanSaathi helps a person find government schemes they may qualify for, keep track
of the certificates they need, and prepare for a visit to a Common Service Centre (CSC).

It runs with **no npm, no Node.js, no server and no database install**.
It is plain HTML, CSS and JavaScript. All data stays in your own browser.

---

## 1. Quick start (VS Code)

1. Open the `jansaathi-local` folder in VS Code (File > Open Folder).
2. Install the free extension **Live Server** (by Ritwick Dey).
3. Right-click `index.html` > **Open with Live Server**.
4. The app opens at `http://127.0.0.1:5500`.

You can also double-click `index.html`. Use Chrome or Edge.
Live Server is better because the browser saves your data under a stable address.
If you open the file directly and later move the folder, the browser may treat it
as a new site and your saved data will not show.

---

## 2. Features

| Screen | What it does |
|---|---|
| Welcome / sign-up | "Namaskar" greeting, then a short profile form. A PIN is optional. |
| Home | Greeting by time of day, Benefit Readiness percentage, shortcut tiles. |
| Schemes | Search, Central/State filter, category tiles, "only schemes that match me", scheme detail with Overview, Eligibility, Documents and How to Apply tabs, Save Scheme. |
| My Documents | Document vault. Upload a photo or PDF for each certificate, view it, replace it, set an expiry date, remove it. |
| Apply Now | Pick a scheme and see required documents, apply steps and a link to the official site. |
| Alerts | Scheme alerts and certificate-expiry reminders. Mark as read. |
| News & Updates | Filter by Central, State, Education, Health, Agriculture. |
| CSC Visit Pack | Choose schemes and get one combined checklist (original + photocopies). Print or save as PDF. |
| Family Planner | Add family members and see which schemes each may qualify for. |
| Profile & Settings | Edit details, language, set or change PIN, delete all data. |

---

## 3. How it works

### Eligibility matching
Each scheme in `js/data.js` has simple rules: state, minimum and maximum age,
gender, maximum yearly income, occupation, category (General, OBC, SC, ST) and
whether a disability is needed. The function `check()` in `js/app.js` compares
your profile to those rules and returns:

- **2** = Likely eligible
- **1** = Check eligibility (the scheme depends on things the app cannot know)
- **0** = Not matched

This is screening only. The scheme office makes the final decision.

### Benefit Readiness
The app collects the mandatory documents for all schemes you are likely eligible
for. Readiness is the share of those documents you have marked as added.

### Alerts
Scheme alerts come from the sample list in `js/data.js`, shown only for schemes
that match you. Certificate-expiry reminders appear when a document you added
expires within 30 days or has already expired.

---

## 4. Where your data is stored

Everything stays in this browser on this device. Nothing is sent anywhere.

| Data | Storage | Key or name |
|---|---|---|
| Profile | localStorage | `js_profile` |
| PIN (salted hash, never the PIN itself) | localStorage | `js_pin` |
| Documents added, expiry dates | localStorage | `js_docs` |
| Saved schemes | localStorage | `js_saved` |
| Alerts marked as read | localStorage | `js_reads` |
| Family members | localStorage | `js_family` |
| Certificate files (photos, PDFs) | IndexedDB | database `jansaathi`, store `files`, one file per document code |

Files over 10 MB are rejected.

To see the data in Chrome: press F12 > Application > Local Storage / IndexedDB.

---

## 5. Privacy and security

- No account, no server, no tracking, no uploads.
- A PIN (4 to 6 digits) locks the app. It also locks after 5 minutes without use.
- Profile > **Delete all my data** removes the profile, documents and files.

**Honest limits**
- The PIN hides the screen. It does **not** encrypt files. Anyone who can use your
  unlocked computer and browser developer tools could still reach the stored data.
  Lock your computer when you step away.
- Do not use this on a shared or public computer.
- There is no backup. Clearing browser data, or using a private window, erases everything.
- Data does not move between devices or browsers.

---

## 6. Project structure

```
jansaathi-local/
├── index.html        Page shell and script loading order
├── css/
│   └── style.css     All styles, including print styles for the CSC pack
└── js/
    ├── data.js       Schemes, document types, alerts, news (edit to add data)
    ├── store.js      localStorage helpers, IndexedDB file storage, PIN hashing
    └── app.js        All screens, matching logic and events
```

Script order in `index.html` matters: `data.js`, then `store.js`, then `app.js`.

---

## 7. Adding or editing schemes

Open `js/data.js`. Copy an existing entry inside `schemes` and change it.
Give it a new unique `id`.

```js
{
  "id": 20,
  "slug": "my-new-scheme",
  "name": "My New Scheme",
  "level": "State",            // "Central" or "State"
  "state": "Kerala",           // null for All India schemes
  "category": "Health",        // Education, Health, Agriculture, Housing,
                               // Women & Child, Senior Citizens, Disability,
                               // Employment, Social Welfare
  "benefit": "Short line about the benefit",
  "description": "One or two sentences.",
  "eligibility": ["Rule one", "Rule two"],
  "how": ["Step one", "Step two"],
  "website": "https://example.gov.in",
  "min_age": 18,               // null if no limit
  "max_age": null,
  "max_income": 250000,        // yearly rupees, null if no limit
  "gender": null,              // "F", "M" or null
  "occupation": "farmer,worker", // comma list or null
  "categories": null,          // e.g. "SC,ST" or null
  "needs_disability": 0,       // 1 if disability is required
  "soft": 0,                   // 1 = show as "Check eligibility", not "Likely"
  "documents": [
    { "code": "aadhaar", "mandatory": 1, "copies": 1 },
    { "code": "bank", "mandatory": 1, "copies": 1 }
  ]
}
```

Valid occupation values: `farmer, student, worker, vendor, artisan, business,
homemaker, salaried, retired, unemployed`.

Valid document codes: `aadhaar, bank, photo, ration, income, caste, residence,
birth, disability, land, marksheet, vendor, udyam, artisan`.

To add a new document type, add it to `docTypes` with a `code`, `name`,
`issued_by` and `where_to_get`.

---

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| My data disappeared | You are in a different browser, a private window, or a different address (for example you opened the file directly instead of through Live Server). Open the same way as before. |
| Blank page | Press F12 > Console and read the first red error. Check that all three script files exist in the `js` folder. |
| File upload does nothing | Use Chrome, Edge or Firefox. Private windows may block file storage. Check the file is under 10 MB. |
| I forgot my PIN | There is no recovery. Press F12 > Application > Local Storage, delete the key `js_pin`, and reload. Your other data is kept. |
| "Storage is full" message | Remove large files from My Documents, or clear old data. |
| Live Server does not start | Check the extension is installed, then use the **Go Live** button at the bottom right of VS Code. |

---

## 9. Important notice

All scheme amounts, rules, deadlines, alerts, news and CSC details are **sample data
written for a prototype**. Check every detail on the official website before relying
on it or showing it as fact. The app is a guide, not an official government service.

Useful official sites:
- myScheme: https://www.myscheme.gov.in
- PIB (press releases): https://pib.gov.in
- CSC: https://csc.gov.in
-video: https://drive.google.com/file/d/1HiwtDh47mnyQLRcNJcqpQvl5pb5CRLv3/view?usp=sharing
---

## 10. Ideas for next steps

1. Add the full scheme list for every state.
2. Translate the whole interface (move text into a language file).
3. Add a backup and restore button for the profile.
4. Add real alerts with a small backend and an SMS or email provider.
5. Add your own artwork to `.hero` in `css/style.css`.
6. Encrypt certificate files with the PIN using the browser's Web Crypto.
