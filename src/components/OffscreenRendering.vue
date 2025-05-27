<template>
  <div class="renderer-container">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RENDERER } from '../constants/sizes';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let worker: Worker | null = null;

onMounted(() => {
  if (!canvasRef.value) return;

  canvasRef.value.width = RENDERER.WIDTH;
  canvasRef.value.height = RENDERER.HEIGHT;

  // 创建 Worker
  worker = new Worker(new URL('../workers/render.worker.ts', import.meta.url), {
    type: 'module',
  });

  // 转移 canvas 控制权
  const offscreen = canvasRef.value.transferControlToOffscreen();
  worker.postMessage(
    {
      type: 'init',
      canvas: offscreen,
      width: RENDERER.WIDTH,
      height: RENDERER.HEIGHT,
    },
    [offscreen]
  );
});

onUnmounted(() => {
  if (worker) {
    worker.terminate();
    worker = null;
  }
});
</script>

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
