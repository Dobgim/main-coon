import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[64vh] flex-col items-center justify-center gap-5 text-center">
      <span className="text-7xl">🐾</span>
      <h1 className="text-5xl font-extrabold text-forest-800">404</h1>
      <p className="max-w-md text-lg text-muted">
        This page seems to have wandered off — much like a curious Maine Coon. Let&apos;s get you
        back on track.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
        <Link to="/cats" className="btn-ghost">
          See cats for adoption
        </Link>
      </div>
    </div>
  );
}
