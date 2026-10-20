# Fire4Prodigals website

Next.js site for Fire4Prodigals: events/flyers, about, gallery, get involved.

## Run locally
    npm install
    npm run dev      # http://localhost:3000

## Adding an event
Volunteers post flyers at `/admin` (Supabase sign-in). See `SETUP.md` to connect Supabase and Netlify.
Events move from "Upcoming" to "Past" automatically after their date.
Until Supabase is connected, the site uses the built-in flyers in `content/events.ts`.

## Contact form
Set `NEXT_PUBLIC_WEB3FORMS_KEY` (free key from web3forms.com) so messages reach the ministry's email.
