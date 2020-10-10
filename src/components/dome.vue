<template>
  <a-gltf-model
    id="dome"
    class="not-clickable"
    position="0 1.6 -0.3"
    scale="0.1  0.1 0.1"
    src="#goldhead"
    rotation="0 30 0"
    animation__float="property: rotation; to: 3600 360 0; loop: true; easing: linear; dur: 2000000; "
    animation__mouseenter="property: scale; startEvents: headExpand; easing: linear; to: 100 100 100; dur: 500"
    animation__mouseleave="property: scale; startEvents: headShrink; easing: linear; to: 0.1  0.1 0.1; dur: 500"
    animation__opacity="property: model-opacity; from: 0; to: 0.8; dur: 2000"
    event-set__clearclass="_event: click; class: not-clickable;"
    refresh-obj
  >
    <a-gltf-model
      id="blobject1"
      class="not-clickable"
      @click="blobjectClick"
      position="-0.2 -0.4 0.4"
      scale="0.05  0.05 0.05"
      visible="false"
      src="#avo"
      animation__opacity="property: model-opacity; easing: linear; from: 0; to: 0.8; dur: 10000"
      animation__float="property: rotation; to: 360 360 0; loop: true; easing: linear; dur: 20000; "
      animation__visible="property: visible; startEvents: blobjectVisible; from: false; to: true; dur: 1"
      animation__mouseenter="property: scale; startEvents: mouseenter; easing: linear;   to: 0.08 0.08 0.08; dur: 500"
      animation__mouseenter2="property: rotation; startEvents: mouseenter; easing: linear;   to: 0 3600 0; dur: 50000"
      animation__mouseleave="property: scale; startEvents: mouseleave; easing: linear;   to: 0.05  0.05 0.05; dur: 500"
      animation__mouseleave2="property: rotation; startEvents: mouseleave; easing: linear;   to: 0 0 0; dur: 50000"
      event-set__clearclass="_event: click; class: not-clickable;"
      refresh-obj
    ></a-gltf-model>
  </a-gltf-model>
</template>

<script>
export default {
  name: "dome",
  data: () => ({}),
  methods: {
    blobjectClick() {
      const bug = document.querySelector("#exitBug");
      bug.emit("bugVisible");
      bug.className = "clickable";
      document.querySelector("#dome").emit("headShrink");
      document.getElementById("toxicWaste3").setAttribute("visible", false);
      document.getElementById("clicksound").play();
    }
  }
};
</script>
