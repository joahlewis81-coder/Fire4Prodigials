# Going live: Supabase + Netlify

About 15 minutes, all free. Do these in order.

## 1. Supabase (stores flyers and volunteer logins)

1. In your Supabase project, open **SQL Editor → New query**.
2. Paste everything from `supabase/schema.sql` and click **Run**.
3. New query again: paste everything from `supabase/seed.sql` and click **Run**. This adds your 11 current flyers.
4. New query again, to add who can post flyers (one line per person):
   ```sql
   insert into editors (email) values ('you@example.com'), ('volunteer@example.com');
   ```
5. Go to **Authentication → URL Configuration**:
   - **Site URL**: your website address (for example `https://fire4prodigals.netlify.app`, later `https://fire4prodigals.com`)
   - **Redirect URLs**: add `https://YOUR-SITE/admin`
6. Go to **Project Settings → API** and copy the **Project URL** and the **anon public** key.

## 2. Netlify (puts the website online)

1. **Add new site → Import an existing project → GitHub**, then pick the `Fire4Prodigials` repository.
2. Netlify reads the settings from `netlify.toml`. Before deploying, open **Environment variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL`: the Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: the anon public key
   - `NEXT_PUBLIC_WEB3FORMS_KEY`: free key from web3forms.com (for the contact form)
3. Click **Deploy**. When it's done, your site is live at the address Netlify shows.

## 3. Posting a flyer

1. Go to `YOUR-SITE/admin` and enter your email.
2. Open the sign-in link from your inbox.
3. Tap **+ Add event**, add the flyer, fill in the details, and tap **Publish event**.
4. It shows on the site within about a minute. Past events move to "Past" automatically.

Notes
- Only emails in the `editors` list can post. Anyone else who signs in just sees a message.
- Supabase's free email sender allows only a few sign-in emails per hour. Once signed in, you stay signed in on that device.
- A daily check (`netlify/functions/keep-alive.mjs`) keeps the free Supabase project from pausing.
- If Supabase is ever unreachable, the site shows the built-in flyers instead of a blank page.

## 4. Your domain (later)
In Netlify: **Domain management → Add a domain** → `fire4prodigals.com`, then follow its DNS steps at your domain registrar.
Afterwards, update the Site URL and Redirect URL in Supabase (step 1.5).
