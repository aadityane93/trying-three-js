import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio (window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10).setY(8).setX(8); 

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(50,7,40,60)
const material = new THREE.MeshStandardMaterial({color:0xFF6347, wireframe: true})
const torus = new THREE.Mesh(geometry, material);
torus.scale.set(3,3,3);
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,5,0)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.setY(6);
scene.add(pointLight, ambientLight)

const ambientLight2 = new THREE.AmbientLight(0xffffff);
ambientLight2.position.setY(30);
scene.add(pointLight, ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

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

// let tableModel;
// const loader2 = new GLTFLoader();
// loader2.load(
//     'table.glb', 
//     (gltf) => {
//         tableModel = gltf.scene;
//         scene.add(tableModel);
//         tableModel.position.set(0, 0, 0);
//         tableModel.scale.set(4,4,4);
//     },
//     (xhr) => {
//         console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
//     },
//     (error) => {
//         console.error('Error loading model:', error);
//     }
// );

let laptopModel;
const loader = new GLTFLoader();
loader.load(
    'laptop.glb', 
    (gltf) => {
        laptopModel = gltf.scene;
        scene.add(laptopModel);
        laptopModel.position.set(4, 7.41, -1);
        laptopModel.scale.set(15,15,15);
        const axis = new THREE.Vector3(0, 1, 0);
        axis.normalize();
        const angle = THREE.MathUtils.degToRad(90);
        laptopModel.rotateOnAxis(axis, angle);

    },
    (xhr) => {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);





let deskModel;

const textureLoader = new THREE.TextureLoader();
const diffuseTexture = textureLoader.load('textures/desk-022-col-metalness-4k.png'); 
const normalTexture = textureLoader.load('textures/desk-022-nrm-metalness-4k.png'); 
const roughnessTexture = textureLoader.load('textures/desk-022-roughness-metalness-4k.png'); 

const mtlLoader = new MTLLoader();
mtlLoader.load('desk.mtl', (materials) => {
    materials.preload();
    
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('desk.obj', (object) => {
        deskModel = object;
        scene.add(deskModel);
        deskModel.position.set(0, 0, 0);
        deskModel.scale.set(10, 10, 10);

        deskModel.traverse((child) => {
            if (child.isMesh) {
                child.material.map = diffuseTexture;      
                child.material.normalMap = normalTexture;
                child.material.roughnessMap = roughnessTexture;
                child.material.needsUpdate = true;
            }
        });
    });
});




// const loader = new X3DLoader();
// loader.load('laptop.x3d', (x3dScene) => {
//     scene.add(x3dScene);
//     x3dScene.scale.set(2, 2, 2); 
//     x3dScene.position.set(0, 0, 0);
// });


// function moveCamera(){
//   const t = document.body.getBoundingClientRect().top;
//   if (tableModel){
//     tableModel.rotation.y = t * 0.001;
//   }

// }

// document.body.onscroll = moveCamera;



let paper;

const textureLoader1 = new THREE.TextureLoader();
const diffuseTexture1 = textureLoader1.load('textures/a4-sheet-006-ao-metalness-4k.png'); 
const normalTexture1 = textureLoader1.load('textures/a4-sheet-006-nrm-metalness-4k.png'); 
const roughnessTexture1 = textureLoader1.load('textures/a4-sheet-006-roughness-metalness-4k.png'); 

const mtlLoader1 = new MTLLoader();
mtlLoader1.load('a4.mtl', (materials) => {
    materials.preload();
    
    const objLoader1 = new OBJLoader();
    objLoader1.setMaterials(materials);
    objLoader1.load('a4.obj', (object) => {
        paper = object;
        scene.add(paper);
        paper.position.set(-2.5, 7.41, 3);
        paper.scale.set(10, 10, 10);
        const axis = new THREE.Vector3(0, 1, 0);
        axis.normalize();
        const angle = THREE.MathUtils.degToRad(180);
        paper.rotateOnAxis(axis, angle);

        paper.traverse((child) => {
            if (child.isMesh) {
                child.material.map = diffuseTexture1;      
                child.material.normalMap = normalTexture1;
                child.material.roughnessMap = roughnessTexture1;
                child.material.needsUpdate = true;
            }
        });
    });
});


let lamp;
const loader2 = new GLTFLoader();
loader2.load(
    'lamp.glb', 
    (gltf) => {
        lamp = gltf.scene;
        scene.add(lamp);
        lamp.position.set(-13, 0, -1);
        lamp.scale.set(1,1,1);
        // const axis = new THREE.Vector3(0, 1, 0);
        // axis.normalize();
        // const angle = THREE.MathUtils.degToRad(90);
        // lamp.rotateOnAxis(axis, angle);

    },
    (xhr) => {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
        console.error('Error loading model:', error);
    }
);
 


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.005;
  torus.rotation.y += 0.006;
  torus.rotation.z += 0.007;
  renderer.render(scene, camera);
}

animate()