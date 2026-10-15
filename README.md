# Foreign Visits & Official Leave Portal

A secure local portal for Sri Lankan public-sector foreign travel and official leave authorization (Appendix 16 & General 126). The UI supports Sinhala and English, applicant self-registration, role-free authentication, reviewer verification, and executive authority approval routing.

## Run locally

```sh
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Express API: [http://localhost:3001](http://localhost:3001)
- Database: `data/portal.sqlite`

## User Roles & Workflow

1. **Applicant**: Fills and signs foreign travel & leave request (General 126 + Appendix 16).
2. **Reviewer**: Inspects submitted particulars, supporting documents, funding, and covering officers. Routes to the appropriate authority (*Authorized Official*, *Minister*, or *President's Office*), or returns for amendments / rejects.
3. **Approving Authority**:
   - **Authorized Official** (Department Head / Ministry Secretary)
   - **Hon. Minister** (Cabinet Minister)
   - **Presidential Secretariat** (Presidential Office)
   Grants final approval, returns for amendments, or rejects.
4. **Administrator**: Full portal control, user account provisioning, review approvals, and master audit reports.

## Demo Accounts

Sign in directly with your email and password (no role selection needed):

| Role | Email | Password |
| --- | --- | --- |
| **Administrator** | `admin@foring.gov.lk` | `Admin@123` |
| **Applicant** | `officer@foring.gov.lk` | `Demo@123` |
| **Reviewer** | `reviewer@foring.gov.lk` | `Demo@123` |
| **Authorized Official** | `authorized@foring.gov.lk` | `Demo@123` |
| **Minister** | `minister@foring.gov.lk` | `Demo@123` |
| **President's Secretariat** | `president@foring.gov.lk` | `Demo@123` |

*Note: New applicants can self-register using the **Applicant Registration** tab on the sign-in page. All other administrative, reviewer, and executive authority accounts are provisioned by the Administrator.*