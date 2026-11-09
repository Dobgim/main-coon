# SEO Growth Plan — Royal Maine Coon Kittens

Last updated: 2026-11-10. Work through the checklists top to bottom: the earlier items have the biggest effect.

## 1. Keyword map

Each search a buyer makes should land on one page built for it. Don't create a second page for the same keyword, because two pages competing for one search weaken each other.

### Buyer-intent keywords (people ready to buy)

| Keyword cluster | Target page |
|---|---|
| maine coon kittens for sale evansville in · maine coon breeder evansville · maine coon kittens near me | `/` and `/maine-coon-kittens/evansville-in` |
| maine coon kittens for sale · available maine coon kittens | `/cats` |
| maine coon kittens indiana · maine coon breeders indiana | `/maine-coon-kittens/indiana` |
| maine coon kittens kentucky · maine coon breeder kentucky | `/maine-coon-kittens/kentucky` |
| maine coon kittens henderson ky | `/maine-coon-kittens/henderson-ky` |
| maine coon kittens owensboro ky | `/maine-coon-kittens/owensboro-ky` |
| maine coon kittens newburgh in · warrick county | `/maine-coon-kittens/newburgh-in` |
| maine coon kittens indianapolis · maine coon breeders near indianapolis | `/maine-coon-kittens/indianapolis-in` |
| maine coon kittens louisville ky | `/maine-coon-kittens/louisville-ky` |
| [color] maine coon kitten (silver, red, black smoke…) | each `/cats/[name]` page |

### Research-stage keywords (people deciding, who become buyers)

| Keyword cluster | Target page |
|---|---|
| how much does a maine coon kitten cost · maine coon price | `/blog/how-much-does-a-maine-coon-kitten-cost` |
| male vs female maine coon | `/blog/male-vs-female-maine-coon` |
| how to tell if a cat is a maine coon · purebred maine coon papers | `/blog/how-to-tell-if-a-kitten-is-a-purebred-maine-coon` |
| are maine coons hypoallergenic | `/blog/are-maine-coons-hypoallergenic` |
| are maine coons good family pets · maine coon with kids/dogs | `/blog/are-maine-coons-good-family-pets` |
| maine coon kitten checklist · what to buy for a maine coon kitten | `/blog/maine-coon-kitten-checklist` |
| how big do maine coons get · maine coon growth chart | `/blog/how-big-do-maine-coons-get` |
| maine coon grooming | `/blog/maine-coon-grooming-tips` |
| reputable maine coon breeder · maine coon kitten scams | `/blog/finding-reputable-maine-coon-breeder-evansville-in` |

### Next articles to write (one or two a month)
- Maine Coon colors explained (with photos of your own kittens)
- Maine Coon vs Norwegian Forest Cat / vs Siberian
- What is HCM, and why breeders test for it
- Maine Coon kitten growth by month (weights from your own litters are content nobody else has)
- What happens on pickup day at our Evansville cattery (your own photos and video)

**Why:** in November 2026, searches for "Maine Coon kittens Evansville Indiana" mostly returned spam pages and an Evansville, *Minnesota* breeder. No strong local site holds the top spot, so you can take it.

## 2. Backlinks and citations

A backlink is another website linking to yours. For a local business, the strongest links are listings that repeat your **exact** name, address and phone number. AI engines and Google cross-check these:

> **Royal Maine Coon Kittens** · 219 S Grand Ave, Evansville, IN 47713 · (317) 225-7139 · https://royalmainecoonkiten.com

Use that line character for character everywhere.

### Tier 1: do these first (free, highest impact)
- [ ] **Google Business Profile**: business.google.com, category "Cat breeder". Add photos weekly and post new litters.
- [ ] **Bing Places for Business**: bingplaces.com (import from Google). This feeds ChatGPT search and Copilot.
- [ ] **Apple Business Connect**: businessconnect.apple.com (Apple Maps and Siri).
- [ ] **TICA cattery registration and breeder directory**: tica.org. Only list here if the cattery is registered with TICA.
- [ ] **CFA cattery registration and Find-a-Breeder**: cfa.org. Only if registered with CFA.
- [ ] **Maine Coon Breeders & Fanciers Association (MCBFA)**: mcbfa.org membership and breeder listing.
- [ ] **Facebook page and TikTok**: make sure the website link and the exact name/address/phone are in the bio (both already linked from the site).

### Tier 2: breed and pet directories
- [ ] creatures.com breeder directory (already shows up for Indiana and Kentucky Maine Coon searches)
- [ ] Yelp (yelp.com/biz), category Pet Breeders
- [ ] Nextdoor business page (local word of mouth in Evansville and Newburgh)
- [ ] Instagram and Pinterest (pin kitten photos with links to each `/cats/[name]` page)
- [ ] YouTube channel: short kitten videos with a link to the kitten's page in the description

### Tier 3: earned local links (strongest long term)
- [ ] **Your veterinarian**: ask if they list breeders they work with, or write a short testimonial for them.
- [ ] **Evansville Regional Business Committee / Southwest Indiana Chamber**: a membership listing links to your site.
- [ ] **Local news and lifestyle**: Evansville Living, Courier & Press, 14 News, WEVV. Pitch a story such as "Evansville family has raised gentle-giant cats since 2010", or offer a kitten for a feature.
- [ ] **Local cat shows**: sponsor or exhibit at a TICA or CFA show in the region; event pages link to sponsors.
- [ ] **Breed roundup articles**: email the authors of "Maine Coon breeders in Indiana" articles on catster.com and mainecooncentral.com and ask to be included. Point to your health testing and your address.
- [ ] **Happy families**: ask buyers who blog or post on social media to link to your site.

### Reviews (the trust signal AI engines lean on most)
- [ ] After every pickup, send the buyer your Google review link. Aim for 2–4 real reviews a month.
- [ ] Reply to every review.
- [ ] Once you have real reviews, replace the placeholder stories in `src/data/rehomed.ts` with them (with each family's permission).

### Do not do these (they get sites penalized)
- Buying links, link packages or "1,000 backlinks for $50" gigs
- Spun or AI-generated guest posts on unrelated sites
- Fake reviews, or reviews written by friends who never bought a kitten
- Listing different phone numbers or addresses on different sites

## 3. Monthly routine (about one hour)
1. Post new kittens on the site (they're added to the sitemap and `llms.txt` automatically on each deploy).
2. Post the same kittens on Google Business Profile with photos.
3. Request 2–4 reviews from recent buyers.
4. Publish one new article from the list above.
5. Check Google Search Console → Performance and Bing Webmaster Tools → Search Performance for new keywords you're appearing for, and note them here.
