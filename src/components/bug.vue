<template>
  <a-entity>
    <a-gltf-model
      id="exitBug"
      class="not-clickable"
      @click="bugClick()"
      position="-0.5 -0.7 -0.7"
      scale="0.1 0.1 0.1"
      visible="false"
      src="#bug"
      animation__float="property: rotation; to: 0 36 5; loop: true; easing: easeInOutElastic; dur: 2100; dir: alternate; "
      animation__float2="property: position; from: -0.5 -0.7 -0.7; to: -0.6 -0.7 -0.8; loop: true; easing: easeInOutSine; dur: 5300; dir: alternate; delay: 100; "
      animation__visible="property: visible; startEvents: bugVisible; from: false; to: true; dur: 1"
      animation__pulse="property: scale; from: 0.1 0.1 0.1; to: .095 .095 .095; loop: true; dur: 5000; dir: alternate; easings: easeOutQuad;"
      event-set__clearclass="_event: click; class: not-clickable;"
      refresh-obj
    >
    </a-gltf-model>
  </a-entity>
</template>

<script>
export default {
  name: "bug",
  methods: {
    bugClick() {
      document.getElementById("rig").setAttribute("visible", false);
      document.getElementById("mainScene").emit("cloudFlash");
      document.getElementById("exitsound").play();
      this.$emit(`dSphere`);
      setTimeout(function() {
        document.getElementById("lilstiffy").pause();
        document.querySelector("#dSphere").emit("dSphereVisible");
        document.querySelector("#dome").emit("headExpand");
        const scene = document.querySelector("a-scene");
        scene.exitVR();
      }, 1200);
    }
  }
};
</script>
