<template>
  <v-speed-dial
    :direction="sdDirection"
    :transition="sdTransition"
    v-model="mainMenu"
    right
    absolute
  >
    <template v-slot:activator>
      <v-btn icon fab @click="openSpeedDial">
        <v-icon v-if="mainMenu" size="24px">mdi-close</v-icon>
        <v-icon v-else size="24px">mdi-menu</v-icon>
      </v-btn>
    </template>

    <v-btn icon @click="enterTheMatrix" class=" mx-1">
      <v-icon>mdi-virtual-reality</v-icon>
    </v-btn>

    <v-btn icon @click="musicMute" class=" mx-1">
      <v-icon>{{ muted }}</v-icon>
    </v-btn>

    <v-btn
      icon
      @click="clicker"
      href="mailto:brandonsayring@gmail.com?subject=Hello, handsome!&body=I want you to do a web development job for me and I will pay you a lot of money!%0d%0a"
    >
      <v-icon>mdi-email-outline</v-icon>
    </v-btn>

    <v-btn
      dark
      icon
      @click="
        clickSound();
        $emit(`openDialog`);
      "
    >
      <v-icon>mdi-information-variant</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: "speed-dial-menu",
  props: {
    sdTransition: {
      type: String,
    },
    sdDirection: {
      type: String,
    },
  },
  data: () => ({
    mainMenu: false,
    muted: "mdi-volume-high",
  }),
  methods: {
    clickSound() {
      const clicksound = document.getElementById("clicksound");
      clicksound.volume = 0.1;
      clicksound.play();
    },
    openSpeedDial() {
      const sdsound = document.getElementById("sdsound");
      sdsound.volume = 0.1;
      sdsound.play();
    },

    musicMute() {
      const lilstiffy = document.getElementById("lilstiffy");
      if (lilstiffy.paused) {
        lilstiffy.play();
        this.muted = "mdi-volume-high";
      } else {
        lilstiffy.pause();
        this.muted = "mdi-volume-off";
      }
    },
    enterTheMatrix() {
      const scene = document.querySelector("a-scene");
      scene.enterVR();
      const entersound = document.getElementById("entersound");
      entersound.play();
      setTimeout(function() {
        document.getElementById("lilstiffy").play();
      }, 5000);
    },
  },
};
</script>
