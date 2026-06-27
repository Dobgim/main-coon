import type { HelpWay } from '@/types';
import { site } from './site';

export const helpWays: HelpWay[] = [
  {
    id: 'donate',
    icon: '💚',
    title: 'Donate Money',
    description:
      'Every pound helps fund vet care, food, and safe shelter for Maine Coons in our care.',
    ctaLabel: 'Donate Now',
    to: '/donate',
  },
  {
    id: 'volunteer',
    icon: '🤝',
    title: 'Volunteer',
    description:
      'Help with transport, home checks, grooming days, events and admin. Every hour matters.',
    ctaLabel: 'Join Us',
    to: '/contact',
  },
  {
    id: 'foster',
    icon: '🏠',
    title: 'Foster a Cat',
    description:
      'Open your home temporarily and give a rescued cat the time and care they need to thrive.',
    ctaLabel: 'Become a Foster',
    to: '/contact',
  },
  {
    id: 'wishlist',
    icon: '🛒',
    title: 'Amazon Wishlist',
    description:
      'Send food, litter, beds and toys straight to our door through our online wishlist.',
    ctaLabel: 'Shop Wishlist',
    to: site.donation.amazonWishlist,
    external: true,
  },
  {
    id: 'fundraise',
    icon: '🎉',
    title: 'Fundraise',
    description:
      'Run a bake sale, sponsored walk or birthday fundraiser to support our rescue work.',
    ctaLabel: 'Start Fundraising',
    to: '/contact',
  },
  {
    id: 'spread',
    icon: '📢',
    title: 'Spread the Word',
    description:
      'Follow and share our cats on social media — a single share can find a cat their home.',
    ctaLabel: 'Follow Us',
    to: '/contact',
  },
];
