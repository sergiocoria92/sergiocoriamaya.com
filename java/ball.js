import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const ballSize = 80;
const radius = ballSize / 2;

let x = 300;
let y = 120;
let speedX = 2;
let speedY = 1.4;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 2.8;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(ballSize, ballSize);

const canvas = renderer.domElement;
canvas.style.position = 'fixed';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9999';
document.body.appendChild(canvas);

scene.add(new THREE.AmbientLight(0xffffff, 2));

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 2, 5);
scene.add(light);

let ball;

new GLTFLoader().load('./images/ball_only.glb', (gltf) => {
  ball = gltf.scene;
  ball.scale.set(2.5, 2.5, 2.5);
  scene.add(ball);
});

function circleHitsRect(cx, cy, r, rect) {
  const closestX = Math.max(rect.left, Math.min(cx, rect.right));
  const closestY = Math.max(rect.top, Math.min(cy, rect.bottom));

  const dx = cx - closestX;
  const dy = cy - closestY;

  return dx * dx + dy * dy <= r * r;
}

function animate() {
  requestAnimationFrame(animate);

  const oldX = x;
  const oldY = y;

  x += speedX;
  y += speedY;

  // Muros de la ventana visible
  if (x - radius <= 0) {
    x = radius;
    speedX *= -1;
  }

  if (x + radius >= window.innerWidth) {
    x = window.innerWidth - radius;
    speedX *= -1;
  }

  if (y - radius <= 0) {
    y = radius;
    speedY *= -1;
  }

  if (y + radius >= window.innerHeight) {
    y = window.innerHeight - radius;
    speedY *= -1;
  }

  // Muros HTML
  const walls = document.querySelectorAll('.name, .hero-image, .hero-card, header');

  walls.forEach((wall) => {
    const rect = wall.getBoundingClientRect();

    if (circleHitsRect(x, y, radius, rect)) {
    x = oldX;
    y = oldY;

    const ballCenterX = oldX;
    const ballCenterY = oldY;

    const rectCenterX = rect.left + rect.width / 2;
    const rectCenterY = rect.top + rect.height / 2;

    const dx = ballCenterX - rectCenterX;
    const dy = ballCenterY - rectCenterY;

    if (Math.abs(dx) > Math.abs(dy)) {
        speedX *= -1;
    } else {
        speedY *= -1;
    }

    speedX += (Math.random() - 0.5) * 0.4;
    speedY += (Math.random() - 0.5) * 0.4;

}
  });

  canvas.style.left = `${x - radius}px`;
  canvas.style.top = `${y - radius}px`;

  if (ball) {
    ball.rotation.x += 0.03;
    ball.rotation.y += 0.03;
  }

  renderer.render(scene, camera);
}

animate();