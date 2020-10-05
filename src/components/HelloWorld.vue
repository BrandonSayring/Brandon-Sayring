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
      <a-gltf-model
        id="toxicwaste"
        visible="false"
        class="not-clickable"
        animation__visible="property: visible; startEvents: toxicVisible; from: false; to: true; dur: 1"
        position="-0.6 2 -0.5"
        scale="0.2 0.2 0.2"
        src="#toxicwastecan"
        event-set__clearclass="_event: click; class: not-clickable;"
      >
        <a-gltf-model
          id="toxicwaste2"
          class="not-clickable"
          position="-0.2 -0.7 1"
          rotation="87 9 111"
          src="#toxicwastecan"
          event-set__clearclass="_event: click; class: not-clickable;"
        ></a-gltf-model>
        <a-gltf-model
          id="toxicwaste2"
          class="not-clickable"
          position="6 -0.6 0.6"
          rotation="-30 -12 -52"
          src="#toxicwastecan"
          animation__mouseenter="property: position; easing: easeInOutQuint;   to: 4 -5 2; startEvents: mouseenter; dur: 5000"
          animation__mouseleave="property: position; easing: easeInOutQuint;   to: 6 -0.6 0.6; startEvents: mouseleave; dur: 5000"
          event-set__clearclass="_event: click; class: not-clickable;"
        ></a-gltf-model>
      </a-gltf-model>

      <clip />
    </a-gltf-model>

    <a-gltf-model
      id="blobject1"
      class="not-clickable"
      position="0 1.6 -1"
      scale="0.05  0.05 0.05"
      src="#avo"
      animation__opacity="property: model-opacity; easing: linear; from: 0; to: 0.8; dur: 10000"
      animation__float="property: rotation; to: 3600 360 0; loop: true; easing: linear; dur: 2000000; "
      animation__mouseenter="property: scale; easing: linear;   to: 0.08 0.08 0.08; startEvents: mouseenter; dur: 500"
      animation__mouseenter2="property: rotation; easing: linear;   to: 0 3600 0; startEvents: mouseenter; dur: 50000"
      animation__mouseleave="property: scale; easing: linear;   to: 0.05  0.05 0.05; startEvents: mouseleave; dur: 500"
      animation__mouseleave2="property: rotation; easing: linear;   to: 0 0 0; startEvents: mouseleave; dur: 50000"
      event-set__clearclass="_event: click; class: not-clickable;"
      refresh-obj
    ></a-gltf-model>

    <gum />

    <dome />

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

export default {
  name: "HelloNewWorld",
  components: {
    cameraRig,
    gum,
    dome,
    clip
  },
  data: () => ({}),
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
