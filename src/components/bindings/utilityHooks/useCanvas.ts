import { useEffect, useRef } from 'react';

function useCanvas<store>(
  draw: (params: {
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    store: store;
  }) => void,
  initialStore: store,
  init?: (params: {
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    store: store;
  }) => void,
  shouldDraw = true
): React.Ref<HTMLCanvasElement> {
  const canvas = useRef<HTMLCanvasElement>(null);
  const store = useRef<store>(initialStore);
  const request = useRef<number>(0);
  useEffect(() => {
    if (canvas.current) {
      const context = canvas.current.getContext('2d');
      canvas.current.width = canvas.current.clientWidth;
      canvas.current.height = canvas.current.clientHeight;
      const width = canvas.current.clientWidth;
      const height = canvas.current.clientHeight;
      if (context) {
        if (init)
          init({
            width,
            height,
            context,
            store: store.current
          });
        const update = () => {
          if (shouldDraw) request.current = requestAnimationFrame(update);
          draw({
            width,
            height,
            context,
            store: store.current
          });
        };
        requestAnimationFrame(update);
      }
    }
    return () => cancelAnimationFrame(request.current);
  }, [draw, init, shouldDraw]);
  return canvas;
}

export default useCanvas;
