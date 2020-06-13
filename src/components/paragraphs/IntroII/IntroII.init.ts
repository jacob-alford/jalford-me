import { ArcRotateCamera, Vector3, Scene, ParticleHelper } from '@babylonjs/core';
import { InitFunction } from 'components/bindings/utilityHooks/useBabylon';

const getCamera = (scene: Scene, canvas: HTMLCanvasElement): ArcRotateCamera => {
  return new ArcRotateCamera(
    'ArcRotateCamera',
    0,
    Math.PI / 2,
    20,
    new Vector3(0, 15, 0),
    scene
  );
};

const init: InitFunction<{}> = (scene, _, canvas) => {
  const camera = getCamera(scene, canvas);
  camera.attachControl(canvas);

  ParticleHelper.CreateAsync('rain', scene, false).then(set => {
    set.start();
  });
};

export default init;
