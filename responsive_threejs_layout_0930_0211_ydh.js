// 代码生成时间: 2025-09-30 02:11:21
 * It handles window resizing to maintain aspect ratio and
 * fits the scene within the available viewport.
 */

// Import the THREEJS library
import * as THREE from 'three';

// Function to create the scene, camera and renderer
function init() {
  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Create a WebGLRenderer, append its DOM element to the page
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a camera control to handle responsive layout
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Add a light source to the scene
  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  // Handle window resizing to maintain aspect ratio
  window.addEventListener('resize', onWindowResize, false);

  // Function to handle window resizing events
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Render the scene and camera
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  // Start the animation loop
  animate();
}

// Call the init function to create the 3D scene
init();