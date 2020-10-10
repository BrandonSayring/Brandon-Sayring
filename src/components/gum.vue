<template>
  <a-entity
    id="gumEntity"
    animation="startEvents: shrink; property: scale; to: 0 0 0; dur: 3000;"
  >
    <a-gltf-model
      id="blobject2"
      class="clickable"
      position="20 1.6 -1"
      scale="1  1 1"
      src="#gum"
      @click="gumClick"
      animation__opacity="property: model-opacity; easing: linear; from: 0; to: 0.8; dur: 10000"
      animation__float="property: rotation; to: 3600 360 0; loop: true; easing: linear; dur: 2000000; "
      animation__mouseenter="property: scale; easing: linear;   to: 1.5 1.5 1.5; startEvents: mouseenter; dur: 500"
      animation__mouseenter2="property: rotation; easing: linear;   to: 0 3600 0; startEvents: mouseenter; dur: 50000"
      animation__mouseleave="property: scale; easing: linear;   to: 1  1 1; startEvents: click; dur: 500"
      animation__mouseleave2="property: rotation; easing: linear;   to: 0 0 0; startEvents: mouseleave; dur: 50000"
      event-set__clearclass="_event: click; class: not-clickable;"
      refresh-obj
    >
    </a-gltf-model>

    <VRLink
      q="Do you wanna read my fish and chips reviews?"
      qID="fishAndChips"
      declineID="noFish"
      qPosition="0.5 1.6 0"
      qLink="href: http://fishandchipsfriday.blogspot.com/;"
      :question="question"
      parentEntity="#gumEntity"
      model="blobject2"
      @question="question = false"
    />
  </a-entity>
</template>

<script>
import VRLink from "./VRLink";
export default {
  name: "gum",
  components: {
    VRLink
  },
  data: () => ({
    question: false
  }),
  methods: {
    gumClick() {
      const coolclip = document.querySelector("#coolclip");
      coolclip.emit("clipVisible");
      coolclip.className = "clickable";
      this.question = true;
      document.getElementById("clicksound").play();
    }
  }
};
</script>
