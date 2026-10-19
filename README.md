# Fire4Prodigals website

Next.js site for Fire4Prodigals: events/flyers, about, gallery, get involved.

## Run locally
    npm install
    npm run dev      # http://localhost:3000

## Adding an event (for now)
Add the flyer image, run `npm run images`, then add an entry to `content/events.ts`.
Events move from "Upcoming" to "Past" automatically after their date.
(Next step: a Sanity editor at /studio so volunteers can do this without code.)

## Contact form
Set `NEXT_PUBLIC_WEB3FORMS_KEY` (free key from web3forms.com) so messages reach the ministry's email.
