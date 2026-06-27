import type { RehomedStory } from '@/types';

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Placeholder success stories — replace with the rescue's real rehoming stories. */
export const rehomedStories: RehomedStory[] = [
  {
    id: 'oscar-2024',
    catName: 'Oscar',
    title: 'From timid stray to confident king',
    year: 2024,
    adopter: 'Sarah & James',
    location: 'New York, NY',
    rating: 5,
    quote:
      'Oscar settled in within days and now rules the house with the gentlest paw. We cannot imagine life without him — thank you for trusting us with him.',
    beforeImage: img('1592194996308-7b43878e84a6'),
    afterImage: img('1514888286974-6c03e2ca1dba'),
  },
  {
    id: 'bella-2023',
    catName: 'Bella',
    title: 'A senior girl finds her sofa',
    year: 2023,
    adopter: 'The Patel family',
    location: 'Austin, TX',
    rating: 5,
    quote:
      'We adopted Bella at nine years old and she has brought so much calm and joy to our home. Adopting a senior was the best decision we ever made.',
    beforeImage: img('1596854407944-bf87f6fdd49e'),
    afterImage: img('1573865526739-10659fec78a5'),
  },
  {
    id: 'teddy-2024',
    catName: 'Teddy',
    title: 'Best friends from day one',
    year: 2024,
    adopter: 'Hannah',
    location: 'Seattle, WA',
    rating: 5,
    quote:
      'Teddy and my older cat became inseparable almost immediately. The matching advice from the team was spot on. He is the most affectionate boy.',
    beforeImage: img('1606214174585-fe31582dc6ee'),
    afterImage: img('1543852786-1cf6624b9987'),
  },
  {
    id: 'misty-2022',
    catName: 'Misty',
    title: 'Patience pays off',
    year: 2022,
    adopter: 'David & Lin',
    location: 'Denver, CO',
    rating: 5,
    quote:
      'Misty needed time to trust us, and the foster team prepared us perfectly. A year on she sleeps on our bed every night. Truly a transformation.',
    beforeImage: img('1518791841217-8f162f1e1131'),
    afterImage: img('1561948955-570b270e7c36'),
  },
  {
    id: 'leo-2023',
    catName: 'Leo',
    title: 'A gentle giant for the kids',
    year: 2023,
    adopter: 'The Okoro family',
    location: 'Boston, MA',
    rating: 5,
    quote:
      'Leo is endlessly patient with our two children and follows them around like a dog. He is the heart of our family now.',
    beforeImage: img('1574158622682-e40e69881006'),
    afterImage: img('1495360010541-f48722b34f7d'),
  },
  {
    id: 'cleo-2024',
    catName: 'Cleo',
    title: 'From shelter to spotlight',
    year: 2024,
    adopter: 'Megan',
    location: 'Portland, OR',
    rating: 5,
    quote:
      'Cleo was overlooked for months because she was shy. Now she greets every guest and naps in the sunniest spot in the house. So grateful.',
    beforeImage: img('1533738363-b7f9aef128ce'),
    afterImage: img('1592194996308-7b43878e84a6'),
  },
];
