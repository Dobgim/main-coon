export type CatStatus = 'Available' | 'Pending' | 'Adopted';
export type CatGender = 'Male' | 'Female';
export type AgeGroup = 'Kitten' | 'Young' | 'Adult' | 'Senior';

export interface Cat {
  id: string;
  name: string;
  ageLabel: string; // human readable e.g. "2 years old"
  ageGroup: AgeGroup;
  gender: CatGender;
  color: string;
  location: string;
  region: string;
  status: CatStatus;
  neutered: boolean;
  vaccinated: boolean;
  vetChecked: boolean;
  microchipped: boolean;
  goodWithChildren: boolean;
  goodWithCats: boolean;
  goodWithDogs: boolean;
  indoorOnly: boolean;
  adoptionFee: number; // kitten price (Full Payment)
  reservePrice?: number; // reservation deposit (0 = use default)
  breedingPrice?: number; // price with breeding rights (0 = use default)
  warrantyPrice?: number; // price with extended warranty (0 = use default)
  coordinator: { name: string; email: string; phone: string };
  personality: string[];
  shortDescription: string;
  story: string;
  images: string[];
}

export interface RehomedStory {
  id: string;
  catName: string;
  title: string;
  year: number;
  adopter: string;
  location: string;
  rating: number; // 1-5
  quote: string;
  beforeImage: string;
  afterImage: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface HelpWay {
  id: string;
  icon: 'heart' | 'handshake' | 'home' | 'shopping-bag' | 'sparkles' | 'megaphone';
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
  external?: boolean;
}
