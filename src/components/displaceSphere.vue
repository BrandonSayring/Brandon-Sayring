<template>
  <a-sphere
    id="dSphere"
    visible="false"
    animation__visible="property: visible; startEvents: dSphereVisible; from: false; to: true; dur: 1;"
    material="shader: displacement; side: double; blending: multiply"
    geometry="radius: 0.002; segmentsHeight: 200; segmentsWidth: 50"
    scale="5000 300 2500"
    position="0 6 2"
  ></a-sphere>
</template>

<script>
export default {
  name: "displacement-sphere"
};
</script>

<style>
</style>