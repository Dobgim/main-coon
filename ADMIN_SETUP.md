# Admin Dashboard & Supabase Setup

The website is wired to Supabase so that cats posted in the admin dashboard appear
live on the public site, and every form submission (adoption, contact, donation,
newsletter, story) is saved for you to review.

## 1. Create the database tables (one time, ~30 seconds)

1. Open your project at <https://supabase.com/dashboard> → **SQL Editor** → **New query**.
2. Open [`supabase/schema.sql`](supabase/schema.sql), copy the whole file, paste it, click **Run**.
   - This creates all tables, security rules and the image storage bucket.
   - It is safe to run again later.

## 2. Create your admin login

1. In Supabase → **Authentication → Users → Add user**.
   - Enter your email + a password, tick **Auto Confirm User**, save.
2. Make that user an admin — back in **SQL Editor**, run (use your email):

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com'
   on conflict do nothing;
   ```

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
