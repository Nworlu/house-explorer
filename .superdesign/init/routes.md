# Routes

| Route | Entry | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Marketing and property discovery |
| `/studio` | `app/studio/page.tsx` | Property dashboard |
| `/studio/new` | `app/studio/new/page.tsx` | Details, capture, preflight, and review workflow |
| `/explore/[propertyId]` | `app/explore/[propertyId]/page.tsx` | Full interactive 3D property explorer |

The requested camera preview belongs to the review step within `/studio/new`, using `PropertyReviewEditor`.
