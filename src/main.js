import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import { TextureLoader } from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio (window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(3).setY(5); 

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,60)
const material = new THREE.MeshStandardMaterial({color:0xFF6347, wireframe: true})
const torus = new THREE.Mesh(geometry, material);
torus.scale.set(3,3,3);
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,6,0)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.setY(10);
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper)


const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('black.png');
scene.background = spaceTexture;

// const texture = new THREE.TextureLoader().load('2.png');
// const obj1 = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3), 
//   new THREE.MeshBasicMaterial({map: texture})
// );

// scene.add(obj1);

let tableModel;
const loader2 = new GLTFLoader();
loader2.load(
    'table.glb', 
    (gltf) => {
        tableModel = gltf.scene;
        scene.add(tableModel);
        tableModel.position.set(0, 0, 0);
        tableModel.scale.set(4,4,4);
    },
    (xhr) => {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);

let laptopModel;
const loader = new GLTFLoader();
loader.load(
    'laptop.glb', 
    (gltf) => {
        laptopModel = gltf.scene;
        scene.add(laptopModel);
        laptopModel.position.set(0, 4, 1);
        laptopModel.scale.set(5,5,5);
    },
    (xhr) => {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);






let deskModel;
const mtlLoader = new MTLLoader();
mtlLoader.load('desk.mtl', (materials) => {
    materials.preload(); // Load materials first
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials); // Apply MTL
    objLoader.load('desk.obj', (object) => {
        deskModel = object;
        scene.add(deskModel);
        deskModel.position.set(0, 0, 0);
        deskModel.scale.set(2, 2, 2);
    });
});


// const textureLoader = new TextureLoader();
// const texture = textureLoader.load('table_texture.jpg');





function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  if (tableModel){
    tableModel.rotation.y = t * 0.001;
  }

}

document.body.onscroll = moveCamera;


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  renderer.render(scene, camera);
}

animate()