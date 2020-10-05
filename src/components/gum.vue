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

    <a-text
      id="fishAndChips"
      v-if="fishAndChips"
      value="Do you wanna read my fish and chips reviews?"
      position="3 2 -1.5;"
      scale="0 1 1"
      animation__position="property: scale; to: 1 1 1; dur: 00; easing: easeOutQuint;"
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
        id="noFish"
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
      position="3 2 -1.5;"
      animation__position="property: scale; to: 1 1 1; dur: 00; easing: easeOutQuint;"
      look-at="[camera]"
    >
      <a-text
        class="clickable"
        link="href: http://fishandchipsfriday.blogspot.com/;"
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
  name: "gum",
  data: () => ({
    fishAndChips: false,
    areYouSure: false
  }),
  methods: {
    gumClick() {
      const coolclip = document.querySelector("#coolclip");
      coolclip.emit("clipVisible");
      coolclip.className = "clickable";
      this.fishAndChips = true;
      document.getElementById("clicksound").play();
    },
    yes() {
      this.areYouSure = true;
      document.getElementById("fishAndChips").setAttribute("visible", false);
      document.getElementById("noFish").className = "not-clickable";
      document.getElementById("clicksound").play();
    },
    no() {
      document.querySelector("#gumEntity").emit("shrink");
      document.getElementById("closesound").play();
    },
    notSure() {
      this.areYouSure = false;
      document.getElementById("fishAndChips").setAttribute("visible", true);
      this.fishAndChips = false;
      document.getElementById("blobject2").className = "clickable";
      document.getElementById("closesound").play();
    }
  }
};
</script>
