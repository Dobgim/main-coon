# Managing Cats

All adoptable cats live in [`src/data/cats.ts`](./src/data/cats.ts) as a typed array.
The list pages, filters, pagination, detail page and home "featured" section all read
from this one file — add a cat here and it appears everywhere automatically.

## Add a new cat

1. Open `src/data/cats.ts`.
2. Copy an existing entry and edit the fields. The shape is enforced by the `Cat`
   type in `src/types/index.ts`:

```ts
{
  id: 'smokey',                       // unique, URL-safe — becomes /cats/smokey
  name: 'Smokey',
  ageLabel: '3 years old',            // free text shown on cards
  ageGroup: 'Adult',                  // 'Kitten' | 'Young' | 'Adult' | 'Senior' (used by the age filter)
  gender: 'Male',                     // 'Male' | 'Female'
  color: 'Blue smoke',
  location: 'Denver, Colorado',       // shown on the card
  region: 'Colorado',                 // used by the location filter (keep consistent!)
  status: 'Available',                // 'Available' | 'Pending' | 'Adopted'
  neutered: true,
  vaccinated: true,
  vetChecked: true,
  microchipped: true,
  goodWithChildren: true,
  goodWithCats: true,
  goodWithDogs: false,
  indoorOnly: false,
  adoptionFee: 95,
  coordinator: { name: 'Jacky Holmes', email: '…', phone: '…' },
  personality: ['Calm', 'Affectionate'],
  shortDescription: 'One line shown on the cat card.',
  story: 'A longer paragraph shown on the cat detail page.',
  images: ['/images/smokey-1.jpg', '/images/smokey-2.jpg'], // first image is the cover
}
```

3. Save. The new cat appears on `/cats`, in the filters, and at `/cats/smokey`.

## Photos

- Put image files in `public/images/` and reference them as `/images/filename.jpg`.
- The **first** item in `images` is used as the card/cover photo.
- Add 2–4 images per cat to populate the detail-page gallery.
- Optimise images (WebP, ~200KB) for fast loading.

## Filters & regions

- The **Location** filter is built automatically from the distinct `region` values
  (`regions` is derived at the bottom of `cats.ts`). Keep region spelling consistent
  (e.g. always `"Colorado"`) so cats group correctly.
- The **Age** filter uses `ageGroup`, not `ageLabel`.

## Mark a cat as adopted

Set `status: 'Adopted'`. The card shows an "Adopted" badge, the Adopt button is
disabled, and the cat is excluded from the home page's featured list. Filter by
status `Adopted` to show success stories.

## Moving to a real backend

When you outgrow a static file, replace the `cats` array with a fetch from your API or
CMS (e.g. Sanity, Contentful, Airtable, or a small Express/Supabase backend). Keep the
same `Cat` shape and the rest of the UI keeps working — ideally load it via React Query
or a `useEffect` in `Cats.tsx`/`CatDetail.tsx`.
