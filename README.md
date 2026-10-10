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
- Pick `setup` from the function menu and click Run. Approve the permissions.
- Open the Execution log and copy your 6-digit class code.
- Deploy → New deployment → gear icon → Web app.
  - Execute as: **Me**
  - Who has access: **Anyone**
- Click Deploy and copy the Web app link (ends in `/exec`).

**3. Connect each device (once on the computer, once on the iPad)**
- Open the GitHub link, paste the Web app link and class code, and tap Connect.

## Every day
- Computer: pick **Projector**, then click **Start projector**.
- iPad: pick **iPad remote**.
- Link from The Vis: `https://tysontucker-bot.github.io/Afternoon-Meeting/?screen=projector`

## If you change Code.gs later
Deploy → Manage deployments → pencil icon → Version: New version → Deploy. The link stays the same.
