<template>
  <v-app
  style="backgroundColor: #000000">
    <v-app-bar app flat color="transparent" dark>
      <speedDialMenu
        sdTransition="slide-x-reverse-transition"
        sdDirection="left"
        @openDialog="information = true"
        class="hidden-sm-and-down"
      />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer dark fixed padless color="transparent" width="100%">
      <v-card flat tile color="transparent">
        <v-card-text
          background-color="transparent"
          class=" white--text text-center"
        >
          <v-btn
            v-for="social in socials"
            :key="social"
            class=" mx-4"
            :href="social.link"
            target="_blank"
            icon
          >
            <v-icon size="24px">
              {{ social.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
      </v-card>

      <speedDialMenu
        sdTransition="slide-x-reverse-transition"
        sdDirection="top"
        @openDialog="information = true"
        class="hidden-md-and-up"
      />
    </v-footer>
    <CVdialog :information="information" @closeDialog="information = false" />
    <audio
      id="clicksound"
      src="@/assets/audio/click.mp3"
      preload="auto"
    ></audio>
    <audio
      id="sdsound"
      src="@/assets/audio/open-speed-dial.mp3"
      preload="auto"
    ></audio>
    <audio
      id="closesound"
      src="@/assets/audio/close-dialog.mp3"
      preload="auto"
    ></audio>
    <audio
      id="entersound"
      src="@/assets/audio/enter-VR.mp3"
      preload="auto"
    ></audio>
    <audio
      id="exitsound"
      src="@/assets/audio/exit-VR.mp3"
      preload="auto"
    ></audio>
    <audio
      id="lilstiffy"
      src="@/assets/audio/lilstiffy.mp3"
      preload="auto"
    ></audio>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import speedDialMenu from "./components/speedDialMenu";
import CVdialog from "./components/CVdialog";

export default {
  name: "App",

  components: {
    speedDialMenu,
    CVdialog
  },

  data: () => ({
    information: false
  }),
  computed: mapState({
    socials: state => state.socials
  }),
  mounted() {
    document.addEventListener("DOMContentLoaded", function() {
      var scene = document.querySelector("a-scene");
      var splash = document.querySelector("#splash");
      scene.addEventListener("loaded", function() {
        splash.style.display = "none";
      });
    });
  }
};
</script>

<style>
html,
body {
  font-family: "David Libre", serif;
}

#app {
  font-family: "David Libre", serif;
}
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
