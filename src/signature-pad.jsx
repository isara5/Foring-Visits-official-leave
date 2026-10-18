import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function SignaturePad({ onChange, onSave, initialSignature, language = 'en' }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(Boolean(initialSignature));

  const notify = (url) => {
    if (onChange) onChange(url);
    if (onSave) onSave(url);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.strokeStyle = '#0f172a';
    context.lineWidth = 2.2;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    if (initialSignature && typeof initialSignature === 'string' && initialSignature.startsWith('data:image')) {
      const img = new Image();
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
        setHasDrawn(true);
      };
      img.src = initialSignature;
    }
    const clear = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
      notify('');
    };
    window.clearSignature = clear;
    return () => { delete window.clearSignature; };
  }, [initialSignature]);

  function point(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (canvasRef.current.width / rect.width),
      y: (event.clientY - rect.top) * (canvasRef.current.height / rect.height)
    };
  }

  function start(event) {
    event.preventDefault();
    const canvas = canvasRef.current;
    canvas.setPointerCapture(event.pointerId);
    const context = canvas.getContext('2d');
    const position = point(event);
    context.beginPath();
    context.moveTo(position.x, position.y);
    drawing.current = true;
  }

  function move(event) {
    if (!drawing.current) return;
    const context = canvasRef.current.getContext('2d');
    const position = point(event);
    context.lineTo(position.x, position.y);
    context.stroke();
    setHasDrawn(true);
    notify(canvasRef.current.toDataURL('image/png'));
  }

  function stop() {
    drawing.current = false;
  }

  function handleClear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    notify('');
  }

  return (
    <div className="sig-pad-wrapper" style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        className="signature-canvas"
        width="680"
        height="132"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={stop}
        onPointerCancel={stop}
        aria-label="Draw signature"
        style={{
          width: '100%',
          height: '110px',
          background: '#fff',
          border: '1.5px dashed #94a3b8',
          borderRadius: '6px',
          touchAction: 'none',
          display: 'block',
          cursor: 'crosshair'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
        <span style={{ fontSize: '10px', color: '#64748b' }}>
          ✍️ {language === 'si' ? 'මවුසය හෝ ස්පර්ශය මඟින් මෙහි අත්සන් කරන්න' : 'Draw your signature using mouse or touch screen'}
        </span>
        {hasDrawn && (
          <button
            type="button"
            onClick={handleClear}
            className="secondary-button"
            style={{ fontSize: '10.5px', height: '24px', padding: '0 8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <RotateCcw size={12} />
            <span>{language === 'si' ? 'අත්සන මකන්න' : 'Clear Signature'}</span>
          </button>
        )}
      </div>
    </div>
  );
}