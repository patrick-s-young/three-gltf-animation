// Three
import * as THREE from 'three';
// Scene
import { Scene } from './components/Scene';
import { Camera } from './components/Camera';
import { Lights } from './components/Lights';
// GLTF
import { Character } from './components/Character';
// Mesh
import { Floor } from './components/Floor';
// Renderer
import { Renderer } from './components/Renderer';
// UI
import { DirectionControls } from './components/DirectionControls';
import { ActionControls } from './components/ActionControls';
// Character & Animation configs
import { CONFIGS } from './configs';
// Helpers
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// Styles
import './style.css';


//////////////////
// BEGIN COMPONENT
export const App = () => {
  // SCENE SETUP
  const scene = Scene();
  const camera = Camera();
  const lights = Lights();
  scene.add(lights.getLights());
  // GLTF
  const soldier = Character(CONFIGS.CHARACTER, CONFIGS.ANIMATION, onCharacterInit);
  scene.add(soldier.mesh);
  // MESH
  const floor = Floor();
  scene.add(floor.mesh);
  // UI
  // const uiParent = document.createElement('div');
  // uiParent.style.position = 'absolute';
  // uiParent.style.visibility = 'hidden';
  // document.body.appendChild(uiParent);
  // let directionControls;
  // RENDERER
  const renderer = Renderer();
  document.body.appendChild(renderer.domElement);
  const clock = new THREE.Clock();
  // Helpers
  const controls = new OrbitControls(camera.self, renderer.domElement)
  controls.target.set(0, 1, 0);
  controls.update();
  renderer.setAnimationLoop(animationLoopCallback);
  // uiParent.style.visibility = 'visible';
  // directionControls?.enableTouch();

  // let actionControls;


  function onCharacterInit() {
    console.log('character initialized');
  }

  // RENDER LOOP
  function animationLoopCallback(timestamp) {
    const dt = clock.getDelta();
    soldier.update(dt);
    renderer.render(scene.self, camera.self);
  }

  return null;
}


