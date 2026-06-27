import type { TeamMember } from '@/types';

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Placeholder volunteer profiles — replace with real team members and photos. */
export const team: TeamMember[] = [
  {
    name: 'Jacky Holmes',
    role: 'Rehoming Coordinator',
    bio: 'Jacky matches every cat with the right family and oversees home visits across Yorkshire.',
    image: img('1494790108377-be9c29b29330'),
  },
  {
    name: 'Sarah Doyle',
    role: 'Vet Liaison & Foster Lead',
    bio: 'A former veterinary nurse, Sarah coordinates medical care and our network of foster homes.',
    image: img('1438761681033-6461ffad8d80'),
  },
  {
    name: 'Marek Nowak',
    role: 'Northern Region Coordinator',
    bio: 'Marek runs collections, transport and assessments for cats across the North of England.',
    image: img('1500648767791-00dcc994a43e'),
  },
  {
    name: 'Priya Sharma',
    role: 'Fundraising & Community',
    bio: 'Priya organises our fundraising events and keeps our wonderful supporters connected.',
    image: img('1573497019940-1c28c88b4f3e'),
  },
];
