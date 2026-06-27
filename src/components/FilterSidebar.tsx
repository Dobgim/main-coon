import { useState } from 'react';
import type { AgeGroup, CatGender } from '@/types';

export interface CatFilters {
  age: AgeGroup | 'all';
  gender: CatGender | 'all';
  region: string;
  status: 'all' | 'Available' | 'Pending' | 'Adopted';
}

export const defaultFilters: CatFilters = {
  age: 'all',
  gender: 'all',
  region: 'all',
  status: 'all',
};

interface Props {
  regions: string[];
  onApply: (filters: CatFilters) => void;
  resultCount: number;
}

const ageGroups: AgeGroup[] = ['Kitten', 'Young', 'Adult', 'Senior'];

/** Filter controls. Sticky sidebar on desktop, collapsible panel on mobile. */
export default function FilterSidebar({ regions, onApply, resultCount }: Props) {
  const [draft, setDraft] = useState<CatFilters>(defaultFilters);
  const [open, setOpen] = useState(false);

  const set = <K extends keyof CatFilters>(key: K, value: CatFilters[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const apply = () => {
    onApply(draft);
    setOpen(false);
  };

  const reset = () => {
    setDraft(defaultFilters);
    onApply(defaultFilters);
  };

  return (
    <div className="lg:sticky lg:top-24">
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-ghost mb-4 w-full justify-between lg:hidden"
        aria-expanded={open}
      >
        <span>Filters</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      <div className={`${open ? 'block' : 'hidden'} card p-6 lg:block`}>
        <h2 className="text-lg font-extrabold text-forest-800">Filter cats</h2>
        <p className="mt-1 text-sm text-muted">{resultCount} cats match your search</p>

        <div className="mt-5 space-y-5">
          <div>
            <label className="label" htmlFor="f-age">
              Age
            </label>
            <select
              id="f-age"
              className="input"
              value={draft.age}
              onChange={(e) => set('age', e.target.value as CatFilters['age'])}
            >
              <option value="all">Any age</option>
              {ageGroups.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="f-gender">
              Gender
            </label>
            <select
              id="f-gender"
              className="input"
              value={draft.gender}
              onChange={(e) => set('gender', e.target.value as CatFilters['gender'])}
            >
              <option value="all">Any gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="f-region">
              Location
            </label>
            <select
              id="f-region"
              className="input"
              value={draft.region}
              onChange={(e) => set('region', e.target.value)}
            >
              <option value="all">Anywhere in the US</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="f-status">
              Status
            </label>
            <select
              id="f-status"
              className="input"
              value={draft.status}
              onChange={(e) => set('status', e.target.value as CatFilters['status'])}
            >
              <option value="all">All statuses</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Adopted">Adopted</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button type="button" onClick={apply} className="btn-primary w-full">
              Apply Filters
            </button>
            <button type="button" onClick={reset} className="btn-ghost w-full">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
