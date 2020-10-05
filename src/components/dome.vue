<template>
  <a-gltf-model
    id="dome"
    class="not-clickable"
    position="0 1.6 -0.3"
    scale="0.1  0.1 0.1"
    src="#goldhead"
    rotation="0 30 0"
    animation__float="property: rotation; to: 3600 360 0; loop: true; easing: linear; dur: 2000000; "
    animation__mouseenter="property: scale; easing: linear;   to: 100 100 100; startEvents: headExpand; dur: 500"
    animation__mouseleave="property: scale; easing: linear;   to: 0.1  0.1 0.1; startEvents: headShrink; dur: 500"
    animation__opacity="property: model-opacity; from: 0; to: 0.8; dur: 2000"
    event-set__clearclass="_event: click; class: not-clickable;"
    refresh-obj
  ></a-gltf-model>
</template>

<script>
export default {
  name: "dome",
  data: () => ({}),
  methods: {
    gumClick() {
      const coolclip = document.querySelector("#coolclip");
      coolclip.emit("clipVisible");
      coolclip.className = "clickable";
      document.getElementById("clicksound").play();
    }
  }
};
</script>
