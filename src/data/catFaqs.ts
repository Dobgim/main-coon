/**
 * SEO-optimized FAQs for each cat listing.
 * Used on CatDetail pages and injected as FAQPage schema for rich results.
 */
export interface CatFaq {
  question: string;
  answer: string;
}

export const catFaqs: Record<string, CatFaq[]> = {
  oliver: [
    { question: 'What is Oliver\'s personality like?', answer: 'Oliver is highly affectionate, talkative, and playful. He thrives on human companionship, follows you from room to room, and loves lap time.' },
    { question: 'Is Oliver good with other pets?', answer: 'Yes! Oliver gets along wonderfully with other friendly cats and is great with children, though he prefers a home without dogs.' },
    { question: 'What health checks has Oliver completed?', answer: 'Oliver is fully vet-checked, up-to-date on all core vaccinations, neutered, and microchipped. He comes with a written health guarantee.' },
    { question: 'Can Oliver be shipped to another state?', answer: 'Yes, we arrange safe, temperature-controlled nationwide delivery to your doorstep from our cattery.' },
    { question: 'What is the adoption fee for Oliver?', answer: 'Oliver\'s adoption fee is $95, which covers his medical preparation, microchipping, vaccinations, and transitional food pack.' },
  ],
  luna: [
    { question: 'What is Luna\'s temperament?', answer: 'Luna is bubbly, energetic, curious, and very gentle. She loves exploring boxes, chasing feather wands, and cuddling after playtime.' },
    { question: 'Does Luna get along with dogs?', answer: 'Yes, Luna is well-socialized and gets along great with cat-friendly dogs, cats, and kids.' },
    { question: 'Why is Luna indoor-only?', answer: 'Silver Tabby Maine Coons have premium coats and outgoing natures. Keeping her indoors protects her from outdoor hazards and ensures her safety.' },
    { question: 'Is Luna spayed?', answer: 'Yes, Luna is already spayed, microchipped, and fully vaccinated.' },
    { question: 'What is her adoption fee?', answer: 'Luna\'s adoption fee is $110, which includes her full veterinary workup, vaccinations, and a kitten starter pack.' },
  ],
  max: [
    { question: 'Can Max live with other cats?', answer: 'No, Max prefers to be the only cat in the home where he can feel secure and receive all the attention.' },
    { question: 'What is a red mackerel tabby?', answer: 'It is a classic coat pattern featuring narrow parallel stripes running down the sides in a beautiful orange/ginger tone, resembling a fish skeleton pattern.' },
    { question: 'Is Max litter trained?', answer: 'Yes, Max has excellent household manners and is fully litter-trained.' },
    { question: 'Is Max good with kids?', answer: 'Yes, he is great with older, gentle children who can respect his calm nature.' },
    { question: 'What is Max\'s adoption fee?', answer: 'Max has an adoption fee of $90, covering vet checks, neutering, vaccinations, and microchipping.' },
  ],
  willow: [
    { question: 'What is a tortoiseshell coat?', answer: 'It is a beautiful mixture of black, red, and orange patches across the fur, resembling the pattern of a tortoise shell. Each tortie has a unique pattern.' },
    { question: 'Is Willow good with kids?', answer: 'Willow is shy and prefers a quiet, adult-only home without young children so she can feel safe and settle at her own pace.' },
    { question: 'Can Willow go outdoors?', answer: 'No, Willow is strictly an indoor cat for her own safety and wellbeing.' },
    { question: 'Is Willow healthy?', answer: 'Yes, she is fully vet-checked, vaccinated, spayed, and microchipped with a written health guarantee.' },
    { question: 'How long does it take for Willow to warm up?', answer: 'Typically a few weeks of quiet patience and regular feeding routines. Once she trusts you, she becomes the most devoted companion.' },
  ],
  finn: [
    { question: 'What is a "Black Smoke" coat?', answer: 'It is a rare genetic pattern where the hairs are dark charcoal/black at the tips but have pure white/silver roots, creating a dramatic shimmering effect when the cat moves.' },
    { question: 'How big will Finn get?', answer: 'Since Finn is only 1 year old, he will continue growing until age 3–4 and is expected to be a very large, impressive male Maine Coon.' },
    { question: 'Is Finn good with dogs?', answer: 'Yes, Finn is exceptionally outgoing and loves friendly, cat-savvy dogs.' },
    { question: 'Is Finn microchipped?', answer: 'Yes, he is fully microchipped, neutered, vaccinated, and registered.' },
    { question: 'What is Finn\'s adoption fee?', answer: 'Finn\'s fee is $100, covering his complete veterinary preparation and health guarantee.' },
  ],
  maisie: [
    { question: 'Why adopt a senior Maine Coon?', answer: 'Seniors are calmer, house-trained, less destructive than kittens, and make instant, quiet lap companions. They bond deeply and are incredibly rewarding.' },
    { question: 'What does "Blue Tabby" mean?', answer: '"Blue" is the official cattery term for a beautiful slate-grey coat color with subtle tabby markings.' },
    { question: 'Is Maisie healthy?', answer: 'Yes, she has undergone a full senior vet exam and is in excellent health for her age.' },
    { question: 'Is Maisie good with other cats?', answer: 'Maisie prefers to be the only pet so she can enjoy all of your attention without competition.' },
    { question: 'What is Maisie\'s adoption fee?', answer: 'Maisie has a reduced adoption fee of $60 to help her find a loving retirement home quickly.' },
  ],
  rocco: [
    { question: 'What is Rocco\'s personality like?', answer: 'Rocco is a goofy, gentle giant who is very food-motivated and loves interactive toys and puzzle feeders.' },
    { question: 'Is Rocco good with kids?', answer: 'Yes, Rocco is highly tolerant and loves playing with children of all ages.' },
    { question: 'Does Rocco get along with other cats?', answer: 'Yes, he enjoys having other friendly feline companions in the home.' },
    { question: 'Is Rocco neutered?', answer: 'Yes, he is fully neutered, microchipped, and up-to-date on all vaccinations.' },
    { question: 'What is Rocco\'s adoption fee?', answer: 'Rocco\'s adoption fee is $90, covering his medical workup, microchipping, and transition pack.' },
  ],
  poppy: [
    { question: 'Can I still apply for Poppy?', answer: 'No, Poppy has been happily adopted and is now settled in her forever home.' },
    { question: 'How often do you have Cream Tabby kittens?', answer: 'Cream is a beautiful and rarer coloration. We typically have 1–2 cream kittens per litter season.' },
    { question: 'How do I join the waitlist?', answer: 'You can submit an inquiry form on our contact page to get notified when similar kittens become available.' },
    { question: 'Where was Poppy adopted?', answer: 'She was adopted by a family local to Tacoma, Washington.' },
    { question: 'What was Poppy\'s adoption fee?', answer: 'Her fee was $110, which covered her full veterinary preparation and helped fund our care program.' },
  ],
  bramble: [
    { question: 'What is Bramble\'s personality?', answer: 'Bramble is dignified, quiet, and very affectionate once comfortable. He enjoys slow strokes and peaceful company.' },
    { question: 'Is Bramble good with dogs?', answer: 'No, Bramble prefers a calm, dog-free home to avoid unnecessary stress.' },
    { question: 'Is Bramble healthy?', answer: 'Yes, he is fully vet-checked, vaccinated, neutered, and in excellent senior health.' },
    { question: 'What is Bramble\'s adoption fee?', answer: 'Bramble\'s adoption fee is $70, reflecting our commitment to finding senior cats loving homes.' },
    { question: 'Does Bramble require a lot of grooming?', answer: 'Because of his long coat, he needs a gentle brushing 1–2 times a week, which he thoroughly enjoys as bonding time.' },
  ],
  nala: [
    { question: 'What is a "Silver Shaded" coat?', answer: 'It is a rare coloration where only the very tips of each hair are dark while the undercoat is pure white, giving the cat a sparkling, silver-halo appearance.' },
    { question: 'Why is Nala so talkative?', answer: 'Maine Coons are known for their sweet trills and chirrups. Nala is particularly outgoing and loves to hold "conversations" with her humans.' },
    { question: 'Is Nala good with other pets?', answer: 'She gets along well with friendly cats but prefers a home without dogs.' },
    { question: 'Is Nala microchipped?', answer: 'Yes, she is spayed, microchipped, and fully vaccinated with a written health guarantee.' },
    { question: 'What is Nala\'s adoption fee?', answer: 'Nala\'s adoption fee is $100, covering her complete veterinary preparation.' },
  ],
};
