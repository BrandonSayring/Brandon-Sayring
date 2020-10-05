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

    <a-text
      id="insta"
      v-if="insta"
      value="Would you like to follow my stripper persona on Instagram?"
      position="-0.3 -0.09 0.2"
      scale="0 0.1 0.1"
      animation__position="property: scale; to: 0.1 0.1 0.1; dur: 00; easing: easeOutQuint;"
      look-at="[camera]"
    >
      <a-text
        value="Yes"
        class="clickable"
        position="0 -0.5 0"
        look-at="[camera]"
        @click="yes"
        animation__mouseenter="property: text.color; startEvents: mouseenter; to: #ff0000; dur: 50"
        animation__mouseleave="property: text.color; startEvents: mouseleave; to: #ffffff; dur: 50"
        event-set__clearclass="_event: click; class: not-clickable;"
        refresh-obj
      >
      </a-text>

      <a-text
        id="noInsta"
        value="No"
        color="#ffffff"
        class="clickable"
        position="2 -0.5 0"
        look-at="[camera]"
        @click="no"
        animation__mouseenter="property: text.color; startEvents: mouseenter; to: #ff0000; dur: 50"
        animation__mouseleave="property: text.color; startEvents: mouseleave; to: #ffffff; dur: 50"
        event-set__clearclass="_event: click; class: not-clickable;"
        refresh-obj
      >
      </a-text>
    </a-text>

    <a-text
      id="areYouSure"
      v-if="areYouSure"
      value="Are you sure you want to exit this page."
      position="-0.3 -0.09 0.2"
      scale="0 0.1 0.1"
      animation__position="property: scale; to: 0.1 0.1 0.1; dur: 00; easing: easeOutQuint;"
      look-at="[camera]"
    >
      <a-text
        class="clickable"
        link="href: https://www.instagram.com/realtendermoonlight/;"
        value="Yes"
        position="0 -0.5 0"
        animation__mouseenter="property: text.color; startEvents: mouseenter; to: #ff0000; dur: 50"
        animation__mouseleave="property: text.color; startEvents: mouseleave; to: #ffffff; dur: 50"
        look-at="[camera]"
        event-set__clearclass="_event: click; class: not-clickable;"
        refresh-obj
      ></a-text>
      <a-text
        class="clickable"
        @click="notSure"
        value="No"
        position="2 -0.5 0"
        animation__mouseenter="property: text.color; startEvents: mouseenter; to: #ff0000; dur: 50"
        animation__mouseleave="property: text.color; startEvents: mouseleave; to: #ffffff; dur: 50"
        look-at="[camera]"
        event-set__clearclass="_event: click; class: not-clickable;"
        refresh-obj
      ></a-text>
    </a-text>
  </a-entity>
</template>

<script>
export default {
  name: "clip",
  data: () => ({
    insta: false,
    areYouSure: false
  }),
  methods: {
    clipClick() {
      const toxic = document.querySelector("#toxicwaste");
      toxic.emit("toxicVisible");
      toxic.className = "clickable";
      this.insta = true;
      document.querySelector("#mainScene").emit("toxicCloud");
      document.getElementById("clicksound").play();
    },
    yes() {
      this.areYouSure = true;
      document.getElementById("insta").setAttribute("visible", false);
      document.getElementById("noInsta").className = "not-clickable";
      document.getElementById("clicksound").play();
    },
    no() {
      document.querySelector("#clipEntity").emit("shrink");
      document.getElementById("closesound").play();
    },
    notSure() {
      this.areYouSure = false;
      document.getElementById("insta").setAttribute("visible", true);
      this.insta = false;
      document.getElementById("coolclip").className = "clickable";
      document.getElementById("closesound").play();
    }
  }
};
</script>
