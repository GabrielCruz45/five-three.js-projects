
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


// torus knot!!
const torusKnot_geo = new THREE.TorusKnotGeometry(0.1, 0.030, 100, 16);
const torusKnot_mat = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    flatShading: true,
});

const torusKnot_mesh = new THREE.Mesh(torusKnot_geo, torusKnot_mat);
torusKnot_mesh.position.x = 0.4;
scene.add(torusKnot_mesh);

const torusKnot_wireMesh = new THREE.Mesh(torusKnot_geo, wireMat);
torusKnot_wireMesh.scale.setScalar(1.0001);
torusKnot_mesh.add(torusKnot_wireMesh);

const torusKnot_mesh_two = new THREE.Mesh(torusKnot_geo, torusKnot_mat);
torusKnot_mesh_two.position.x = -0.4;
scene.add(torusKnot_mesh_two);

const torusKnot_wireMesh_two = new THREE.Mesh(torusKnot_geo, wireMat);
torusKnot_wireMesh_two.scale.setScalar(1.0001);
torusKnot_mesh_two.add(torusKnot_wireMesh_two);






//                                                                  5. Light!
// const light = new THREE.AmbientLight( 0xff0000 ); // soft white light
// scene.add( light );


const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

// // White directional light at half intensity shining from the top.
// const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// scene.add( directionalLight );

// const light = new THREE.PointLight( 0xff0000, 1, 100 );
// light.position.set( 50, 50, 50 );
// scene.add( light );

// // white spotlight shining from the side, modulated by a texture
// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 100, 1000, 100 );
// spotLight.map = new THREE.TextureLoader().load( url );
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;



const clock = new THREE.Clock();
let transition;
init();
animate();


function init() {
    const container = document.getElementById("container");

    const renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


    const materialA = new THREE.MeshBasicMaterial({
        color: 0x00FF00,
        wireframe: true,
    });

    const materialB = new THREE.MeshBasicMaterial({
        color: 0xFF9900,
        flatShading: true,
    });


    const sceneA = getFXScene({
        renderer,
        material: materialA,
        clearColor: 0x000000
    });

    const sceneB = getFXScene({
        renderer,
        material: materialB,
        clearColor: 0x000000,
        needsAnimatedColor: true,
    });

    transition = getTransition({ renderer, sceneA, sceneB });
};

function animate() {
    requestAnimationFrame(animate);
    transition.render(clock.getDelta);
}