// te quedaste en 36:35 https://www.youtube.com/watch?v=UMqNHi1GDAE

import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const stars = getStarfield({numStars: 2000});
scene.add(stars);


const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshStandardMaterial({
    map: loader.load("./earth_textures/earthmap1k.jpg"),
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);


const lightsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/03_earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
    transparent: true,
});
const ligthsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(ligthsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/04_earthcloudmap.jpg"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.8,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

// const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
// scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);


function animate() {
    requestAnimationFrame(animate);

    earthMesh.rotation.y += 0.002;
    ligthsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.002;
    
    renderer.render(scene, camera);
    controls.update();
};
animate(); // don't forget to call the animate function!!