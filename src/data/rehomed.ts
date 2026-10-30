import type { RehomedStory } from '@/types';

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Placeholder success stories — replace with the rescue's real rehoming stories. */
export const rehomedStories: RehomedStory[] = [
  {
    id: 'oscar-2024',
    catName: 'Oscar',
    title: 'From timid kitten to confident king in Evansville',
    year: 2024,
    adopter: 'Sarah & James',
    location: 'Evansville, IN (Eastland)',
    rating: 5,
    quote:
      'We visited the cattery on Grand Ave and fell in love with Oscar immediately. He settled in within days and now rules our home with the gentlest paw. The health records and transition guidance were second to none.',
    beforeImage: img('1592194996308-7b43878e84a6'),
    afterImage: img('1514888286974-6c03e2ca1dba'),
  },
  {
    id: 'bella-2023',
    catName: 'Bella',
    title: 'A senior girl finds her sofa in Newburgh',
    year: 2023,
    adopter: 'The Miller family',
    location: 'Newburgh, IN',
    rating: 5,
    quote:
      'We welcomed Bella into our Newburgh home at nine years old. She has brought so much calm, warmth and companionship to our family. Adopting a retired Maine Coon was the best decision we ever made.',
    beforeImage: img('1596854407944-bf87f6fdd49e'),
    afterImage: img('1573865526739-10659fec78a5'),
  },
  {
    id: 'teddy-2024',
    catName: 'Teddy',
    title: 'Best friends from day one in Henderson',
    year: 2024,
    adopter: 'Hannah K.',
    location: 'Henderson, KY',
    rating: 5,
    quote:
      'Living just across the river in Henderson, pickup at the Evansville cattery was effortless. Teddy bonded with our family dog immediately. The matching advice and DNA health tests gave us complete confidence.',
    beforeImage: img('1606214174585-fe31582dc6ee'),
    afterImage: img('1543852786-1cf6624b9987'),
  },
  {
    id: 'misty-2022',
    catName: 'Misty',
    title: 'Patience pays off in Owensboro',
    year: 2022,
    adopter: 'David & Lin',
    location: 'Owensboro, KY',
    rating: 5,
    quote:
      'The cattery courier brought Misty straight to our doorstep in Owensboro. She was calm, healthy, and beautifully litter-trained. A year on she sleeps on our bed every night. Truly an exceptional gentle giant.',
    beforeImage: img('1518791841217-8f162f1e1131'),
    afterImage: img('1561948955-570b270e7c36'),
  },
  {
    id: 'leo-2023',
    catName: 'Leo',
    title: 'A gentle giant for the kids in Jasper',
    year: 2023,
    adopter: 'The Schmidt family',
    location: 'Jasper, IN',
    rating: 5,
    quote:
      'Leo is endlessly patient with our two children and follows them around like a dog. We drove down to Evansville for pickup and were so impressed by how clean and well-socialized all the kittens were.',
    beforeImage: img('1574158622682-e40e69881006'),
    afterImage: img('1495360010541-f48722b34f7d'),
  },
  {
    id: 'cleo-2024',
    catName: 'Cleo',
    title: 'From shy princess to living room queen',
    year: 2024,
    adopter: 'Megan R.',
    location: 'Evansville, IN (Downtown)',
    rating: 5,
    quote:
      'Cleo was quiet at first, but with the cattery team\'s advice she settled right in. Now she greets every guest at the front door. We love supporting a high-integrity breeder right here in Evansville!',
    beforeImage: img('1533738363-b7f9aef128ce'),
    afterImage: img('1592194996308-7b43878e84a6'),
  },
];
