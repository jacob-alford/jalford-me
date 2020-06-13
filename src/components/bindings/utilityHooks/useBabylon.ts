import { useRef, useState, useEffect } from 'react';
import { Engine, Scene, EngineOptions, SceneOptions } from '@babylonjs/core';

export interface DataStore {
  [key: string]: any;
}

export interface BabylonOptions extends EngineOptions {
  antialias?: boolean;
  adaptToDeviceRatio?: boolean;
}

type RenderFunction<T = DataStore> = (
  scene: Scene,
  store: T,
  canvas: HTMLCanvasElement
) => void;
export type InitFunction<T> = RenderFunction<T>;
export type DrawFunction<T> = RenderFunction<T>;
export type CleanupFunction<T> = RenderFunction<T>;

export interface BabylonComponentProps<StoreType = DataStore> {
  init: InitFunction<StoreType>;
  draw: DrawFunction<StoreType>;
  cleanup: CleanupFunction<StoreType>;
  initialStore: StoreType;
  options: BabylonOptions;
  sceneOptions: SceneOptions;
}

const defaultInitialStore = {};
const defaultOptions = {} as { antialias: undefined; adaptToDeviceRatio: undefined };

function useBabylon<StoreType = DataStore>(
  init: InitFunction<StoreType>,
  draw?: DrawFunction<StoreType>,
  cleanup?: CleanupFunction<StoreType>,
  initialStore: StoreType = defaultInitialStore as StoreType,
  options: BabylonOptions = defaultOptions,
  sceneOptions?: SceneOptions
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const store = useRef<StoreType>(initialStore);
  const { antialias, adaptToDeviceRatio } = options;
  const [initialized, setInitialized] = useState(false);
  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    const resize = () => {
      if (scene) scene.getEngine().resize();
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [scene]);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    const currentStore = store.current;
    if (!currentCanvas) return;
    if (!initialized) {
      setInitialized(true);
      const engine = new Engine(currentCanvas, antialias, options, adaptToDeviceRatio);
      const scene = new Scene(engine, sceneOptions);
      setScene(scene);
      if (scene.isReady()) init(scene, currentStore, currentCanvas);
      else
        scene.onReadyObservable.addOnce(scene =>
          init(scene, currentStore, currentCanvas)
        );
      engine.runRenderLoop(() => {
        draw && draw(scene, currentStore, currentCanvas);
        scene.render();
      });
    }
    return () => {
      if (scene !== null) {
        cleanup && cleanup(scene, currentStore, currentCanvas);
        scene.dispose();
      }
    };
  }, [
    initialized,
    antialias,
    options,
    adaptToDeviceRatio,
    sceneOptions,
    init,
    draw,
    scene,
    cleanup
  ]);

  return canvasRef;
}

export default useBabylon;
