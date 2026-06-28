# Admin Dashboard & Supabase Setup

The website is wired to Supabase so that cats posted in the admin dashboard appear
live on the public site, and every form submission (adoption, contact, donation,
newsletter, story) is saved for you to review.

## 1. Create the database tables (one time, ~30 seconds)

1. Open your project at <https://supabase.com/dashboard> → **SQL Editor** → **New query**.
2. Open [`supabase/schema.sql`](supabase/schema.sql), copy the whole file, paste it, click **Run**.
   - This creates all tables, security rules and the image storage bucket.
   - It is safe to run again later.

## 2. Your admin login (already created)

An admin account has already been created for you. **The username and password were
shared with you privately (in chat) — they are intentionally NOT stored in this repo.**

- The login email is auto-granted admin by the SQL in step 1 — no extra step needed.
- **One-time confirmation:** the account needs its email confirmed before first login.
  Either click the "Confirm your email" link Supabase sent to your inbox, **or** in
  Supabase → **Authentication → Users**, open the user and confirm it. (You can also turn
  this off entirely under **Authentication → Providers → Email → "Confirm email" → off**.)
- You can change the password any time in Supabase → Authentication → Users.

## 3. Log in and add cats

- Go to **`https://your-domain.com/admin`** and sign in.
- **Products → Add a cat**: fill in details, upload photos, choose *Published*, save.
  It appears on the public site immediately.
- Or click **Import sample cats** once to pre-load the demo cats (you can edit/delete them).
- **Submissions**: review adoption applications, messages, donations, subscribers and stories.

## 4. Vercel (already handled, but for reference)

The Supabase URL + public anon key are bundled into the app, so it works on Vercel
with no extra configuration. If you ever want to override them, add these in
**Vercel → Project → Settings → Environment Variables** and redeploy:

```
VITE_SUPABASE_URL=https://joptdavvszvekkqwmbau.supabase.co
VITE_SUPABASE_ANON_KEY=<your anon key>
```

> Security note: the **anon key is public by design** and safe to ship in the browser —
> every table is protected by Row Level Security. Never put the `service_role` key in the app.
