import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

var locations = [
  {
    id: "1",
    location_name: "Warsaw",
    latitude: 52.2297,
    longitude: 21.0122,
    branch_url:
      "https://www.oliverwyman.com/in/our-expertise/global-locations/europe/poland/warsaw.html",
  },
  {
    id: "2",
    location_name: "Kuala Lumpur",
    latitude: 3.1319,
    longitude: 101.6841,
    branch_url:
      "https://www.oliverwyman.com/our-expertise/global-locations/asia-pacific/malaysia/kuala-lumpur.html",
  },
  {
    id: "3",
    location_name: "Mexico City",
    latitude: 19.4326,
    longitude: -99.1332,
    branch_url:
      "https://www.oliverwyman.com/our-expertise/global-locations/americas/mexico/mexico-city.html",
  },
];

const container = document.getElementById("globe-container");
const pinsOverlay = document.getElementById("pins-overlay");

/*  Scene Set Up  */
const scene = new THREE.Scene();

/*  Camera Set Up  */
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 3);

/*  Renderer Set Up  */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

/*  OrbitControls Set Up  */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 1.2;
controls.maxDistance = 3;

/*  Lights Set Up  */
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 3, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

/*  Globe  */
const geometry = new THREE.SphereGeometry(1, 32, 32);
const loader = new THREE.TextureLoader();

let material;

loader.load(
  "assets/earthTexture.jpg",
  (texture) => {
    material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.1,
      roughness: 0.9,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  },
  undefined,
  () => {
    material = new THREE.MeshStandardMaterial({
      color: "#3D5A9E",
      metalness: 0.1,
      roughness: 0.9,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  }
);

/*  Function: Convert Lat/Lon > 3D coordinates  */
function coordinatesToVector3(lat, lon, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

const locationPins = [];

locations.forEach((location) => {
  const a = document.createElement("a");
  a.href = location.branch_url;
  a.target = "_blank";
  a.className = "pin";
  a.innerHTML = `<span>${location.location_name}</span>`;
  pinsOverlay.appendChild(a);
  locationPins.push({ element: a, location });
});

/*  Function: Animation loop  */
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  const canvasRect = container.getBoundingClientRect();
  renderer.render(scene, camera);

  locationPins.forEach(({ element, location }) => {
    const position = coordinatesToVector3(
      location.latitude,
      location.longitude,
      1.01
    );

    const ndc = position.clone().project(camera);
    const x = (ndc.x * 0.5 + 0.5) * canvasRect.width;
    const y = (-ndc.y * 0.5 + 0.5) * canvasRect.height;

    const pointNormal = position.clone().normalize();
    const cameraToPoint = camera.position.clone().sub(position).normalize();
    const dot = pointNormal.dot(cameraToPoint);
    const isFrontSide = dot > 0;

    if (isFrontSide && ndc.z < 1) {
      element.style.display = "block";
      element.style.transform = `translate(${x}px, ${y}px)`;
    } else {
      element.style.display = "none";
    }
  });
}
animate();
