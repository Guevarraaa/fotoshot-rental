# FotoShot Backup and Recovery Plan

## 1. Backup Goals

Protect FotoShot from:

- Accidental deletion
- Database mistakes
- Deployment issues
- Lost uploaded files
- Missing environment variables
- Corrupted data

## 2. What Must Be Backed Up

### Database

- Customers
- Bookings
- Booking files metadata
- Emergency contacts
- Student information
- Admin notes
- Camera data
- Blocked dates
- Analytics events

### Storage Files

- Valid IDs
- Selfies holding ID
- Specimen signatures
- Billing statements
- Payment screenshots
- Camera images
- Sample output images
- QR code images
- Terms/agreement files

### Configuration

- Environment variables
- Supabase project settings
- Vercel project settings
- RLS policies
- SQL schema

## 3. Backup Frequency

### MVP Recommendation

- Database: at least weekly export, or use Supabase automated backups if available.
- Storage files: manual monthly backup during MVP, then automate later.
- Code: always stored in GitHub.
- Environment variables: store securely in a password manager.

## 4. Manual Database Backup

Export from Supabase dashboard or CLI.

Store backup files in a secure folder, not inside the public repository.

Recommended filename format:

```text
fotoshot-db-backup-YYYY-MM-DD.sql
```

## 5. Storage Backup

Download storage bucket contents periodically.

Recommended structure:

```text
backups/
└── YYYY-MM-DD/
    ├── booking-documents/
    ├── payment-proofs/
    ├── camera-assets/
    └── site-assets/
```

## 6. Code Backup

Use GitHub.

Rules:

- Push changes after each successful sprint.
- Use meaningful commit messages.
- Do not commit `.env.local`.
- Do not commit private customer files.

## 7. Environment Variable Backup

Store the following securely:

- Supabase URL
- Supabase anon key
- Supabase service role key
- Vercel deployment settings
- Admin setup notes

Never send service keys in chat or public repositories.

## 8. Recovery Scenarios

### Website Deployment Breaks

1. Open Vercel dashboard.
2. Roll back to previous deployment.
3. Check recent commits.
4. Fix issue locally.
5. Redeploy.

### Database Data Deleted

1. Stop admin/customer actions temporarily.
2. Check Supabase logs.
3. Restore from latest backup.
4. Verify bookings and customers.
5. Reopen booking system.

### Storage Files Deleted

1. Check storage bucket.
2. Restore from storage backup.
3. Verify file paths still match database records.
4. Re-upload missing files if needed.

### Admin Locked Out

1. Use Supabase Auth dashboard.
2. Reset admin password.
3. Confirm admin profile exists in `admin_profiles`.
4. Try login again.

## 9. Backup Security

Backups may contain sensitive information. Protect them carefully.

Rules:

- Do not upload backups to public repositories.
- Do not share backups through public links.
- Restrict access to owner/admin only.
- Store backups in secure cloud storage or encrypted drive.

## 10. Future Improvements

- Automated daily database backups
- Automated storage sync
- Admin export button
- Data retention policy
- File deletion workflow after retention period
