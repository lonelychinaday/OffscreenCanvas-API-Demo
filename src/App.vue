<script setup lang="ts">
import NormalRendering from './components/NormalRendering.vue';
import OffscreenRendering from './components/OffscreenRendering.vue';
import { RENDERER, SPACING } from './constants/sizes';

// 用于在模板中使用的渲染器尺寸
const rendererWidth = `${RENDERER.WIDTH}px`;
const rendererHeight = `${RENDERER.HEIGHT}px`;
</script>

<template>
  <div class="container">
    <NormalRendering />
    <OffscreenRendering />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #f5f5f5;
}

/* 统一画布容器尺寸 */
.renderer-container {
  width: v-bind(rendererWidth);
  height: v-bind(rendererHeight);
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
