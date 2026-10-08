# Foreign Visits & Official Leave Portal

A local demo portal for Sri Lankan public-sector foreign travel and official leave requests. The UI supports Sinhala and English, role-selected sign-in, approval routing, and signature drawing.

## Run locally

```sh
npm install
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173). The Express API runs at http://localhost:3001 and stores data in `data/portal.sqlite`.

## Demo accounts

Choose the matching role on the sign-in form. Demo password for seeded accounts: `Demo@123`.

| Role | Email |
| --- | --- |
| Administrator | admin@foring.gov.lk |
| Applicant | officer@foring.gov.lk |
| Supervisor | supervisor@foring.gov.lk |
| HR Officer | hr@foring.gov.lk |
| Finance Officer | finance@foring.gov.lk |
| Director | director@foring.gov.lk |

Administrator password: `Admin@123`.

These are development credentials only. Do not deploy this demo as-is or reuse these passwords in production.