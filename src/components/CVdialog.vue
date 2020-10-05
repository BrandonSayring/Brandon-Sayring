<template>
  <v-row justify="center">
    <v-dialog v-model="information" scrollable persistent width="600px">
      <v-card>
        <v-btn
          fab
          absolute
          right
          small
          icon
          @click="
            closeDialog();
            $emit(`closeDialog`);
          "
          class=" hidden-sm-and-down my-3"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title class="white">
          <h3>Brandon Sayring</h3>
          <v-list-item-subtitle
            >Web Development & Sound Design</v-list-item-subtitle
          >
        </v-card-title>

        <v-card-text class="ma-0 pa-0">
          <v-card-subtitle class="white pb-5 mx-2">
            Ngāti Porou Web Developer and Composer. <br />
            While Living in Tokyo, Brandon worked as a freelance frontend
            developer with
            <a href="https://greenish.jp/" target="_blank">合同会社Greenish</a>
            for clients such as
            <a href="https://www.guerbet.com/ja-jp/" target="_blank">Guerbet</a>
            and
            <a href="http://fintechjapan.org/" target="_blank"
              >FinTech Association of Japan</a
            >. <br />Brandon is currently working as the sole developer on a
            <a href="https://www.creativenz.govt.nz/" target="_blank">CNZ</a>
            funded VR project called
            <a href="https://ssrrb.co.nz" target="_blank"
              >Speargrass Skies Run Run By</a
            >
            with Waimarama based Māori theatre group.
          </v-card-subtitle>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header ripple
                ><v-card-title class="pa-0 pb-5 ma-0 justify-center">
                  Technologies</v-card-title
                ></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-container fluid>
                  <v-row dense>
                    <v-card class="text-center pb-5">
                      <h3 class="pa-5">Languages & Tools</h3>
                      <v-chip
                        class="ma-2"
                        outlined
                        small
                        label
                        link
                        v-for="language in languages"
                        :key="language"
                        :href="language.link"
                        target="_blank"
                        >{{ language.type }}</v-chip
                      >
                    </v-card>
                  </v-row>
                </v-container>

                <v-container fluid>
                  <v-row dense>
                    <v-col cols="12">
                      <v-card class="text-center pb-5">
                        <h3 class="pa-5">Frameworks & Libraries</h3>
                        <v-chip
                          class="ma-2"
                          outlined
                          small
                          label
                          link
                          v-for="framework in frameworks"
                          :key="framework"
                          :href="framework.link"
                          target="_blank"
                          >{{ framework.type }}</v-chip
                        >
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container fluid>
                  <v-row dense>
                    <v-col cols="12">
                      <v-card class="text-center pb-5">
                        <h3 class="pa-5">Development Platforms</h3>
                        <v-chip
                          class="ma-2"
                          outlined
                          label
                          small
                          link
                          v-for="platform in platforms"
                          :key="platform"
                          :href="platform.link"
                          target="_blank"
                          >{{ platform.type }}</v-chip
                        >
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container fluid>
                  <v-row dense>
                    <v-col cols="12">
                      <v-card class="text-center pb-5">
                        <h3 class="pa-5">Software</h3>
                        <v-chip
                          class="ma-2"
                          outlined
                          small
                          label
                          link
                          v-for="software in softwares"
                          :key="software"
                          :href="software.link"
                          target="_blank"
                          >{{ software.type }}</v-chip
                        >
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions class="white">
          <v-spacer></v-spacer>
          <v-btn
            depressed
            block
            dark
            @click="
              closeDialog();
              $emit(`closeDialog`);
            "
            class="pa-5 mr-5 hidden-md-and-up"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CVdialog",
  props: {
    information: {
      type: Boolean
    }
  },
  data: () => ({}),
  methods: {
    closeDialog() {
      const closesound = document.getElementById("closesound");
      closesound.volume = 0.05;
      closesound.play();
    }
  },
  computed: mapState({
    languages: state => state.languages,
    frameworks: state => state.frameworks,
    softwares: state => state.softwares,
    platforms: state => state.platforms
  })
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black !important;
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
