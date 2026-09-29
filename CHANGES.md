# CHANGES: Nuxt rebuild vs. current live Astro site

Everything below is mechanical, approved, or a restoration. Nothing else in Caleb's copy was rewritten.
Review the em-dash table; if a replacement reads wrong, fix the markdown in `content/` directly.

## Summary

| Change | Count |
|---|---|
| Em dashes replaced (characters) | 135 (on 116 lines) |
| "AI-generated" to "synthetic media" | 1 |
| Mojibake sequences fixed | 5 (3 kinds) |
| caleb@ to info@ (content) | 1 (plus JSON-LD, header, footer, contact in code) |
| HTML entity decoded | 1 |
| Restored text (truncated description, obfuscated email) | 2 |
| Internal links: trailing slash removed | 3 |
| Structural | 1 |

## Content source (decision 4)

- `content/blog`, `content/people`, `content/pages` (about, legal, 8 campaign pages) come from the **last commit** of robyn-site (`git show HEAD`), which undoes the 9/20 ingest damage: Zucked on Christmas Eve Part 1 is back to 453 lines (working tree had 235), film description is intact, and apostrophe truncation is gone.
- Page copy that was hardcoded in `.astro` files now lives in `content/site/*.md` (home, film, contact, press kit, people, journey, dispatch index, 1968 archive, screenings card, 404, header/footer chrome) and was taken from the **working tree** (Watch-the-first-cut CTAs to gwingz.com, FORMS_MAIL setup).
- There is no ingest script in this repo. Edit markdown in `content/` and redeploy.

## Branding swaps (decision 5)

- Header and footer brand line: "Fifty Year Flight Path" to "Stewardess to Sky Queen".
- Home `<title>`: "Golden Wings / Fifty Year Flight Path" to "Golden Wings: Stewardess to Sky Queen" (the H1 already said this). Film H1: "Fifty Year Flight Path" to "Stewardess to Sky Queen".
- Footer: "© 2026 Gwingz Studios".
- Public email is info@golden-wings-robyn.com everywhere: header, footer, contact page, Caleb's bio, JSON-LD (Organization, Person, Movie contact points). caleb@ is gone.
- **Left alone (not in the approved swap list, Caleb to decide):** "Golden Wings / Fifty Year Flight Path" in Caleb's bio (`content/people/caleb-mills-stewart.md`, description and body), "Based on: Golden Wings: Fifty Year Flight Path (short)" in the press kit facts, the blog post titled "Golden Wings Fifty Year Flight Path: Celebrating Milestones", and the "50 Year Flight Path" title art on /about-the-film.

## Structure and routing

- No trailing slashes. Every slash URL 301s once to the no-slash form (including /special-dispatch/*).
- 8 campaign pages are real pages: /1971 /elevate /lgbt /pride /pascua /poster /prekick /sbiff (H1 added from the page title; no H1 before).
- /optin folds into /sms-opt-in ("Join the list" section added there) and 301s; /optin is out of the sitemap.
- Clown International post stays unpublished; its URL 301s to /indie-doc-journey.
- `server/redirects.json`: 73 single-hop rules (79 originals, minus the 8 campaign pages that are now real pages, plus the Clown post and /sitemap-index.xml). /sbiff/p/* now lands on /sbiff in one hop.
- Videos: the three self-hosted MP4s (which 404'd on live) are now Cloudflare Stream embeds (hero reel, 1968 Stewardess College clip, About trailer). Public, no signed URLs.
- Legal pages got an H1 from their title.
- Special Dispatch block attributes (`## Heading {#id}`, `{.class}` under a paragraph) are applied by `content-plugins/remark-attrs.mjs`, so the in-page anchors (#start-here, #part-1, and so on) work.

## Visual deviations (parity, not redesign)

- `app/assets/css/media.css` is new. The live home hero had no CSS for `.hero__media` and its video 404'd, so the poster rendered twice in page flow above the logo. The rebuild puts the reel behind the hero copy (the layout the old `.home-hero__media` rules describe), fixes the logo aspect ratio, and positions the "Synthetic media reconstruction" label top right as ds-2026.css intended.
- Images are served as resized WebP previews via `/_ipx/`. Originals stay at their old URLs (press kit downloads are unchanged).

## Headshots

From `E:\~GoldenWings\presskit\Images\Headshots`:
- `images/people/jay-r-ricks.jpg`: from Jay_R_Ricks&Robyn2014.png (resized to 1600).
- `images/people/jock-bethune.jpg`: from the Jock Bethune cover JPG.
- `images/people/robyn-stewart.jpg`, `images/press/robyn-headshot.jpg`, `images/headshots/robyn-stewart.jpg`: from RobynHeadshot_TealOrangeBG_upscale.jpg.
- caleb-mills-stewart.png and mildred-alford-studio.jpg already matched.

## Other deviations to review

- /about-the-film keeps the committed "Find a screening" line linking to gwingz.com.
- The "Legacy Producer" video referenced in robyn-site was not migrated (not one of the three approved videos).
- Scraped Squarespace markup: the `/cdn-cgi/l/email-protection` link in "BHIFF here we come" (Cloudflare email obfuscation, dead outside the live zone) is decoded back to info@golden-wings-robyn.com.
- Markdown renders with smartypants (curly quotes, ellipses) as Astro did; dash conversion is off so no new em dashes appear.

## Non-em-dash text changes

| File | Kind | Before | After |
|---|---|---|---|
| content/pages/about-the-film.md | structure | self-hosted <video> trailer (404 live) replaced by Cloudflare Stream embed ::stream-video | |
| content/blog/i-sued-meta-in-small-claims-court-and-won.md:109 | ai-generated | … Facebook is now, essentially a wasteland of angst and whatever gross AI-generated thing the algorithm coughs up to monetize the human dopamine delivery… | … Facebook is now, essentially a wasteland of angst and whatever gross synthetic-media thing the algorithm coughs up to monetize the human dopamine delivery… |
| content/pages/pascua.md:3 | entity | description: q no entres aqui &#124; cuidado &#124; peligro | description: q no entres aqui \| cuidado \| peligro |
| content/people/caleb-mills-stewart.md:45 | email | Press and festival inquiries: [caleb@golden-wings-robyn.com](mailto:caleb@golden-wings-robyn.com). Production: Gwingz Studios. | Press and festival inquiries: [info@golden-wings-robyn.com](mailto:info@golden-wings-robyn.com). Production: Gwingz Studios. |
| content/site/home.md | mojibake | ┬╖ | · |
| content/site/home.md | mojibake | ├⌐ | é |
| content/site/home.md | mojibake | ΓÇô | – |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:3 | restore | description: 'In a Parisian elevator in 2005, my impatient ex-boyfriend couldn' | description: "In a Parisian elevator in 2005, my impatient ex-boyfriend couldn't wait thirty seconds for my camera shot. Seventeen years later, that footage opens my documentary screening at the Palma Film Festival while he's still struggling to pay parking tickets. Sometimes creative vindication arrives in the most deliciously ironic packages." |
| content/blog/bhiff-here-we-come.md:55 | restore | Email: [email&#160;protected](/cdn-cgi/l/email-protection#660f0800092601090a0203084b110f0801154b1409041f084805090b) | Email: [info@golden-wings-robyn.com](mailto:info@golden-wings-robyn.com) |
| content/blog/i-sued-meta-in-small-claims-court-and-won.md:466 | link | [More dispatches from the Indie Doc Journey](/indie-doc-journey/) | [More dispatches from the Indie Doc Journey](/indie-doc-journey) |
| content/blog/i-sued-meta-in-small-claims-court-and-won.md:477 | link | …d on Christmas Eve](/special-dispatch/facebook-banned-on-christmas-eve/) (the Christmas Eve ban timeline and recovery notes). | …d on Christmas Eve](/special-dispatch/facebook-banned-on-christmas-eve) (the Christmas Eve ban timeline and recovery notes). |
| content/blog/zucked-on-christmas-eve-part-1.md:453 | link | …d on Christmas Eve](/special-dispatch/facebook-banned-on-christmas-eve/) (the full timeline, recovery steps, and what Meta would not say). | …d on Christmas Eve](/special-dispatch/facebook-banned-on-christmas-eve) (the full timeline, recovery steps, and what Meta would not say). |

## Em-dash replacements (135 characters, 116 lines)

Rule: em dash to comma, colon, or period depending on grammar. Before/after shows the changed span.

| File:line | Before | After |
|---|---|---|
| content/blog/10-documentaries-that-will-inspire-and-transform-you.md:56 | …es among the tunnel dwellers, captures every aspect of their existence—their struggles, their community, and their humanity. | …es among the tunnel dwellers, captures every aspect of their existence: their struggles, their community, and their humanity. |
| content/blog/10-documentaries-that-will-inspire-and-transform-you.md:60 | …at documentarians style themselves as Indiana Jones with a film camera—adventurous, daring, and deeply committed to uncovering hidden truths. | …at documentarians style themselves as Indiana Jones with a film camera: adventurous, daring, and deeply committed to uncovering hidden truths. |
| content/blog/10-documentaries-that-will-inspire-and-transform-you.md:74 | … Their relationship is reminiscent of a character from a Dickens novel—an old woman still wearing her wedding dress in a decrepit house. It’s… | … Their relationship is reminiscent of a character from a Dickens novel, an old woman still wearing her wedding dress in a decrepit house. It’s… |
| content/blog/10-documentaries-that-will-inspire-and-transform-you.md:90 | …he documentary to watch if you were a child of the '70s, '80s, or '90s—and even beyond, as Mr. Rogers' show is still being shown on PBS. This… | …he documentary to watch if you were a child of the '70s, '80s, or '90s, and even beyond, as Mr. Rogers' show is still being shown on PBS. This… |
| content/blog/10-documentaries-that-will-inspire-and-transform-you.md:136 | This documentary about Matthew and his friends—those who knew and loved him—is absolutely touching and heart-wrenching at the same time. It's a be… | This documentary about Matthew and his friends, those who knew and loved him, is absolutely touching and heart-wrenching at the same time. It's a be… |
| content/blog/10-documentaries-that-will-inspire-and-transform-you.md:202 | … in Delhi, India. The film follows two brothers who take care of kites—birds affected by the ever-increasing urban landscape and pollution of… | … in Delhi, India. The film follows two brothers who take care of kites, birds affected by the ever-increasing urban landscape and pollution of… |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:25 | …vator video from the Eiffel Tower in Paris captures more than a moment—it freezes youthful ambition amid confinement and a vast skyline. The s… | …vator video from the Eiffel Tower in Paris captures more than a moment. It freezes youthful ambition amid confinement and a vast skyline. The s… |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:33 | …an show titled "Impatience as Performance Art." His persistent refrain—"Hurry UP, what are you DOING? Why are you taking so LONG?"—provided an ironic soundtrack to what would eventually become the open… | …an show titled "Impatience as Performance Art." His persistent refrain, "Hurry UP, what are you DOING? Why are you taking so LONG?", provided an ironic soundtrack to what would eventually become the open… |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:39 | …rushed moments into lasting art. How the very act of refusing to hurry—of insisting on your vision despite the chorus of sighs and eye-rolls from those who lack imagination—becomes its own form of resistance. | …rushed moments into lasting art. How the very act of refusing to hurry, of insisting on your vision despite the chorus of sighs and eye-rolls from those who lack imagination, becomes its own form of resistance. |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:43 | …articularly fortunate, they even help fund your next parking adventure—one borrowed euro at a time. | …articularly fortunate, they even help fund your next parking adventure, one borrowed euro at a time. |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:53 | …evator, the faint silhouette of a young man holding the camera appears—almost ghostly, caught in time. | …evator, the faint silhouette of a young man holding the camera appears, almost ghostly, caught in time. |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:65 | …, in retrospect, was cinematic déjà vu. The shot I insisted on keeping—despite my then-boyfriend’s sighs— | …, in retrospect, was cinematic déjà vu. The shot I insisted on keeping, despite my then-boyfriend’s sighs, |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:77 | The grainy aesthetic of early 2000s DV tapes—blooming whites, crushed blacks, and lens flare artifacts—has come full circle. What once looked dated now feels soulful, akin t… | The grainy aesthetic of early 2000s DV tapes, blooming whites, crushed blacks, and lens flare artifacts, has come full circle. What once looked dated now feels soulful, akin t… |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:85 | …onal film festivals. The filmmaker's accidental cameo was always there—just waiting for the right color grade to be seen. | …onal film festivals. The filmmaker's accidental cameo was always there, just waiting for the right color grade to be seen. |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:95 | … occasional call of a seabird. Locals and tourists mingle effortlessly—couples strolling hand in hand, families picnicking, friends chatting animatedly—each frame bursting with Mediterranean allure and timeless holiday bli… | … occasional call of a seabird. Locals and tourists mingle effortlessly, couples strolling hand in hand, families picnicking, friends chatting animatedly, each frame bursting with Mediterranean allure and timeless holiday bli… |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:99 | That image of me—young, curious, persistent—starts a quiet conversation between past and present. He didn’t know a… | That image of me, young, curious, persistent, starts a quiet conversation between past and present. He didn’t know a… |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:101 | …hes_Roland_Camera_Lucida_Reflections_on_Photography.pdf) comes to mind—a photograph is a “certificate of presence.” This one just took 20 yea… | …hes_Roland_Camera_Lucida_Reflections_on_Photography.pdf) comes to mind, a photograph is a “certificate of presence.” This one just took 20 yea… |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:108 | But I'm grounded—literally. I'm recovering from a fractured tibia with a titanium rod, … | But I'm grounded, literally. I'm recovering from a fractured tibia with a titanium rod, … |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:121 | …future video, I'll share footage from a quiet cove near Deià, Mallorca—limestone cliffs, turquoise water, and the sound of students laughing … | …future video, I'll share footage from a quiet cove near Deià, Mallorca: limestone cliffs, turquoise water, and the sound of students laughing … |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:122 | …orca, check out [Fundació Miró Mallorca](https://miromallorca.com/en/) — a place where visual and memory-based storytelling collide. | …orca, check out [Fundació Miró Mallorca](https://miromallorca.com/en/), a place where visual and memory-based storytelling collide. |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:129 | …imes it enters a room we cannot. And that's the beauty of storytelling—it travels without permission. Someone will sit in Palma's CineCiutat, … | …imes it enters a room we cannot. And that's the beauty of storytelling. It travels without permission. Someone will sit in Palma's CineCiutat, … |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:140 | A: It is. I never noticed it until now—which feels wildly poetic. Like my future self had already photobombed… | A: It is. I never noticed it until now, which feels wildly poetic. Like my future self had already photobombed… |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:142 | A: Because accidents tell the truth. There's no polish, no pose—just raw intent. That's where the magic often lives. | A: Because accidents tell the truth. There's no polish, no pose, just raw intent. That's where the magic often lives. |
| content/blog/accidental-selfportraits-a-filmmakers-journey-through-time-and-memory.md:148 | A: Easy—[gwingz.com](https://www.gwingz.com). It's up and streaming for the wo… | A: Easy, [gwingz.com](https://www.gwingz.com). It's up and streaming for the wo… |
| content/blog/from-nickelodeon-to-the-sky-crafting-the-opening-for-golden-wings-documentary.md:39 | …scene evokes the sense of curiosity that drives the Golden Wings story—how imagination takes flight long before the first airplane ride. | …scene evokes the sense of curiosity that drives the Golden Wings story, how imagination takes flight long before the first airplane ride. |
| content/blog/from-the-galley-how-this-works.md:17 | … write to them first. Some stories may also be considered for the film — again, with a note to the person who shared it before anything is use… | … write to them first. Some stories may also be considered for the film, again, with a note to the person who shared it before anything is use… |
| content/blog/janice-engel-mentor-documentary.md:46 | …und during the process. This is what sets documentary filmmakers apart—they are adventurers at heart. | …und during the process. This is what sets documentary filmmakers apart. They are adventurers at heart. |
| content/blog/jdirector-statement.md:29 | …tellingMy career in film has been marked by a desire to wear many hats—writer, producer, actor. This multifaceted approach allows me to see s… | …tellingMy career in film has been marked by a desire to wear many hats: writer, producer, actor. This multifaceted approach allows me to see s… |
| content/blog/jdirector-statement.md:31 | …from Real-Life StoriesThe documentaries that have influenced me deeply—“The Stories We Tell,” “Dark Days,” “Grey Gardens,” and others—have a common thread: they capture raw, unfiltered humanity. These fil… | …from Real-Life StoriesThe documentaries that have influenced me deeply, “The Stories We Tell,” “Dark Days,” “Grey Gardens,” and others, have a common thread: they capture raw, unfiltered humanity. These fil… |
| content/blog/jdirector-statement.md:41 | … leave a lasting impact. This film has become more than just a project—it's my way of contributing to my family's legacy, a creative offspring… | … leave a lasting impact. This film has become more than just a project. It's my way of contributing to my family's legacy, a creative offspring… |
| content/blog/jdirector-statement.md:69 | ConclusionMy values—authenticity, empathy, social impact, creativity, and individuality—are the foundation of my filmmaking journey. They shape every story I … | ConclusionMy values, authenticity, empathy, social impact, creativity, and individuality, are the foundation of my filmmaking journey. They shape every story I … |
| content/blog/jonah-wrote-this-ws655-mlew4.md:27 | …e was broken. My head was deep in DCP (that’s a Digital Cinema Package—basically a fancy, encrypted G Drive file that theaters use to screen your film) creation mode, and clearly, my link-sharing skills were compromised! 😅 Here's a fresh, fully functional link—no scavenger hunt required: | …e was broken. My head was deep in DCP (that’s a Digital Cinema Package: basically a fancy, encrypted G Drive file that theaters use to screen your film) creation mode, and clearly, my link-sharing skills were compromised! 😅 Here's a fresh, fully functional link, no scavenger hunt required: |
| content/blog/jonah-wrote-this-ws655-mlew4.md:35 | It was May the 4th — a day of lightsabers, Wookiee growls, and poorly aimed Stormtrooper cosplay. The energy at Regal LA Live was electric — a perfect setting for the screening of Golden Wings at the Beyond Hol… | It was May the 4th: a day of lightsabers, Wookiee growls, and poorly aimed Stormtrooper cosplay. The energy at Regal LA Live was electric, a perfect setting for the screening of Golden Wings at the Beyond Hol… |
| content/blog/jonah-wrote-this-ws655-mlew4.md:43 | The screening was a dream — until it ended. | The screening was a dream, until it ended. |
| content/blog/jonah-wrote-this-ws655-mlew4.md:45 | In the post-screening shuffle — “everyone out, next film’s starting!” — I forgot to retrieve my $120 hard drive. One moment I was floating on… | In the post-screening shuffle, “everyone out, next film’s starting!”, I forgot to retrieve my $120 hard drive. One moment I was floating on… |
| content/blog/jonah-wrote-this-ws655-mlew4.md:67 | She stood—composed, proud, and more than ready. Like General Leia with a flight … | She stood: composed, proud, and more than ready. Like General Leia with a flight … |
| content/blog/jonah-wrote-this-ws655-mlew4.md:79 | …nated for Best Short Doc, but we didn’t take home the trophy. And yeah—I felt the sting. | …nated for Best Short Doc, but we didn’t take home the trophy. And yeah, I felt the sting. |
| content/blog/jonah-wrote-this-ws655-mlew4.md:81 | …shared with me? The moments when they connected with my family’s story—those were the wins that really mattered. | …shared with me? The moments when they connected with my family’s story. Those were the wins that really mattered. |
| content/blog/jonah-wrote-this-ws655-mlew4.md:97 | I later found out he was called Shlurp-B—a failed byproduct of a secret Empire-aligned bioengineering project k… | I later found out he was called Shlurp-B, a failed byproduct of a secret Empire-aligned bioengineering project k… |
| content/blog/jonah-wrote-this-ws655-mlew4.md:147 | the origin ripoff— I mean, story | the origin ripoff, I mean, story |
| content/blog/jonah-wrote-this-ws655-mlew4.md:168 | — Caleb StewartFilmmaker \| Star Wingz Founder \| Emotional Host to a Stic… | Caleb StewartFilmmaker \| Star Wingz Founder \| Emotional Host to a Stic… |
| content/blog/life-meets-you-where-you-are.md:138 | …ophy shaped Golden Wings. He taught that authenticity beats perfection—a lesson vital to the film's message. | …ophy shaped Golden Wings. He taught that authenticity beats perfection, a lesson vital to the film's message. |
| content/blog/swedish-film-awards-winner.md:5 | with meticulous care — winding her hair in hot rollers. At first glance, it’s | with meticulous care, winding her hair in hot rollers. At first glance, it’s |
| content/blog/swedish-film-awards-winner.md:8 | she wears, so subtly defiant, reminds me of Thor — the Viking god of strength, | she wears, so subtly defiant, reminds me of Thor, the Viking god of strength, |
| content/blog/swedish-film-awards-winner.md:78 | ## Bragi Q&A — Sundance Meets Runetech | ## Bragi Q&A: Sundance Meets Runetech |
| content/blog/swedish-film-awards-winner.md:88 | …hough mortal, composed a ballad through his lens. So yes, I flew coach—harp and all—to attend. | …hough mortal, composed a ballad through his lens. So yes, I flew coach, harp and all, to attend. |
| content/blog/swedish-film-awards-winner.md:93 | Bragi: Cinema vérité is the forge of truth. No illusions—just real life. | Bragi: Cinema vérité is the forge of truth. No illusions, just real life. |
| content/blog/swedish-film-awards-winner.md:98 | Bragi: It is an altar of memory. Not a prop—but poetry. | Bragi: It is an altar of memory. Not a prop, but poetry. |
| content/blog/swedish-film-awards-winner.md:107 | …n, and the harp tuned. For every frame carries a whisper from the gods — if you know how to listen.” | …n, and the harp tuned. For every frame carries a whisper from the gods, if you know how to listen.” |
| content/blog/wrapping-up-the-holidays-and-diving-into-the-wonderful-world-of-mocha-masks-xetef-w45bk.md:29 | Directing the naughty list—filmmaker vibes activated!I was in charge of the naughty list this yea… | Directing the naughty list, filmmaker vibes activated!I was in charge of the naughty list this yea… |
| content/blog/wrapping-up-the-holidays-and-diving-into-the-wonderful-world-of-mocha-masks-xetef-w45bk.md:31 | …out burning your tongue, I was busy wading waist-deep in the wonderful—and occasionally treacherous—world of Mocha masks. I’ve been up to my neck in Mocha masks and color correction this winter, learning that even the best of us have our lighting fails. But trust me—every misstep is just a setup for an epic comeback."Yes, I learned the … | …out burning your tongue, I was busy wading waist-deep in the wonderful, and occasionally treacherous, world of Mocha masks. I’ve been up to my neck in Mocha masks and color correction this winter, learning that even the best of us have our lighting fails. But trust me. Every misstep is just a setup for an epic comeback."Yes, I learned the … |
| content/blog/wrapping-up-the-holidays-and-diving-into-the-wonderful-world-of-mocha-masks-xetef-w45bk.md:39 | …ag. On the bright side, I landed an acting gig and even got a callback—talk about starting the new year with a win! On the documentary front, … | …ag. On the bright side, I landed an acting gig and even got a callback. Talk about starting the new year with a win! On the documentary front, … |
| content/blog/wrapping-up-the-holidays-and-diving-into-the-wonderful-world-of-mocha-masks-xetef-w45bk.md:49 | …lercoaster. While I celebrated the wins, I also faced a few rejections—from Austin to San Francisco, Oregon, and even the Toronto Queer Film … | …lercoaster. While I celebrated the wins, I also faced a few rejections: from Austin to San Francisco, Oregon, and even the Toronto Queer Film … |
| content/blog/wrapping-up-the-holidays-and-diving-into-the-wonderful-world-of-mocha-masks-xetef-w45bk.md:59 | …citing is coming our way in March. (I promise you, it’s a game changer—but mum’s the word!) For now, consider this your exclusive, hush-hush … | …citing is coming our way in March. (I promise you, it’s a game changer: but mum’s the word!) For now, consider this your exclusive, hush-hush … |
| content/blog/wrapping-up-the-holidays-and-diving-into-the-wonderful-world-of-mocha-masks-xetef-w45bk.md:69 | …kyo. Now, thanks to some Mocha masks magic, she looks 20 years younger—no filters, just proper lighting doing its job. And hey, it's not cheating—this is simply what proper lighting would have naturally achieved. Some… | …kyo. Now, thanks to some Mocha masks magic, she looks 20 years younger, no filters, just proper lighting doing its job. And hey, it's not cheating. This is simply what proper lighting would have naturally achieved. Some… |
| content/pages/1971.md:36 | Experience the unvarnished, realness that made history—directly from the big screen to your home. | Experience the unvarnished, realness that made history, directly from the big screen to your home. |
| content/pages/1971.md:41 | Only available for a short time—don't miss out on a piece of our journey! | Only available for a short time. Don't miss out on a piece of our journey! |
| content/pages/1971.md:58 | …r your passion for aviation and heartfelt family storytelling in style—show the world what Golden Wings means to you! | …r your passion for aviation and heartfelt family storytelling in style. Show the world what Golden Wings means to you! |
| content/pages/elevate.md:26 | …n the friendly skies, creating a legacy that extends beyond her career—she's a mother who balanced family with the demands of the aviation wor… | …n the friendly skies, creating a legacy that extends beyond her career. She's a mother who balanced family with the demands of the aviation wor… |
| content/pages/elevate.md:28 | By supporting us on Kickstarter, you’re not just helping fund a film—you’re joining us in honoring the spirit of bravery and service that Ro… | By supporting us on Kickstarter, you’re not just helping fund a film. You’re joining us in honoring the spirit of bravery and service that Ro… |
| content/pages/elevate.md:30 | Let’s bring Golden Wings to life together—your support means the world! | Let’s bring Golden Wings to life together. Your support means the world! |
| content/pages/elevate.md:46 | …ting to our indie festival campaign, you’re not just supporting a film — you’re helping preserve the laughter, love, and remarkable journey of R… | …ting to our indie festival campaign, you’re not just supporting a film. You’re helping preserve the laughter, love, and remarkable journey of R… |
| content/pages/elevate.md:60 | Your support can truly make a difference—and we can’t wait to celebrate this journey with you! | Your support can truly make a difference, and we can’t wait to celebrate this journey with you! |
| content/pages/elevate.md:66 | …. Watch as Calleb shares his heart and gratitude in a touching tribute—one that goes beyond family and connects us all. | …. Watch as Calleb shares his heart and gratitude in a touching tribute, one that goes beyond family and connects us all. |
| content/pages/elevate.md:106 | …a special clip featuring Caleb's mom in one of his first student films—a treasured moment that truly captures the roots of the journey. It's … | …a special clip featuring Caleb's mom in one of his first student films, a treasured moment that truly captures the roots of the journey. It's … |
| content/pages/elevate.md:112 | …n exclusive access to an early second pass digital cut of Golden Wings—offering an insider’s sneak peek into this cherished aviation journey … | …n exclusive access to an early second pass digital cut of Golden Wings, offering an insider’s sneak peek into this cherished aviation journey … |
| content/pages/elevate.md:115 | …all previous perks. It’s a perfect way to wear your support with pride—and slay the merch game wherever you go! | …all previous perks. It’s a perfect way to wear your support with pride, and slay the merch game wherever you go! |
| content/pages/elevate.md:118 | …e Precampaign Branded Pride Tumbler. Hunny, you’ll be sipping in style—this tumbler is pure eleganza. It's giving "stay hydrated, slay elevate… | …e Precampaign Branded Pride Tumbler. Hunny, you’ll be sipping in style. This tumbler is pure eleganza. It's giving "stay hydrated, slay elevate… |
| content/pages/elevate.md:124 | … heartfelt thank-you phone call from Caleb and Robyn. And don’t forget—all previous perks are included. This is your time to shine, darling! | … heartfelt thank-you phone call from Caleb and Robyn. And don’t forget, all previous perks are included. This is your time to shine, darling! |
| content/pages/elevate.md:127 | …e perks of exclusive VIP status. This includes everything listed above—time to celebrate this incredible journey as a true Golden Winger! | …e perks of exclusive VIP status. This includes everything listed above, time to celebrate this incredible journey as a true Golden Winger! |
| content/pages/elevate.md:130 | …s, you’ll get exclusive personalized Golden Wings memorabilia. Limit 5—act fast, hunny! | …s, you’ll get exclusive personalized Golden Wings memorabilia. Limit 5. Act fast, hunny! |
| content/pages/elevate.md:139 | For just $19.71—commemorating the year Robyn took to the skies—you can dive into our VIP Perks Package! This special offer includes: | For just $19.71, commemorating the year Robyn took to the skies, you can dive into our VIP Perks Package! This special offer includes: |
| content/pages/elevate.md:141 | …il from the director with all the juicy Tea from the premiere, darling—you will gag! | …il from the director with all the juicy Tea from the premiere, darling. You will gag! |
| content/pages/lgbt.md:41 | …er dedicated to weaving narratives of love, strength, and authenticity—a passion deeply rooted in the lives of my incredible mother and grand… | …er dedicated to weaving narratives of love, strength, and authenticity, a passion deeply rooted in the lives of my incredible mother and grand… |
| content/pages/lgbt.md:43 | Golden Wings isn't just a film—it's a poignant tribute to resilience and the spirit of overcoming life… | Golden Wings isn't just a film. It's a poignant tribute to resilience and the spirit of overcoming life… |
| content/pages/lgbt.md:67 | …ting to our indie festival campaign, you’re not just supporting a film — you’re helping preserve the laughter, love, and remarkable journey of R… | …ting to our indie festival campaign, you’re not just supporting a film. You’re helping preserve the laughter, love, and remarkable journey of R… |
| content/pages/lgbt.md:119 | …a special clip featuring Caleb's mom in one of his first student films—a treasured moment that truly captures the roots of the journey. It's … | …a special clip featuring Caleb's mom in one of his first student films, a treasured moment that truly captures the roots of the journey. It's … |
| content/pages/lgbt.md:125 | …n exclusive access to an early second pass digital cut of Golden Wings—offering an insider’s sneak peek into this cherished aviation journey … | …n exclusive access to an early second pass digital cut of Golden Wings, offering an insider’s sneak peek into this cherished aviation journey … |
| content/pages/lgbt.md:128 | …all previous perks. It’s a perfect way to wear your support with pride—and slay the merch game wherever you go! | …all previous perks. It’s a perfect way to wear your support with pride, and slay the merch game wherever you go! |
| content/pages/lgbt.md:131 | …e Precampaign Branded Pride Tumbler. Hunny, you’ll be sipping in style—this tumbler is pure eleganza. It's giving "stay hydrated, slay elevate… | …e Precampaign Branded Pride Tumbler. Hunny, you’ll be sipping in style. This tumbler is pure eleganza. It's giving "stay hydrated, slay elevate… |
| content/pages/lgbt.md:137 | … heartfelt thank-you phone call from Caleb and Robyn. And don’t forget—all previous perks are included. This is your time to shine, darling! | … heartfelt thank-you phone call from Caleb and Robyn. And don’t forget, all previous perks are included. This is your time to shine, darling! |
| content/pages/lgbt.md:140 | …e perks of exclusive VIP status. This includes everything listed above—time to celebrate this incredible journey as a true Golden Winger! | …e perks of exclusive VIP status. This includes everything listed above, time to celebrate this incredible journey as a true Golden Winger! |
| content/pages/lgbt.md:143 | …s, you’ll get exclusive personalized Golden Wings memorabilia. Limit 5—act fast, hunny! | …s, you’ll get exclusive personalized Golden Wings memorabilia. Limit 5. Act fast, hunny! |
| content/pages/lgbt.md:152 | For just $19.71—commemorating the year Robyn took to the skies—you can dive into our VIP Perks Package! This special offer includes: | For just $19.71, commemorating the year Robyn took to the skies, you can dive into our VIP Perks Package! This special offer includes: |
| content/pages/lgbt.md:154 | …il from the director with all the juicy Tea from the premiere, darling—you will gag! | …il from the director with all the juicy Tea from the premiere, darling. You will gag! |
| content/pages/lgbt.md:180 | …n the friendly skies, creating a legacy that extends beyond her career—she's a mother who balanced family with the demands of the aviation wor… | …n the friendly skies, creating a legacy that extends beyond her career. She's a mother who balanced family with the demands of the aviation wor… |
| content/pages/lgbt.md:182 | By supporting us on Kickstarter, you’re not just helping fund a film—you’re joining us in honoring the spirit of bravery and service that Ro… | By supporting us on Kickstarter, you’re not just helping fund a film. You’re joining us in honoring the spirit of bravery and service that Ro… |
| content/pages/lgbt.md:184 | Let’s bring Golden Wings to life together—your support means the world! | Let’s bring Golden Wings to life together. Your support means the world! |
| content/pages/prekick.md:61 | …ed out a career that defied expectations and challenged industry norms—all while raising a family, overcoming personal battles, and becoming … | …ed out a career that defied expectations and challenged industry norms: all while raising a family, overcoming personal battles, and becoming … |
| content/pages/prekick.md:63 | …olden Wings captures the human spirit behind the glamour of air travel—a story of courage, family, and the unwavering commitment to lifting o… | …olden Wings captures the human spirit behind the glamour of air travel: a story of courage, family, and the unwavering commitment to lifting o… |
| content/pages/prekick.md:67 | …lden Wings is not just a documentary about a flight attendant's career—it's about legacy, family, and the power of perseverance. Caleb’s grand… | …lden Wings is not just a documentary about a flight attendant's career. It's about legacy, family, and the power of perseverance. Caleb’s grand… |
| content/pages/prekick.md:71 | …ghlights the intersection of personal resilience and historical change—from the challenges of being a female flight attendant in the 1970s to… | …ghlights the intersection of personal resilience and historical change, from the challenges of being a female flight attendant in the 1970s to… |
| content/pages/prekick.md:77 | By supporting Golden Wings, you’re not just backing a film—you’re helping tell a story that celebrates love, bravery, and the powe… | By supporting Golden Wings, you’re not just backing a film. You’re helping tell a story that celebrates love, bravery, and the powe… |
| content/pages/pride.md:55 | …ted her first film premiere with a faux Oscar from the Hollywood Strip—symbolizing her vibrant spirit and encouraging dreams. | …ted her first film premiere with a faux Oscar from the Hollywood Strip, symbolizing her vibrant spirit and encouraging dreams. |
| content/pages/pride.md:71 | …ting to our indie festival campaign, you’re not just supporting a film — you’re helping preserve the laughter, love, and remarkable journey of R… | …ting to our indie festival campaign, you’re not just supporting a film. You’re helping preserve the laughter, love, and remarkable journey of R… |
| content/pages/pride.md:85 | Your support can truly make a difference—and we can’t wait to celebrate this journey with you! | Your support can truly make a difference, and we can’t wait to celebrate this journey with you! |
| content/pages/pride.md:91 | …. Watch as Calleb shares his heart and gratitude in a touching tribute—one that goes beyond family and connects us all. | …. Watch as Calleb shares his heart and gratitude in a touching tribute, one that goes beyond family and connects us all. |
| content/pages/pride.md:135 | …a special clip featuring Caleb's mom in one of his first student films—a treasured moment that truly captures the roots of the journey. It's … | …a special clip featuring Caleb's mom in one of his first student films, a treasured moment that truly captures the roots of the journey. It's … |
| content/pages/pride.md:141 | …n exclusive access to an early second pass digital cut of Golden Wings—offering an insider’s sneak peek into this cherished aviation journey … | …n exclusive access to an early second pass digital cut of Golden Wings, offering an insider’s sneak peek into this cherished aviation journey … |
| content/pages/pride.md:144 | …all previous perks. It’s a perfect way to wear your support with pride—and slay the merch game wherever you go! | …all previous perks. It’s a perfect way to wear your support with pride, and slay the merch game wherever you go! |
| content/pages/pride.md:147 | …e Precampaign Branded Pride Tumbler. Hunny, you’ll be sipping in style—this tumbler is pure eleganza. It's giving "stay hydrated, slay elevate… | …e Precampaign Branded Pride Tumbler. Hunny, you’ll be sipping in style. This tumbler is pure eleganza. It's giving "stay hydrated, slay elevate… |
| content/pages/pride.md:153 | … heartfelt thank-you phone call from Caleb and Robyn. And don’t forget—all previous perks are included. This is your time to shine, darling! | … heartfelt thank-you phone call from Caleb and Robyn. And don’t forget, all previous perks are included. This is your time to shine, darling! |
| content/pages/pride.md:156 | …e perks of exclusive VIP status. This includes everything listed above—time to celebrate this incredible journey as a true Golden Winger! | …e perks of exclusive VIP status. This includes everything listed above, time to celebrate this incredible journey as a true Golden Winger! |
| content/pages/pride.md:159 | …s, you’ll get exclusive personalized Golden Wings memorabilia. Limit 5—act fast, hunny! | …s, you’ll get exclusive personalized Golden Wings memorabilia. Limit 5. Act fast, hunny! |
| content/pages/pride.md:168 | For just $19.71—commemorating the year Robyn took to the skies—you can dive into our VIP Perks Package! This special offer includes: | For just $19.71, commemorating the year Robyn took to the skies, you can dive into our VIP Perks Package! This special offer includes: |
| content/pages/pride.md:170 | …il from the director with all the juicy Tea from the premiere, darling—you will gag! | …il from the director with all the juicy Tea from the premiere, darling. You will gag! |
| content/pages/pride.md:196 | …n the friendly skies, creating a legacy that extends beyond her career—she's a mother who balanced family with the demands of the aviation wor… | …n the friendly skies, creating a legacy that extends beyond her career. She's a mother who balanced family with the demands of the aviation wor… |
| content/pages/pride.md:198 | By supporting us on Kickstarter, you’re not just helping fund a film—you’re joining us in honoring the spirit of bravery and service that Ro… | By supporting us on Kickstarter, you’re not just helping fund a film. You’re joining us in honoring the spirit of bravery and service that Ro… |
| content/pages/pride.md:200 | Let’s bring Golden Wings to life together—your support means the world! | Let’s bring Golden Wings to life together. Your support means the world! |
| content/pages/sms-opt-in.md:24 | …ed, opt-in numbers are forwarded by email to the production inbox only — nothing else is stored on this server. | …ed, opt-in numbers are forwarded by email to the production inbox only. Nothing else is stored on this server. |
| content/site/contact.md:3 | description: Contact Golden Wings — press, former crew, and everything else. | description: 'Contact Golden Wings: press, former crew, and everything else.' |
| content/site/film.md:3 | description: Golden Wings — the award-winning aviation documentary on Robyn Stewart’s 55-year car… | description: Golden Wings, the award-winning aviation documentary on Robyn Stewart’s 55-year car… |
| content/site/indie-doc-journey.md:17 | text: Former crew stories land here under From the Galley — with your name and airline, after we write to you first. | text: Former crew stories land here under From the Galley, with your name and airline, after we write to you first. |
| content/site/press-kit.md:25 | by: — Caleb Mills Stewart, Director | by: Caleb Mills Stewart, Director |
| content/site/press-kit.md:27 | by: — Robyn Stewart, Legacy Producer | by: Robyn Stewart, Legacy Producer |
| content/site/screenings-card.md:12 | success: You are on the list. Screenings only — we will not blow up your phone. | success: You are on the list. Screenings only. We will not blow up your phone. |

## 2026-09-26: "Fifty Year Flight Path" retired, "Stewardess to Sky Queen" everywhere

Caleb's call (final): every "Fifty Year Flight Path" mention (and variants) becomes "Stewardess to Sky Queen". This resolves the "Left alone" items listed above. The repo was also grepped case-insensitively for "flight path", and the generic uses were reworded so the rendered site has zero hits. URL slugs and asset filenames are unchanged. Preview version `e708d5e4-d313-47ce-b618-cf19f6de4c86`.

| File | Before | After |
|---|---|---|
| content/people/caleb-mills-stewart.md:6 (description) | ...the director of Golden Wings / Fifty Year Flight Path, a film about his mother... | ...the director of Golden Wings: Stewardess to Sky Queen, a film about his mother... |
| content/people/caleb-mills-stewart.md:23 (body) | What began as a classroom assignment became Golden Wings / Fifty Year Flight Path. | What began as a classroom assignment became Golden Wings: Stewardess to Sky Queen. |
| content/site/press-kit.md:45 (credits) | [Based on, 'Golden Wings: Fifty Year Flight Path (short)'] | [Based on, 'Golden Wings: Stewardess to Sky Queen (short)'] |
| content/pages/about-the-film.md:15 (title art) | `![](/blog/5aecd9b9e7b3.png)` ("Golden Wings 50 Year Flight Path" gold wordmark image, no alt text) | `![Golden Wings: Stewardess to Sky Queen title card](/images/brand/gwssq-title-card.png)` (the canonical GWSSQ title card from the presskit design system, added as a new file; the old image file stays in place, unreferenced) |
| content/pages/elevate.md:141 | ...get a firsthand look at Robyn's flight path! | ...get a firsthand look at Robyn's journey! |
| content/pages/lgbt.md:154 | ...get a firsthand look at Robyn's flight path! | ...get a firsthand look at Robyn's journey! |
| content/pages/pride.md:170 | ...get a firsthand look at Robyn's flight path! | ...get a firsthand look at Robyn's journey! |
| content/site/not-found.md:5 (404 lede) | That route isn’t on this flight path. | That route isn’t on this itinerary. |
| content/blog/from-nickelodeon-to-the-sky-crafting-the-opening-for-golden-wings-documentary.md:39 | ...a glowing holographic globe surrounded by flight paths and digital aviation graphics. | ...a glowing holographic globe surrounded by flight routes and digital aviation graphics. |
| public/images/brand/gwssq-title-card.png | (none) | New file: byte-identical copy of `GoldenWings-Design-System/assets/brand/title-card.png` (1536x1024). NuxtImg serves it as 960w/1920w WebP. |

- Blog post `/indie-doc-journey/golden-wings-fifty-year-flight-path-celebrating-milestones-in-aviations-legacy`: no text change needed. Its title, meta, OG, and H1 already read "Golden Wings - Celebrating Milestones in Aviation's Legacy" (rendered with an en dash); "flight-path" survives only in the unchanged URL slug, path, canonical, and sourceUrl, per instruction.

## 2026-09-26: /sitemap.xml fixed (was empty)

- Root cause: the preview-only route rule `'/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } }` in `nuxt.config.ts`. @nuxtjs/sitemap 8.5.1 drops every URL whose route rules carry a noindex X-Robots-Tag header (`runtime/server/sitemap/nitro.js`), so all 45 source URLs were filtered out and the prerendered sitemap was empty. Production builds never had the rule, so they were not affected.
- Fix: removed that route rule. Pages still get `X-Robots-Tag: noindex, nofollow` from `server/middleware/00.edge.ts` on non-production Workers, and the new `scripts/postbuild-headers.mjs` (run by `npm run build`) appends `/*  X-Robots-Tag: noindex, nofollow` to `.output/public/_headers` on preview builds only, so static files keep the header. The noindex meta and robots.txt `Disallow: /` still come from `site.indexable: false` on preview.
- Result: preview /sitemap.xml lists 45 absolute https://golden-wings-robyn.com URLs with no trailing slash (the home page is the root URL), and /404 and /optin are excluded. Compared with the live sitemap-0.xml (38 URLs), it keeps all of them except /optin and adds the 8 restored campaign pages. A local `SITE_ENV=production` build also outputs 45 URLs, with robots.txt Allow + Sitemap and no X-Robots-Tag. Preview version `e8639a1b-73ab-4b86-85c2-253b4e205b4a`.

## 2026-09-26: Prompt 0.5, watch CTAs removed from the home page and header

Caleb's Prompt 0.5: no call-to-action buttons or links to watch the film on the home page, and no Watch button in the header (house rule). Nothing was reworded. Other page bodies (/film, /contact) are untouched. Preview version `f921c401-e9a1-4e8e-9f51-6d27a09e5f26`.

| File (line before edit) | Before | After |
|---|---|---|
| app/components/SiteHeader.vue:13 | `const ctaHref = watchUrl('nav')` | (removed) |
| app/components/SiteHeader.vue:28-30 | `<li><a class="nav-cta" :href="ctaHref">{{ props.chrome.navCta }}</a></li>`, rendered "Watch the first cut" linking to https://gwingz.com/?utm_source=golden-wings-robyn.com&utm_medium=site&utm_campaign=first-cut&utm_content=nav, sitewide, desktop and mobile (same nav) | (removed) |
| app/pages/index.vue:27 | Hero button "Watch the first cut, free" linking to https://gwingz.com/?...&utm_content=home-hero | (removed; the "The film" ghost button stays) |
| app/pages/index.vue:37 | `#first-cut` section label "Watch it at home, free" | (removed) |
| app/pages/index.vue:40-42 | `#first-cut` button "Send me the link" linking to https://gwingz.com/?...&utm_content=home-band | (removed) |
| content/site/home.md:19 | `primaryCta: Watch the first cut, free` | (removed) |
| content/site/home.md:33 | `label: Watch it at home, free` | (removed) |
| content/site/home.md:36 | `cta: Send me the link` | (removed) |

- Left in place for Caleb (orphaned): the `#first-cut` heading "Come see where Golden Wings began", its lede, and its fine print. Options: A remove the whole section, B keep it as text only, C Caleb rewrites it.
- Left in place: `navCta: Watch the first cut` in content/site/chrome.md (no longer rendered anywhere), the `.nav-cta` and `.section--watch` CSS, `app/utils/funnel.ts`, and the watch buttons in the /film and /contact bodies.
- Verified on the preview: home HTML has 0 gwingz.com links and 0 "watch the first cut" / "watch it at home"; the header on /, /film, /contact has no Watch link; sitemap has 45 URLs, all 200; noindex header and meta present; live Worker golden-wings-robyn still on 506559e9-e89b-42f9-a102-4c9a020c8653.

## 2026-09-26: First-cut section removed from the home page (Prompt 0.5 follow-up, Caleb's option A)

Caleb chose option A for the orphaned `#first-cut` band left by Prompt 0.5: remove the whole section. Nothing else changed (other sections, other pages, chrome.md, WatchCta.vue, funnel.ts, film/contact untouched; the unused `.section--watch` CSS stays). Preview version `bae01e97-6f79-4abc-b925-e18adfbc9375`.

| File (line before edit) | Before | After |
|---|---|---|
| app/pages/index.vue:36-40 | `<section id="first-cut" class="section section--watch full-bleed-home">` with the h2 `p.firstCut.title`, lede `p.firstCut.lede`, fine print `p.firstCut.fine` | (removed; the hero now sits directly on the Archive 1968 section) |
| content/site/home.md:31-34 | `firstCut:` block: `title: Come see where Golden Wings began`, `lede: Before Stewardess to Sky Queen there was a first cut. ...`, `fine: 'A word so nobody feels fooled: ...'` | (removed) |

- Verified on the preview home: 0 hits (case-insensitive) for "Come see where Golden Wings began", "first cut", "watch link"; no element with id first-cut; 0 gwingz.com; sitemap 45 URLs, all 200; noindex header and meta present; live Worker golden-wings-robyn still on 506559e9-e89b-42f9-a102-4c9a020c8653.
- Layout: hero bottom and archive top meet exactly (gap 0 px at 1440 and 390). In full-page screenshots the body's fixed background gradient only paints the first viewport height, so a pale band behind the archive heading turning white below it is a capture artifact; a normal scrolled viewport shows one continuous background.

## 2026-09-26: Prompt 1, BRIEF.md added (funnel brief, no site changes)

Caleb's Prompt 1: write BRIEF.md in the repo root and a FigJam funnel diagram of the same flow. Docs only. No page, component, or content file changed. Nothing deployed.

| File | Change |
|---|---|
| BRIEF.md (new) | Who the site is for, funnel order from the nav and in-page links, page-by-page feel / learn / next step, one gwingz.com offer spot per page marked PROPOSAL (always after the story), current state per page, and open questions for Caleb. All copy quoted from the site; gaps marked `[CALEB WRITES]`. |
| CHANGES.md | This entry. |

- Current gwingz.com link counts on the preview (checked 2026-09-26): / 0, /film 2 (film.vue:13, :23), /about-the-film 2 (about-the-film.md:40), /contact 1 (contact.vue:23), /sms-opt-in 1 (sms-opt-in.md:30), two Journey posts (1 and 2), all other funnel pages 0.
- FigJam diagram of the same flow: see the Prompt 1 report.
- Committed locally only ("Add BRIEF.md (Prompt 1)"), not pushed. Preview stays on `bae01e97-6f79-4abc-b925-e18adfbc9375`; live Worker golden-wings-robyn untouched.

## 2026-09-29: California LGBTQ Chamber member badge added to the footer

Caleb asked for his California LGBTQ Chamber of Commerce member badge in the footer on every page, using his markup as given. Nothing else changed (no copy, no CSS). Preview version `ef82f64b-e9eb-45f6-b135-cf15921edc25`.

| File | Change |
|---|---|
| app/components/SiteFooter.vue:17 (new line) | Caleb's badge markup (link to directory.calrainbowchamber.org, `target="_blank"`, hotlinked `memberbadge.png`, `style="border: none;"`) wrapped in a plain `<div>`, placed after `.site-footer__inner` as the last child of `<footer class="site-footer">`. |
| CHANGES.md | This entry. |

- Rendered on all 46 prerendered HTML pages; verified live on the preview at /, /film, /about-the-film, a Journey post and /contact. Badge image returns 200 (image/png, 200x161).
- Open for Caleb: the img has no alt attribute (left as given); no `rel="noopener"` added (nothing required it); because the badge sits outside the footer's content container it lines up with the left viewport edge (x=0) at 1440 and 390, and the gold badge is low contrast on the amber footer.