# Validation log

At desktop preview resolution, two successive page scrolls moved from the hero into the sleeping arrangements, expanded amenities, calendar, and reviews while the offer/reservation sidebar remained visible in the right column. The content order is description → Where you’ll sleep → What this place offers → calendar → reviews → location → host → Things to know → More stays nearby. JavaScript syntax and required-section source checks pass. The browser preview loaded the rendered page and gallery assets successfully.

Remaining validation: inspect lower-page location/host/house rules and carousel at the bottom; exercise Photo Tour, Lightbox, keyboard arrows, Escape, and close.

Further scroll checks reached the location and review sections with the sidebar still visible. Source inspection and the browser preview confirmed host/co-host details, Things to know, and More stays nearby in the order described by the task. Follow-up validation will exercise the Photo Tour and Lightbox entry/keyboard controls.

Two more desktop scroll checks reached the reviews and location areas: rating summary, category scores, review chips/cards, map with search/zoom/marker, and location copy all render. The 10%-off offer and reservation card remain visible alongside these sections. Lower-page content includes host profile/co-hosts, Things to know, and nearby stays; the review extraction confirms the complete structure is present.

Gallery browser checks: clicking the hero opens the Photo Tour; clicking Show all photos opens the same Photo Tour. Selecting a gallery photo opens the dark Lightbox, and the next-arrow advances the counter from 1/5 to 2/5. Escape returned from the active overlay to the previous gallery state during testing.

The gallery was tested in the browser: the main hero opens Photo Tour; Show all photos opens Photo Tour; selecting a gallery image opens Lightbox; the next/previous buttons and ArrowRight/ArrowLeft change the counter and image; Escape returns from Lightbox to Photo Tour; and the Photo Tour X control returns to the listing. This complements code-level checks for focus return and labels. The page source and extracted browser content include the nearby-stays carousel and footer following the main sticky-sidebar container.

At the bottom anchor, the full lower page is visible. The booking sidebar reaches the end of the Things to know/content container and is absent from the More stays nearby section below it. The nearby carousel now contains 10 cards across two pages; testing the next control changed the page indicator to 2 / 2 and displayed the second five cards.

Final recheck after the follow-up: the right offer/reservation card stayed visible beside Calendar and Reviews and through Things to know, then ended before More stays nearby. Its responsive hide breakpoint was lowered to 760 px so it remains present at narrower desktop preview widths, and versioned CSS/JS URLs prevent a stale preview cache from retaining the older behavior. The Oct/Nov calendars now render real month dates, support previous/next month navigation and date ranges; Clear dates resets the selection and booking fields, and choosing Oct 18–23 restored the five-night display. Photo Tour opened from the hero; the nested Show all photos control independently opened Photo Tour; a tour photo opened Lightbox; arrow-key navigation changed images; Escape returned to Photo Tour; and its X control closed the tour. Earlier tests confirmed the Lightbox previous/next controls as well.


## Reviews design recheck

At the desktop Reviews anchor, the browser rendered two mirrored 59 × 103 px laurel SVGs around the 94 px 4.95 score, centered Guest favourite copy and How reviews work link, seven rating columns (Overall rating plus six category scores), eight chips, and a two-column reviewer layout with Amit and Aheesh first. The sticky reservation card remained visible alongside Reviews. The active Reviews tab had a 2 px underline while the section was in view. Browser checks confirmed that How reviews work produces its explanatory response. `node --check app.js` and markup assertions passed.


## Sticky sidebar boundary correction

The booking aside now belongs to `.content-layout.booking-range`, which contains the listing content through Calendar and ends immediately after the calendar section. Reviews and later sections continue in a separate content-layout, with no booking aside. The sticky CSS remains `position: sticky; top: 176px`; neither the top offset nor card styling changed. Desktop browser checks show the card at its existing sticky position beside Calendar; at the Reviews anchor it is constrained by the first container's bottom and no longer pinned to the viewport top; after scrolling further, its bounding box moved fully above the viewport while Reviews remained in view. The content order and existing visual styling were preserved.


## Centered post-calendar layout

The first content layout remains two columns (650 px main content + 372 px sidebar, 1120 px centered container) through the Calendar; the booking aside remains inside this first layout with its sticky rules unchanged. A separate continuation layout starts immediately afterward and uses one centered 1120 px column, so Reviews, Location, Host, Things to know, and nearby content no longer remain confined to the old left column. Browser measurements at 1280 px viewport confirmed both containers centered at x=73 with width 1120 px; the first layout retained its 650/372 columns and the continuation uses one 1120 px column. The Calendar preview still showed the same two-column layout and reservation card.
