# Afternoon Meeting

Two-screen afternoon meeting: the classroom computer shows the projector page, and your iPad is the remote.

Student names and photos live in your Google Sheet, not in this repo, because GitHub Pages sites are public.

## One-time setup

**1. GitHub**
- Create a new repo named `Afternoon-Meeting`.
- Upload `index.html`. (The feelings symbols load from ARASAAC, so there's no images folder.)
- Do not upload `apps-script` — that code goes in Google.
- Settings → Pages → Deploy from branch → `main` / root → Save.
- Your link will be `https://tysontucker-bot.github.io/Afternoon-Meeting/`

**2. Google Sheet + Apps Script**
- Make a new Google Sheet in your school account (name it "Afternoon Meeting").
- Extensions → Apps Script. Delete what's there, paste in `apps-script/Code.gs`, and save.
- Pick `setup` from the function menu and click Run. Approve the permissions (it asks for Sheets and Drive: Drive holds your article pages and pictures in a private folder called "Afternoon Meeting pictures").
- Open the Execution log and copy your 6-digit class code.
- Deploy → New deployment → gear icon → Web app.
  - Execute as: **Me**
  - Who has access: **Anyone**
- Click Deploy and copy the Web app link (ends in `/exec`).

**2b. Global Symbols key (for symbol search)**
- In Apps Script, click the gear (Project Settings) → Script Properties → Add script property.
- Property: `GS_API_KEY`  Value: your Global Symbols API key → Save.
- Pick `testSymbols` from the function menu and click Run. The Execution log should list some symbols.
- Never paste the key into index.html — GitHub Pages is public.

**3. Connect each device (once on the computer, once on the iPad)**
- Open the GitHub link, paste the Web app link and class code, and tap Connect.
- Shortcut: on a connected device, tap **Copy setup link for another device**, email it to yourself, and open it on the other device. Keep that link private, and don't put it on The Vis (GitHub pages are public).

## Every day
- Computer: pick **Projector**, then click **Start projector**.
- iPad: pick **iPad remote**.
- Link from The Vis: `https://tysontucker-bot.github.io/Afternoon-Meeting/?screen=projector`

## If you change Code.gs later
Deploy → Manage deployments → pencil icon → Version: New version → Deploy. The link stays the same.

## Building each week
Open the link on any device → **Set up the meeting**. Tabs: 1. Feelings, 2. News-2-You, 3. Letter, 4. Songs, 5. Word. Everything saves to your Google Sheet, so it doesn't matter which computer you use.
