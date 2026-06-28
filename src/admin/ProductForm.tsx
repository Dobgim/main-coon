import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  createCat,
  updateCat,
  fetchCatByRowId,
  uploadCatImage,
  slugify,
  type CatInput,
} from '@/lib/db';
import type { AgeGroup, CatGender, CatStatus } from '@/types';
import { ArrowRightIcon } from '@/components/Icons';

const empty: CatInput = {
  slug: '',
  name: '',
  ageLabel: '',
  ageGroup: 'Young',
  gender: 'Male',
  color: '',
  location: '',
  region: '',
  status: 'Available',
  neutered: true,
  vaccinated: true,
  vetChecked: true,
  microchipped: true,
  goodWithChildren: true,
  goodWithCats: true,
  goodWithDogs: false,
  indoorOnly: false,
  adoptionFee: 0,
  reservePrice: 0,
  breedingPrice: 0,
  warrantyPrice: 0,
  coordinatorName: '',
  coordinatorEmail: '',
  coordinatorPhone: '',
  personality: [],
  shortDescription: '',
  story: '',
  images: [],
  published: true,
};

const ageGroups: AgeGroup[] = ['Kitten', 'Young', 'Adult', 'Senior'];
const genders: CatGender[] = ['Male', 'Female'];
const statuses: CatStatus[] = ['Available', 'Pending', 'Adopted'];

const boolFields: Array<[keyof CatInput, string]> = [
  ['neutered', 'Neutered'],
  ['vaccinated', 'Vaccinated'],
  ['vetChecked', 'Vet-checked'],
  ['microchipped', 'Microchipped'],
  ['goodWithChildren', 'Good with children'],
  ['goodWithCats', 'Good with cats'],
  ['goodWithDogs', 'Good with dogs'],
  ['indoorOnly', 'Indoor only'],
];

export default function ProductForm() {
  const { rowId } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(rowId);

  const [form, setForm] = useState<CatInput>(empty);
  const [personalityText, setPersonalityText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!rowId) return;
    fetchCatByRowId(rowId)
      .then((cat) => {
        if (!cat) {
          setError('Cat not found.');
          return;
        }
        setForm({
          slug: cat.id,
          name: cat.name,
          ageLabel: cat.ageLabel,
          ageGroup: cat.ageGroup,
          gender: cat.gender,
          color: cat.color,
          location: cat.location,
          region: cat.region,
          status: cat.status,
          neutered: cat.neutered,
          vaccinated: cat.vaccinated,
          vetChecked: cat.vetChecked,
          microchipped: cat.microchipped,
          goodWithChildren: cat.goodWithChildren,
          goodWithCats: cat.goodWithCats,
          goodWithDogs: cat.goodWithDogs,
          indoorOnly: cat.indoorOnly,
          adoptionFee: cat.adoptionFee,
          reservePrice: cat.reservePrice ?? 0,
          breedingPrice: cat.breedingPrice ?? 0,
          warrantyPrice: cat.warrantyPrice ?? 0,
          coordinatorName: cat.coordinator.name,
          coordinatorEmail: cat.coordinator.email,
          coordinatorPhone: cat.coordinator.phone,
          personality: cat.personality,
          shortDescription: cat.shortDescription,
          story: cat.story,
          images: cat.images,
          published: cat.published,
        });
        setPersonalityText(cat.personality.join(', '));
        setSlugTouched(true);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load.'))
      .finally(() => setLoading(false));
  }, [rowId]);

  const set = <K extends keyof CatInput>(key: K, value: CatInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onName = (value: string) => {
    setForm((f) => ({ ...f, name: value, slug: slugTouched ? f.slug : slugify(value) }));
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
  };

  const removeExisting = (url: string) =>
    setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) {
      setError('Please enter a name.');
      return;
    }
    if (form.images.length === 0 && files.length === 0) {
      setError('Please add at least one photo.');
      return;
    }
    setSaving(true);
    try {
      const slug = (form.slug || slugify(form.name)).trim();
      const uploaded: string[] = [];
      for (const file of files) {
        uploaded.push(await uploadCatImage(file, slug));
      }
      const payload: CatInput = {
        ...form,
        slug,
        personality: personalityText.split(',').map((s) => s.trim()).filter(Boolean),
        images: [...form.images, ...uploaded],
      };
      if (rowId) await updateCat(rowId, payload);
      else await createCat(payload);
      navigate('/admin/products');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="h-64 animate-pulse rounded-2xl bg-sand/50" />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/admin/products" className="text-sm font-semibold text-forest-600 hover:underline">
        ← Back to cats
      </Link>
      <h1 className="mt-2 text-3xl font-extrabold text-forest-800">
        {editing ? `Edit ${form.name || 'cat'}` : 'Add a new cat'}
      </h1>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        {/* Basics */}
        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-extrabold text-forest-800">Basics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" required>
              <input className="input" value={form.name} onChange={(e) => onName(e.target.value)} />
            </Field>
            <Field label="Age label" hint="e.g. 2 years old">
              <input className="input" value={form.ageLabel} onChange={(e) => set('ageLabel', e.target.value)} />
            </Field>
            <Field label="Age group">
              <select className="input" value={form.ageGroup} onChange={(e) => set('ageGroup', e.target.value as AgeGroup)}>
                {ageGroups.map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Gender">
              <select className="input" value={form.gender} onChange={(e) => set('gender', e.target.value as CatGender)}>
                {genders.map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Color / coat" hint="e.g. Brown classic tabby">
              <input className="input" value={form.color} onChange={(e) => set('color', e.target.value)} />
            </Field>
            <Field label="Status">
              <select className="input" value={form.status} onChange={(e) => set('status', e.target.value as CatStatus)}>
                {statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Personality traits" hint="Comma separated, e.g. Affectionate, Playful">
            <input className="input" value={personalityText} onChange={(e) => setPersonalityText(e.target.value)} />
          </Field>
          <label className="flex items-center gap-3 text-sm font-semibold text-forest-800">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set('published', e.target.checked)}
              className="h-5 w-5 rounded border-sand text-forest focus:ring-forest"
            />
            Published (visible on the live site)
          </label>
        </section>

        {/* Pricing & purchase options */}
        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-extrabold text-forest-800">Pricing &amp; purchase options</h2>
          <p className="text-sm text-muted">
            These are the prices buyers see on this kitten&apos;s page. Leave an add-on at 0 to use
            the default shown.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Kitten price — Full Payment ($)" required>
              <input
                type="number"
                min={0}
                className="input"
                value={form.adoptionFee}
                onChange={(e) => set('adoptionFee', Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="Reservation deposit ($)" hint="default $200">
              <input
                type="number"
                min={0}
                className="input"
                value={form.reservePrice}
                onChange={(e) => set('reservePrice', Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="Add breeding rights — price ($)" hint="default = price + $500">
              <input
                type="number"
                min={0}
                className="input"
                value={form.breedingPrice}
                onChange={(e) => set('breedingPrice', Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="Extend health warranty — price ($)" hint="default = price + $500">
              <input
                type="number"
                min={0}
                className="input"
                value={form.warrantyPrice}
                onChange={(e) => set('warrantyPrice', Number(e.target.value) || 0)}
              />
            </Field>
          </div>
        </section>

        {/* Photos */}
        <section className="card space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-forest-800">Photo gallery</h2>
            <span className="text-sm text-muted">
              {form.images.length + files.length} photo{form.images.length + files.length === 1 ? '' : 's'}
            </span>
          </div>
          {(form.images.length > 0 || files.length > 0) && (
            <div className="flex flex-wrap gap-3">
              {form.images.map((url, i) => (
                <div key={url} className="relative">
                  <img src={url} alt="" className="h-24 w-24 rounded-xl object-cover" />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 rounded bg-forest px-1.5 py-0.5 text-[10px] font-bold text-white">
                      Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeExisting(url)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
                    aria-label="Remove photo"
                  >
                    ×
                  </button>
                </div>
              ))}
              {files.map((file, i) => (
                <div key={`${file.name}-${i}`} className="relative">
                  <img src={URL.createObjectURL(file)} alt="" className="h-24 w-24 rounded-xl object-cover ring-2 ring-forest" />
                  {form.images.length === 0 && i === 0 && (
                    <span className="absolute bottom-1 left-1 rounded bg-forest px-1.5 py-0.5 text-[10px] font-bold text-white">
                      Main
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
                    aria-label="Remove photo"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-sand bg-cream/40 px-6 py-8 text-center transition hover:border-forest/40">
            <span className="text-sm font-semibold text-forest-800">Click to upload photos</span>
            <span className="text-xs text-muted">
              Select several at once, or click again to add more. The first photo is the main image. JPG or PNG.
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = ''; // allow re-selecting / adding more
              }}
            />
          </label>
        </section>

        {/* Descriptions */}
        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-extrabold text-forest-800">Description</h2>
          <Field label="Short description" hint="Shown on cards">
            <textarea
              rows={2}
              className="input"
              value={form.shortDescription}
              onChange={(e) => set('shortDescription', e.target.value)}
            />
          </Field>
          <Field label="Full story">
            <textarea
              rows={5}
              className="input"
              value={form.story}
              onChange={(e) => set('story', e.target.value)}
            />
          </Field>
        </section>

        {/* Health & compatibility */}
        <section className="card space-y-4 p-6">
          <h2 className="text-lg font-extrabold text-forest-800">Health &amp; compatibility</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {boolFields.map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-ink/85">
                <input
                  type="checkbox"
                  checked={form[key] as boolean}
                  onChange={(e) => set(key, e.target.checked as never)}
                  className="h-5 w-5 rounded border-sand text-forest focus:ring-forest"
                />
                {label}
              </label>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-70">
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Publish cat'}
            {!saving && <ArrowRightIcon className="h-5 w-5" />}
          </button>
          <Link to="/admin/products" className="btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">
        {label} {required && <span className="text-ember">*</span>}
        {hint && <span className="ml-1 font-normal text-muted">— {hint}</span>}
      </span>
      {children}
    </label>
  );
}
