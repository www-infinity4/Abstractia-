# Abstractia

Infinity ® alternate-soundtrack cinema. Three silent films from 1920, each with a curated repeating album. No uploads, AI subscription, or backend is needed to run this GitHub Pages edition.

## The program

| Film | Album | Curator's direction |
|---|---|---|
| The Cabinet of Dr. Caligari (1920) | Pink Floyd — Wish You Were Here | Spacious, dreamlike passages against expressionist unease |
| The Golem (1920) | Metallica — Metallica (The Black Album) | Heavy riffs against physical weight and imposing architecture |
| The Mark of Zorro (1920) | Journey — Escape | Soaring melodic rock for action, escapes and romance |

These are creative pairings, not claims of intentional historical synchronization.

## Playback

Choose a feature, then Start pairing. The native movie player is muted and stays on the page. The visible YouTube playlist is set to repeat. Pause, resume, restart, next song, reload music and next feature controls are included. Switching films destroys the previous music player and stops the previous film. Only one film loads at a time.

Mobile browsers can require a separate tap inside YouTube before sound starts. If shared controls cannot connect, each player remains independently usable. Ads, buffering, missing tracks and regional restrictions can shift timing or prevent music playback. Restart resets both sources; frame-exact synchronization is not guaranteed. Native player controls operate independently.

## GitHub Pages

Settings → Pages → Deploy from a branch → main → / (root) → Save.

The intended address after Pages is enabled is https://www-infinity4.github.io/Abstractia-/ . The trailing hyphen belongs to the existing repository name. Deployment of that Pages address has not been confirmed by this export.

The committed index.html, app.js and styles.css need no build workflow. To edit, change app/page.tsx and app/abstractia.css, run `npm install` and `npm run build`, then commit source and regenerated outputs. Serve through HTTP(S), not file://, for embeds.

## Source checks and limitations

On 2026-08-30 all three exact MP4 URLs returned HTTP 206, video/mp4, and the requested 1,024-byte range. Archive metadata confirmed the filenames. These are transport checks, not whole-film viewing tests. YouTube playlists were located via catalog/search references; complete track-by-track playback and regional embeddability remain unverified. No media files are redistributed here.

- [Caligari film source](https://archive.org/details/TheCabinetOfDr.Caligari1920SilentMovieHorror)
- [The Golem film source](https://archive.org/details/TheGolem_893)
- [The Mark of Zorro film source](https://archive.org/details/vidzo)
- [Wish You Were Here album source](https://www.youtube.com/playlist?list=OLAK5uy_klU9jB4SMO5SqEyFazPAVbDek2j0JVQxY)
- [Metallica album source](https://www.youtube.com/playlist?list=PLWVo2tank-zztO8BuDhNaf3c3v4GuEIap)
- [Escape album source](https://www.youtube.com/playlist?list=PLNPGM2D7aODcXjsBcs_OjWPV98wuwzb0i)

Availability does not itself establish permission for every print, restoration or music use. Check exact source terms before commercializing; retain provider controls and attribution. This app has no ad-revenue agreement, wallet, payouts or automated rights-clearance system.

Flix Blender is the next separate project and has not been built or changed as part of Abstractia.

## Sharing and unified wallet
A shared wallet bar offers native sharing, copy-link fallback, and an X post composer. Confirmed sharing earns 0.1 StarCoin once per site per wallet. Opening a composer or copying a link alone earns nothing; manual confirmation is self-reported. Credits use the same browser-local wallet as StarQuest’s unified-wallet integration, not its separate cloud ledger. Pending claims retry on return. Social preview metadata is in index.html and the card is assets/share-preview-v1.png.
