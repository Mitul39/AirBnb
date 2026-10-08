# Candolim Listing Recreation

An original, desktop-first recreation of the supplied vacation-rental listing screenshots. Plain HTML, CSS, and JavaScript; no package installation, backend, or external runtime dependency is required.

## Run

From this directory, run `python3 -m http.server 8000 --bind 0.0.0.0`, then open `http://localhost:8000` (or the provided sandbox preview URL).

## Listing structure

The full page retains the existing top header, title, photo mosaic, sticky section navigation, listing details, host intro, and offer/booking panel. The booking panel is sticky in the right column while the listing content scrolls, bounded by the full listing content container. The listing now continues through sleeping arrangements, expanded amenities, a two-month date calendar, review rating summaries/chips/profile cards, expanded location map and neighbourhood information, host/co-host details, Things to know, nearby-stays carousel, and footer.

## Interactions

Clicking the main hero opens Photo Tour; **Show all photos** opens the same tour. Clicking an individual photo within the tour opens the single-image Lightbox. The Lightbox has previous/next buttons, wrapping navigation, `←` / `→` keys, and `Escape` dismissal. Save/wishlist, share feedback, amenity expansion, date selection, map zoom controls, and nearby-stays carousel arrows have frontend interactions. The prototype is not connected to booking, messaging, search, or authentication services.

## Assets and fidelity notes

`assets/` contains crops from user-provided reference screenshots. The reference URL returned a Vercel Security Checkpoint in this environment, so visual guidance came from supplied screenshots rather than a live-page comparison. This is an independent implementation and does not copy the reference site's source code. Some lower-section property copy and carousel listings are representative prototype content, not verified listing records.

## Included submission artifacts

The archive includes the app source and local image crops; `architecture.mmd` plus rendered PNG/PDF; `AI_PROMPTS.md`; `.claude/agents/ui-reviewer.md`; `.cursor/rules/listing-recreation.mdc`; and `VALIDATION.md`.


The calendar renders October and November 2026, supports month navigation and check-in/check-out range selection, and updates the booking-date fields and night count. **Clear dates** resets the range. The HTML references versioned CSS/JavaScript assets so a cached preview is more likely to pick up the latest build.


### Reviews section refinement

The desktop Reviews area now features a large 4.95 rating framed by two mirrored, decorative inline-SVG laurel wings (not controls), a centered Guest favourite message, an actionable How reviews work link, an overall 5-to-1 rating distribution, six icon-led category scores, eight outlined highlight chips, and reviewer cards beginning with Amit and Aheesh. The sticky Photos/Amenities/Reviews/Location navigation underlines the section currently in view. These elements remain in the listing's existing content/sidebar layout so the sticky reservation card continues to display alongside reviews.
