# BRIEF: golden-wings-robyn.com funnel (Prompt 1)

Status: draft for Caleb. Every offer spot below is a PROPOSAL. Nothing here is decided, reworded, or built.

Sources used, and only these: `content/site/*.md`, `content/pages/*.md`, `content/people/*.md`, `app/pages/*.vue`, `app/components/*`, the nav in `content/site/chrome.md`, and the preview https://golden-wings-robyn-nuxt.calebmills99.workers.dev (sitemap: 45 URLs). Quotes are the site's own words. Where the site says nothing, the brief says `[CALEB WRITES]`.

House rules this brief follows:
- The site is a funnel and a film info lobby, never a screening site. Screening happens at https://gwingz.com.
- Story first, then ONE gwingz.com invitation at the END of a page. No Watch button in the header or nav.
- Offer wording is always `[CALEB WRITES]`.

---

## 1. Who the site is for (the site's own words)

- **Press and festivals.** Contact page: "Press & festivals: info@golden-wings-robyn.com". Press kit: "For media" and "Everything for coverage of Golden Wings: Stewardess to Sky Queen."
- **Former crew and families.** Contact page: "Former crew & families: Share your story". Home: "For the people who were there. You were there. That makes you the archive." ... "If you worked a cabin, a cockpit, a ramp or a training room, we want your photographs and your stories."
- **People who want to see it play.** Screenings card: "Know when it plays near you. Screenings and premieres, once a month at most."
- **Readers following the making of the film.** Indie Doc Journey: "Festival lessons, craft notes, and the long road of an independent aviation documentary."
- **People fighting a Facebook ban.** Special Dispatch: "the Indie Doc Journey lane for Facebook ban and hacked-account recovery."
- **Everyone else.** Contact page: "Everything else: info@golden-wings-robyn.com".
- Who the core visitor is (one sentence, in Caleb's words): `[CALEB WRITES]`

---

## 2. Funnel order (from the real nav and in-page links)

Header nav (`content/site/chrome.md`), in order: Film, About (/about-the-film), People, Journey (/indie-doc-journey), Press Kit, Contact. The brand links to Home. No Watch item (removed in Prompt 0.5; `navCta` text still sits unused in chrome.md).
Footer nav: Press Kit, info@golden-wings-robyn.com, Privacy, Terms, SMS Opt-In.

**Main path (in-page buttons):**

```
Home  --"The film"-->  /film  --"Full story"-->  /about-the-film  --"Meet the people"-->  /people  -->  /people/{person}
                                                              \--"Contact"-->  /contact
```

**Side paths (in-page links):**

- Home "Archive page" -> /stewardess-college-1968 -> "Millie Alford" and "Robyn Stewart" person pages.
- Home "Indie Doc Journey" -> /indie-doc-journey -> posts, and the Special Dispatch card -> /special-dispatch/facebook-banned-on-christmas-eve. Journey "Share your story" -> /#crew (home crew form).
- Home poster "Press kit" -> /press-kit -> "Request screener" -> /contact, and "Request EPK (PDF)" (mailto).
- /contact "Share your story" -> /#crew. Screenings card "SMS terms" -> /sms-opt-in.
- 404 -> "Home" and "Journey".
- Person pages -> "All people" -> /people.

**Dead ends today (no next step after the last section):** /film (ends on Synopsis), /press-kit (ends on Teaser art), /special-dispatch detail (ends on its PDF and "All Special Dispatches" buttons).

**Outside the funnel (in the sitemap, not in nav, no in-page links to them found):** /1971, /elevate, /lgbt, /pascua, /poster, /prekick, /pride, /sbiff (legacy campaign pages), plus /privacy-policy, /terms-of-use, /sms-opt-in (footer only).

---

## 3. Page by page

Format for each page: Feel / Learn / Next step / gwingz.com offer spot (PROPOSAL) / Current state.
"Feel" is Caleb's call; each one shows the page's own cue so he can react to it.

### 3.1 Home `/` (`app/pages/index.vue`, `content/site/home.md`)

- **Feel:** `[CALEB WRITES]` (site cue: the timeline, "Robyn is still flying.")
- **Learn:**
  - 1968: "Jay Ricks engineers the 747 training program." 1971: "His daughter Robyn joins the first crew." 2026: "Robyn is still flying. Now with Golden Wings, after 50+ years of service."
  - Laurels: IGFA Best Documentary Short, Silicon Beach Best Short Cinematography, Independent Shorts Awards Best Mobile Short, Magic Silver Screen Best Documentary Short and Best First Time Director.
  - Archive 1968: American Airlines Stewardess College, "weight checks, girdle rules, the machine that made cabin crews."
  - Archive 1971: Robyn's graduation day, with her parents.
  - Crew call: the film is "built from the memory of people who flew."
  - Official 2026 poster.
  - The story: "Shot as a micro-budget student project that grew into an award-winning short," recognized at the Swedish International Film Festival, Magic Silver Screen, and Independent Shorts Awards.
  - About the footage: lost period footage is reconstructed "with synthetic media and says so on screen. Every person you see in the film is real."
- **Next step:** "The film" -> /film (hero and story sections). Secondary: Archive page, Share your story (on-page form), Press kit, Indie Doc Journey, screenings text list.
- **Offer spot (PROPOSAL):** one gwingz.com invitation after the last section, "About the footage" (`#synthetic-media`), which follows "The story." Wording: `[CALEB WRITES]`.
- **Current state:** ZERO gwingz.com links (preview check: 0). Hero and first-cut watch buttons were removed in Prompt 0.5.

### 3.2 Film `/film` (`app/pages/film.vue`, `content/site/film.md`)

- **Feel:** `[CALEB WRITES]` (site cue: synopsis title "Keep going")
- **Learn:**
  - "One American Airlines family across the 747 rollout, cabin service since 1971, and the years that remade the job."
  - "From girdle checks at stewardess college to golden wings after fifty years in the cabin, one American Airlines family carries the 747 rollout, 9/11, sobriety, and loss across three generations."
  - Robyn Stewart has flown for American Airlines since 1971. Caleb directed. Jay R. Ricks, her father, was an AA flight engineer on the 747 training program. Jock Bethune appears on camera.
  - The feature "is still in the edit" and "stays under wraps until it premieres."
- **Next step:** "Full story" -> /about-the-film (today this button sits in the hero, not after the synopsis).
- **Offer spot (PROPOSAL):** one gwingz.com invitation after the "Synopsis" section ("Keep going"), the last section. Wording: `[CALEB WRITES]`.
- **Current state:** TWO watch buttons, both before the story: `film.vue:13` (hero primary button, `hero.primaryCta`) and `film.vue:23` (first-cut band button, `firstCut.cta`). The first-cut band (`film.vue:18-26`) is its own offer section above the synopsis. What happens to these is Caleb's call.

### 3.3 About the Film `/about-the-film` (`app/pages/[slug].vue` layout `about`, `content/pages/about-the-film.md`)

- **Feel:** `[CALEB WRITES]` (site cue: motto "Find Your Wings")
- **Learn:**
  - Robyn has flown for American Airlines for 55 years, from before the 747's first commercial flight, through deregulation, the boom years, and September 11. She buried her husband Henry in Frankfurt, went through rehab, and returned to the job.
  - Her parents raised Caleb while she flew. Caleb shot the first version as a nine-minute college project and expanded it into Golden Wings.
  - Jay R. Ricks built American's 747 pilot training program; Jock Bethune's department produced its 35mm slides. Three generations of one family worked for the same airline.
  - The trailer.
- **Next step:** "Meet the people" -> /people. Secondary: "Contact".
- **Offer spot (PROPOSAL):** one gwingz.com invitation after the "TRAILER" section, the end of the body, before the "Meet the people" / "Contact" buttons. Wording: `[CALEB WRITES]`.
- **Current state:** already has TWO gwingz.com links at the end of the body (`about-the-film.md:40`, "Screenings live on gwingz.com. Find a screening"). Not flagged in the task list; noted so Caleb can decide.

### 3.4 People `/people` (`app/pages/people/index.vue`, `content/site/people.md`)

- **Feel:** `[CALEB WRITES]` (site cue: motto "Find Your Wings")
- **Learn:** "Golden Wings follows one American Airlines family across three generations": Robyn Stewart (the flight attendant), Jay R. Ricks (the flight engineer), Jock Bethune (the collaborator), Millie Alford (the head of school), Caleb Mills Stewart (the director).
- **Next step:** a person page.
- **Offer spot (PROPOSAL):** one gwingz.com invitation after the people grid. Option: no offer on this index. Caleb decides.
- **Current state:** 0 gwingz.com links.

### 3.5 Person pages `/people/{slug}` (`app/pages/people/[slug].vue`, `content/people/*.md`)

- **Feel:** `[CALEB WRITES]`
- **Learn (one line each, from each page):**
  - Robyn Stewart: started Stewardess College June 24, 1971; has flown 55 years; girdle checks and weigh-ins; trained on the 747 her father worked on; removed from service in 2013, rehab, came back; husband Henry died in 2014 on a Frankfurt layover.
  - Jay R. Ricks (1919-2016): WWII A-20 flier; flight engineer by 1950; in charge of developing the 747 ground school; 35 years with American.
  - Jock Bethune: joined American September 16, 1968; his department made 24,000 slides in one month for the 747 ground school; "They call me Mister American Airlines."
  - Millie Alford (1922-2000): first director of the Stewardess College, opened 1957; stood at the staircase at Robyn's graduation. Her segment "is in development and is not in the current cut of the film."
  - Caleb Mills Stewart: director's statement; shot on a Samsung S20; nine-minute cut finished March 2023 in Janice Engel's class; premiered at Silicon Beach Film Festival at the TCL Chinese Theatre; NewsFest gave three awards; Palma Film Festival selection.
- **Next step:** "All people" -> /people. Onward step to Contact or elsewhere: `[CALEB WRITES]` (none today).
- **Offer spot (PROPOSAL):** one gwingz.com invitation after the bio body, before "All people". Option: no offer on person pages. Caleb decides.
- **Current state:** 0 gwingz.com links.

### 3.6 Stewardess College 1968 `/stewardess-college-1968` (`app/pages/stewardess-college-1968.vue`)

- **Feel:** `[CALEB WRITES]` (site cue: "Robyn's training world")
- **Learn:** restored 1968 footage from American Airlines Stewardess College in Fort Worth: "weight checks, girdle rules, the machine that made cabin crews."
- **Next step:** "Millie Alford" and "Robyn Stewart" person pages.
- **Offer spot (PROPOSAL):** one gwingz.com invitation after the archive film and its person buttons (end of page). Wording: `[CALEB WRITES]`.
- **Current state:** 0 gwingz.com links.

### 3.7 Indie Doc Journey `/indie-doc-journey` and posts (`app/pages/indie-doc-journey/*`)

- **Feel:** `[CALEB WRITES]` (site cue: "the long road of an independent aviation documentary")
- **Learn:** festival lessons, craft notes, people, From the Galley crew stories, and Special Dispatch № 01.
- **Next step:** a post; "Share your story" -> /#crew.
- **Offer spot (PROPOSAL), index:** one gwingz.com invitation after the "Have one of your own?" share box (end of page). Option: no offer on the index.
- **Offer spot (PROPOSAL), posts:** one gwingz.com invitation after the post body. Option: no offer on posts.
- **Current state:** index 0 gwingz.com links. Two posts already link to gwingz.com in their body: `life-meets-you-where-you-are.md:141` (1 link) and `accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:109` and `:148` (2 links).

### 3.8 Special Dispatch `/special-dispatch` and № 01 (`app/pages/special-dispatch/*`)

- **Feel:** `[CALEB WRITES]`
- **Learn:** Facebook ban and hacked-account recovery: "the receipts, the appeal maze, and what actually moved the needle." № 01, Banned on Christmas Eve, with a magazine PDF.
- **Next step:** "← Back to Indie Doc Journey"; on the dispatch, "Download PDF", "Part 2 (court win)", and "All Special Dispatches".
- **Offer spot (PROPOSAL):** one gwingz.com invitation after the dispatch body's closing buttons. Option: no offer here, since the topic is not the film. Caleb decides.
- **Current state:** 0 gwingz.com links.

### 3.9 Press Kit `/press-kit` (`app/pages/press-kit.vue`)

- **Feel:** `[CALEB WRITES]`
- **Learn:** Robyn Stewart named Legacy Producer on the feature expansion (Gwingz Studios announcement); quotes from Caleb and Robyn; credits (Director Caleb Mills Stewart, Legacy Producer Robyn Stewart, Production company Gwingz Studios); festival laurels ("More than a dozen awards"); stills credited © Gwingz Studios; poster and title logo downloads; teaser art.
- **Next step:** "Request screener" -> /contact; "Request EPK (PDF)" -> info@golden-wings-robyn.com.
- **Offer spot (PROPOSAL):** one gwingz.com invitation after "Teaser art" (the last section). Option: no offer on the press kit, since the audience is media. Caleb decides.
- **Current state:** 0 gwingz.com links.

### 3.10 Contact `/contact` (`app/pages/contact.vue`, `content/site/contact.md`)

- **Feel:** `[CALEB WRITES]` (site cue: motto "Find Your Wings")
- **Learn:** who to reach and how: Press & festivals (info@golden-wings-robyn.com), Former crew & families (Share your story), Everything else (info@golden-wings-robyn.com). Screenings text list.
- **Next step:** email, the crew form (/#crew), or the screenings text list.
- **Offer spot (PROPOSAL):** one gwingz.com invitation after the Screenings card (end of page). Option: no offer on Contact. Caleb decides.
- **Current state:** watch button at `contact.vue:23` (ghost button, `contact.md` `cta`), between the audience list and the Screenings card.

### 3.11 Pages that may carry no offer (option, not a decision)

- **Privacy Policy, Terms of Use:** 0 gwingz.com links today. Option: no offer.
- **SMS Opt-In:** has one `:watch-cta` today (`sms-opt-in.md:30`, placement `optin`) in "Join the list." Option: keep, move to page end, or none.
- **404:** 0 gwingz.com links; next step "Home" and "Journey." Option: no offer.
- **Legacy campaign pages** (/1971, /elevate, /lgbt, /pascua, /poster, /prekick, /pride, /sbiff): see open questions.

### Shared component note

- `app/components/content/WatchCta.vue:3` has a default `text` value (same wording as the /film hero button). The current offer wording in `film.md` (`hero.primaryCta`, `firstCut.label`), `contact.md` (`cta`), `sms-opt-in.md` ("Join the list"), and that default uses a word the house rules ban in offer wording. Replacement wording: `[CALEB WRITES]`.
- `app/utils/funnel.ts` builds every gwingz.com link with UTM tags (`utm_content` = placement). Placement names for new spots: `[CALEB WRITES]`.

---

## 4. Open questions for Caleb

1. **Offer wording.** The single gwingz.com invitation text (and whether it varies by page): `[CALEB WRITES]`.
2. **Approve or change each PROPOSAL spot** in section 3, including which pages carry no offer (People index, person pages, Journey, Special Dispatch, Press Kit, Contact, SMS Opt-In, legal, 404).
3. **/film watch buttons** (`film.vue:13`, `:23`) and the first-cut band: remove, move after the synopsis, or keep?
4. **/contact watch button** (`contact.vue:23`): remove, move, or keep?
5. **/about-the-film** already ends with two gwingz.com links: keep as its one spot, trim to one, or reword?
6. **Journey posts** with gwingz.com links in the body (life-meets-you-where-you-are, accidental-selfportraits): leave as is, or bring into the one-spot rule?
7. **"First cut" vs "short film."** The site says "first cut" (/film, SMS Opt-In). House rule: the short film is the released film. Which name should the site use?
8. **Legacy campaign pages** (/1971, /elevate, /lgbt, /pascua, /poster, /prekick, /pride, /sbiff) are in the sitemap with old Squarespace copy (limited edition, early access, discounts, perks). Keep, rewrite, redirect, or drop from the sitemap?
9. **Fact conflicts found on the site:**
   - Robyn's mother: home "Graduation day" says "Jay and Marie Ricks"; About and Jay's page say "Maxine."
   - Swedish International Film Festival year: press kit laurels say 2024; Caleb's page says July 2025.
   - Press kit "Synopsis" section is titled "About the footage" and holds the synthetic media note, not a synopsis.
10. **Dead ends.** /film has no next step after the synopsis; person pages only go back to /people; /press-kit ends on Teaser art. What should each lead to?
11. **Feel line for each page:** `[CALEB WRITES]`.
12. **Unused `navCta`** in chrome.md ("Watch the first cut"): delete, or leave?
