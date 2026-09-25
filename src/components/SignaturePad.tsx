import { useEffect, useRef, useState } from 'react';

/**
 * Canvas signature capture for the reservation contract.
 *
 * Buyers can draw with a finger or mouse, or type their name if drawing is
 * awkward. The result is handed back as a PNG data URL so the contract can
 * render the actual mark rather than merely asserting that one was given.
 */
export interface SignatureResult {
  /** PNG data URL of the signature. */
  dataUrl: string;
  /** How the buyer produced it — recorded on the contract for provenance. */
  method: 'drawn' | 'typed';
  /** ISO timestamp of the moment they signed. */
  signedAt: string;
}

interface SignaturePadProps {
  /** Pre-fills the typed option and labels the signature line. */
  name: string;
  onSign: (result: SignatureResult) => void;
}

const CANVAS_W = 600;
const CANVAS_H = 200;
const SCRIPT_FACE = 'Georgia, "Times New Roman", serif';

export default function SignaturePad({ name, onSign }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasInk = useRef(false);

  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [typed, setTyped] = useState(name);
  const [agreed, setAgreed] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState('');

  // Prepare the drawing surface whenever the canvas is (re)mounted. The backing
  // store is larger than the CSS box so the captured mark stays sharp in print.
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1b2f4b';
  }, [mode]);

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_H,
    };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    canvasRef.current?.setPointerCapture(e.pointerId);
    drawing.current = true;
    const { x, y } = pointFromEvent(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = pointFromEvent(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasInk.current) {
      hasInk.current = true;
      setEmpty(false);
      setError('');
    }
  };

  const end = () => {
    drawing.current = false;
  };

  const clear = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    hasInk.current = false;
    setEmpty(true);
  };

  /** Render the typed name in a script face onto an offscreen canvas. */
  const renderTyped = (): string => {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#1b2f4b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 64px ${SCRIPT_FACE}`;
    ctx.fillText(typed.trim(), CANVAS_W / 2, CANVAS_H / 2, CANVAS_W - 40);
    return canvas.toDataURL('image/png');
  };

  const submit = () => {
    if (!agreed) {
      setError('Please confirm you agree to the terms above.');
      return;
    }
    if (mode === 'draw') {
      if (empty) {
        setError('Please draw your signature in the box.');
        return;
      }
      onSign({
        dataUrl: canvasRef.current!.toDataURL('image/png'),
        method: 'drawn',
        signedAt: new Date().toISOString(),
      });
      return;
    }
    if (!typed.trim()) {
      setError('Please type your full name.');
      return;
    }
    onSign({ dataUrl: renderTyped(), method: 'typed', signedAt: new Date().toISOString() });
  };

  return (
    <div className="rounded-2xl border-2 border-forest-200 bg-white p-5 print:hidden">
      <h4 className="text-sm font-extrabold uppercase tracking-wider text-forest-800">
        Sign this agreement
      </h4>
      <p className="mt-1 text-xs text-muted">
        Draw your signature below, or switch to typing it. It is added to the contract straight
        away so you can print or save a signed copy.
      </p>

      <div className="mt-4 inline-flex rounded-full bg-sand/50 p-1">
        {(['draw', 'type'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError('');
            }}
            className={[
              'rounded-full px-4 py-1.5 text-xs font-bold transition',
              mode === m ? 'bg-forest-800 text-white shadow-sm' : 'text-forest-700',
            ].join(' ')}
          >
            {m === 'draw' ? 'Draw it' : 'Type it'}
          </button>
        ))}
      </div>

      {mode === 'draw' ? (
        <div className="mt-3">
          <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-forest-200 bg-[#fdfcf8]">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              onPointerDown={start}
              onPointerMove={move}
              onPointerUp={end}
              onPointerLeave={end}
              onPointerCancel={end}
              className="block h-[160px] w-full cursor-crosshair touch-none"
            />
            {empty && (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted">
                Sign here with your finger or mouse
              </span>
            )}
            <div className="pointer-events-none absolute inset-x-8 bottom-9 border-b border-forest-300/70" />
          </div>
          <button
            type="button"
            onClick={clear}
            className="mt-2 text-xs font-semibold text-ember hover:underline"
          >
            Clear signature
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <input
            value={typed}
            onChange={(e) => {
              setTyped(e.target.value);
              setError('');
            }}
            placeholder="Type your full legal name"
            className="input"
            autoComplete="name"
          />
          <div className="mt-3 flex h-[110px] items-center justify-center rounded-xl border-2 border-dashed border-forest-200 bg-[#fdfcf8]">
            <span
              className="px-4 text-center text-3xl italic text-[#1b2f4b]"
              style={{ fontFamily: SCRIPT_FACE }}
            >
              {typed.trim() || 'Your name'}
            </span>
          </div>
        </div>
      )}

      <label className="mt-4 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            setError('');
          }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#2f5d3f]"
        />
        <span className="text-xs leading-relaxed text-ink/80">
          I have read and agree to the reservation terms, health guarantee and welfare commitments
          set out in this agreement, and I intend this to be my electronic signature.
        </span>
      </label>

      {error && <p className="mt-2 text-sm font-semibold text-ember">{error}</p>}

      <button
        type="button"
        onClick={submit}
        className="btn-accent mt-4 w-full justify-center text-sm font-bold sm:w-auto"
      >
        Sign &amp; accept agreement
      </button>
    </div>
  );
}
