import * as THREE from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let cube: THREE.Mesh;

function init({
  canvas,
  width,
  height,
}: {
  canvas: OffscreenCanvas;
  width: number;
  height: number;
}) {
  // 设置画布尺寸
  canvas.width = width;
  canvas.height = height;

  // 创建渲染器，使用 2 作为设备像素比（为了保持清晰度）
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(2);

  // 创建场景
  scene = new THREE.Scene();

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  // 创建一个立方体
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    flatShading: false,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 添加光源
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));
}

function animate() {
  if (!cube || !renderer || !scene || !camera) return;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

self.onmessage = (e: MessageEvent) => {
  const { type, canvas, width, height } = e.data;

  switch (type) {
    case 'init':
      init({ canvas, width, height });
      animate();
      break;
    case 'resize':
      if (renderer && camera) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      break;
  }
};
