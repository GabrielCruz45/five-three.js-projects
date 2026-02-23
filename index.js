
// TODO 1: experiment with different primitives and lights; use documentation. 
// TODO 2: experiment with different animations.
// TODO 3: experimetn with OrbitControls.


import * as THREE from "three"
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// 3 things three.js needs for a scene: a renderer, a camera and a scene object

const w = window.innerWidth;
const h = window.innerHeight;

//                                                                  1. Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement); // the canvas element added to .html

//                                                                  2. Camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2; // a little bit back, away from the center


//                                                                  3. Scene
const scene = new THREE.Scene();



//                                                                  3.5 Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;


//                                                                  4. Object(s)
// using three.js predefined primitives and materials

const geo = new THREE.IcosahedronGeometry(0.2, 2);  // size and detail; primitive
const mat = new THREE.MeshStandardMaterial({
    color : 0xffffff,
    flatShading: true
});                                                 // material
const mesh = new THREE.Mesh(geo, mat);              // container for the primitive and the material; has a bunch of properties for animation, etc.
scene.add(mesh);


const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001); // make the wire mesh slightly bigger, looks less buggy
mesh.add(wireMesh); // instead of scene.add(wireMesh) -> adds wireMesh as a child to mesh, instead of a new element to the whole scene


// add torus
const torus_geo = new THREE.TorusGeometry(1, 0.1, 16, 100);
const torus_mat = new THREE.MeshStandardMaterial({
    color : 0xffffff,
    flatShading: true,
}); 
const torusMesh = new THREE.Mesh(torus_geo, torus_mat);
scene.add(torusMesh);

const torusWireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
});

const torusWireMesh = new THREE.Mesh(torus_geo, torusWireMat);
torusWireMesh.scale.setScalar(1.0001);
torusMesh.add(torusWireMesh);



//                                                                  5. Light!
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);



function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    torusMesh.rotation.x = t * 0.001;
    torusMesh.rotation.y = t * 0.001;
    torusMesh.rotation.z = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
};
animate(); // don't forget to call the animate function!!
