import type { ReactNode } from 'react';

interface Props {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}

/** Label + control + inline error wrapper shared by all forms. */
export default function FormField({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
  className,
}: Props) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label">
        {label}
        {required && <span className="text-ember"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && (
        <p className="mt-1 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
