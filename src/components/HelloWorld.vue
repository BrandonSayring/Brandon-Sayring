<template>
  <a-scene
    :style="pointerEvents"
    id="mainScene"
    vr-mode-ui="enabled: false"
    fog="type: linear; color: #2d8f00; far: 2000"
    loading-screen="backgroundColor: black; dotsColor: black;"
    animation__toxic="property: fog.far; startEvents: toxicCloud; from: 2000; to: 500; dur: 5000; loop: 1;"
  >
    <a-assets timeout="5000">
      <a-asset-item id="world" src="models/blobject3.gltf"></a-asset-item>
      <a-asset-item id="avo" src="models/blobject1.gltf"></a-asset-item>
      <a-asset-item id="gum" src="models/blobject2.glb"></a-asset-item>
      <a-asset-item id="bug" src="models/blobject5.glb"></a-asset-item>
      <a-asset-item
        id="toxicwastecan"
        src="models/toxiccan.glb"
        preload="auto"
      ></a-asset-item>
      <a-asset-item
        id="goldhead"
        src="models/head.glb"
        preload="auto"
      ></a-asset-item>
      <a-asset-item id="clip" src="models/carabina.glb"></a-asset-item>
    </a-assets>

    <a-sky color="#000000"></a-sky>

    <a-light
      type="point"
      intensity="0"
      position="0 3 0"
      decay="12"
      distance="500"
      animation="property: light.intensity; from: 0; to: 150; dur: 5000"
      ><a-light type="ambient" intensity="0.1"></a-light
    ></a-light>

    <a-gltf-model
      id="worldblob"
      class="not-clickable"
      scale="175 175 175"
      src="#world"
      animation__float="property: rotation; to: 3600 360 0; loop: true; easing: linear; dur: 2000000; "
    >
      <toxicWaste />

      <clip />

      <bug @dSphere="dSphere = true" />
    </a-gltf-model>

    <gum />

    <dome />

    <displacementSphere v-if="dSphere" />

    <a-entity
      star-system="color: #ff0000; radius: 298.14; depth: 1000; size: 0; count: 3000"
      id="stars"
      animation="property: rotation; easing: linear; dir: alternate; to: 0 -2 0; loop: true; dur: 100000"
      rotation="-360 -360 360"
      scale="0.008 0.002 0.004"
    ></a-entity>

    <cameraRig />
  </a-scene>
</template>

<script>
import cameraRig from "./cameraRig";
import gum from "./gum";
import dome from "./dome";
import clip from "./clip";
import toxicWaste from "./toxicWaste";
import bug from "./bug";
import displacementSphere from "./displaceSphere";

export default {
  name: "HelloNewWorld",
  components: {
    cameraRig,
    gum,
    dome,
    clip,
    toxicWaste,
    bug,
    displacementSphere
  },
  data: () => ({
    dSphere: false
  }),
  methods: {},
  computed: {
    pointerEvents() {
      let viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      if (viewportWidth > 960) {
        return "pointer-events: none;";
      } else {
        return "pointer-events: auto;";
      }
    }
  }
};
</script>

<style>
.a-loader-title {
  color: #000000;
}
</style>
