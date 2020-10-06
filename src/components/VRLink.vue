<template>
  <a-entity>
    <a-text
      :id="qID"
      v-if="question"
      :value="q"
      :position="qPosition"
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
        :id="declineID"
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
      v-if="areYouSure"
      value="Are you sure you want to exit this page."
      :position="qPosition"
      animation__position="property: scale; to: 1 1 1; dur: 00; easing: easeOutQuint;"
      look-at="[camera]"
    >
      <a-text
        class="clickable"
        :link="qLink"
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
        @click="
          notSure();
          $emit(`question`);
        "
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
  name: "VR-Link",
  props: {
    q: {
      type: String
    },
    qID: {
      type: String
    },
    declineID: {
      type: String
    },
    qPosition: {
      type: String
    },
    qLink: {
      type: String
    },
    question: {
      type: Boolean
    },
    parentEntity: {
      type: String
    },
    model: {
      type: String
    }
  },
  data: () => ({
    areYouSure: false
  }),
  methods: {
    yes() {
      this.areYouSure = true;
      document.getElementById(this.qID).setAttribute("visible", false);
      document.getElementById(this.declineID).className = "not-clickable";
      document.getElementById("clicksound").play();
    },
    no() {
      document.querySelector(this.parentEntity).emit("shrink");
      document.getElementById("closesound").play();
    },
    notSure() {
      this.areYouSure = false;
      document.getElementById(this.qID).setAttribute("visible", true);
      document.getElementById(this.model).className = "clickable";
      document.getElementById("closesound").play();
    }
  }
};
</script>

<style>
</style>