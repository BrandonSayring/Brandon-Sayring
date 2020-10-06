<template>
  <a-entity
    id="clipEntity"
    animation="startEvents: shrink; property: scale; to: 0 0 0; dur: 3000;"
  >
    <a-gltf-model
      id="coolclip"
      class="not-clickable"
      src="#clip"
      @click="clipClick"
      visible="false"
      scale="0.5 0.5 0.5"
      position="-0.7 -0.12 0.3"
      rotation="-13 14 -112"
      animation__visible="property: visible; startEvents: clipVisible; from: false; to: true; dur: 1"
      animation__click="property: scale; startEvents: mouseenter; to: 0.8 0.8 0.8; dur: 2000"
      event-set__clearclass="_event: click; class: not-clickable;"
      refresh-obj
    >
    </a-gltf-model>

    <VRLink
      q="Would you like to follow my stripper persona on Instagram?"
      qID="insta"
      declineID="noInsta"
      qPosition="-0.3 -0.09 0.2"
      qLink="href: https://www.instagram.com/realtendermoonlight/;"
      :question="question"
      parentEntity="#clipEntity"
      model="coolclip"
      @question="question = false"
    />
  </a-entity>
</template>

<script>
import VRLink from "./VRLink";
export default {
  name: "clip",
  components: {
    VRLink
  },
  data: () => ({
    question: false
  }),
  methods: {
    clipClick() {
      const toxic = document.querySelector("#toxicwaste");
      toxic.emit("toxicVisible");
      toxic.className = "clickable";
      this.question = true;
      document.querySelector("#mainScene").emit("toxicCloud");
      document.getElementById("clicksound").play();
    }
  }
};
</script>
