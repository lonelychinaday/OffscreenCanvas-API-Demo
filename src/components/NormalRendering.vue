<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { RENDERER, SHADOW } from '../constants/sizes';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

onMounted(() => {
  if (!canvasRef.value) return;

  canvasRef.value.width = RENDERER.WIDTH;
  canvasRef.value.height = RENDERER.HEIGHT;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true, // 开启抗锯齿
  });
  renderer.setSize(RENDERER.WIDTH, RENDERER.HEIGHT, false);
  renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    flatShading: false, // 关闭平面着色
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    renderer.dispose();
  });
});
</script>

<template>
  <div class="renderer-container">
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped>
.renderer-container {
  position: relative;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
