import { useEffect, useRef } from 'react';

export default function SignaturePad({ onChange }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const hasSignature = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.strokeStyle = '#183c35';
    context.lineWidth = 2.2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    const clear = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      hasSignature.current = false;
      onChange('');
    };
    window.clearSignature = clear;
    return () => { delete window.clearSignature; };
  }, [onChange]);

  function point(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (canvasRef.current.width / rect.width), y: (event.clientY - rect.top) * (canvasRef.current.height / rect.height) };
  }

  function start(event) {
    event.preventDefault();
    const canvas = canvasRef.current;
    canvas.setPointerCapture(event.pointerId);
    const context = canvas.getContext('2d');
    const position = point(event);
    context.beginPath(); context.moveTo(position.x, position.y);
    drawing.current = true;
  }

  function move(event) {
    if (!drawing.current) return;
    const context = canvasRef.current.getContext('2d');
    const position = point(event);
    context.lineTo(position.x, position.y); context.stroke();
    hasSignature.current = true;
    onChange(canvasRef.current.toDataURL('image/png'));
  }

  function stop() { drawing.current = false; }

  return <canvas ref={canvasRef} className="signature-canvas" width="680" height="132" onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} aria-label="Draw signature"/>;
}