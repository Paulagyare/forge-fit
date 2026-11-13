# FORGE — You Are Your Own Gym

A home-first workout web app built around dumbbells, small spaces, and consistency.

## GitHub Pages edition

The guided starting experience includes three-choice onboarding, a first-week plan with recovery check-ins, clearly labelled animated movement sketches, next-set difficulty feedback, and shareable local summary images. The full studio remains available for experienced lifters.

- Ten routines and a custom routine builder
- Twenty-seven movement guides and demonstration search links
- Session planning for time, equipment, energy, space, and preferred muscles
- Focused, resumable set logging with rest timers and exercise swaps
- Workout history, muscle-training maps, strength comparisons, and personal challenges
- Weekly schedules and importable calendar reminders
- Installable web app shell, theme preferences, and reduced-motion options
- JSON backup/restore and CSV exports

Training records stay in the current browser/device. No personal workout records, community posts, tokens, or production databases are included in this repository.

GitHub Pages serves the static application. The Commons and private cloud backups link to the separately hosted, private connected edition. Pages does not run the server or provide accounts, a shared database, video uploads, or real-time synchronization.

## Run and verify

Requires Node.js 24 or later (the API tests use the built-in SQLite module).

```sh
npm run build
npm test
npm run dev
```

The static build and tests use Node.js built-ins; installing dependencies is only necessary for the optional Worker developer tools. The preview serves `_site` at the URL printed by the command.

## Publish with GitHub Pages

```sh
npm run build:publish
```

Commit the generated `docs/` folder along with the source. In the repository's Settings → Pages, choose **Deploy from a branch**, **main**, and **/docs**, then Save. Assets, the web app manifest, and the service worker are scoped to the repository subpath. No API token belongs in the frontend.

After future changes to `web/`, rebuild `docs/` before committing. GitHub Pages automatically deploys changes to the selected branch and folder.

## Moving existing records

The old site's storage is separate from the GitHub Pages address. Export a JSON backup from Settings on the old site, then restore it in Settings on the new site. Exporting does not delete the old records. Restoring replaces the new device's local records; export those first if needed.

## Project structure

- `web/`: shared frontend source (`beginner.js` / `beginner.css` add the guided experience)
- `docs/`: generated GitHub Pages application
- `worker/`: connected-edition server source
- `drizzle/`: schema-only SQLite/D1 migration
- `tests/`: planner and API isolation/community tests
- `scripts/`: builds and development servers

## Connected backend and future app

`npm run build:worker` builds an optional Cloudflare Worker. `wrangler.jsonc` includes a local placeholder database ID, not production credentials. Configure a real D1 binding and a trusted identity gateway before deploying it. The server uses `oai-authenticated-user-id`, which must be supplied by a trusted gateway that strips client-supplied identity headers. **Do not expose this Worker directly with these headers trusted from public clients.** For an independent public app, implement a proper session/JWT identity layer and server-side authorization first.

The server source includes private per-user backups and shared posts, routines, video links, comments, cheers, reports, and blocks. Public membership, billing, native video uploads, moderation operations, push notifications while the app is closed, and native app-store packaging are later phases. Calendar reminders work through the user's calendar app after import; browser reminders need the page open.

## Training guidance

FORGE supplies general templates and transparent planning rules; it does not diagnose conditions, analyze form from video, or estimate medical readiness. Primary training references are linked in Settings: CDC activity guidelines, ACSM resistance-training guidance, and the ACE exercise library. External video searches and community videos are not individually certified.

## Rights

No open-source license is granted by publishing this repository. Choose a license deliberately before accepting external contributions or commercial distribution.
