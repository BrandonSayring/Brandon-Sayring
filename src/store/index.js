import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    languages: [
      {
        type: "Javascript",
        link: "https://www.javascript.com/",
      },
      {
        type: "SCSS",
        link: "https://sass-lang.com/",
      },
      {
        type: "HTML",
        link:
          "https://en.wikipedia.org/wiki/HTML#:~:text=Hypertext%20Markup%20Language%20(HTML)%20is,scripting%20languages%20such%20as%20JavaScript.",
      },
      {
        type: "PHP",
        link: "https://en.wikipedia.org/wiki/PHP",
      },
      {
        type: "Git",
        link: "https://git-scm.com/",
      },
      {
        type: "Pyhthon",
        link: "https://www.python.org/",
      },
      {
        type: "Node.js",
        link: "https://nodejs.org/en/",
      },
      {
        type: "Webpack",
        link: "https://webpack.js.org/",
      },
      {
        type: "mySQL",
        link: "https://www.mysql.com/",
      },
    ],
    frameworks: [
      {
        type: "Vue.js",
        link: "https://vuejs.org/",
      },
      {
        type: "Vuetify",
        link: "https://vuetifyjs.com/en/introduction/why-vuetify/",
      },
      {
        type: "Vuex",
        link: "https://vuex.vuejs.org/",
      },
      {
        type: "NativeScript-Vue",
        link: "https://nativescript-vue.org/",
      },
      {
        type: "Aframe.js",
        link: "https://aframe.io/docs/1.0.0/introduction/",
      },
      {
        type: "THREE.js",
        link:
          "https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene",
      },
      {
        type: "React.js",
        link: "https://reactjs.org/docs/getting-started.html",
      },
    ],
    softwares: [
      {
        type: "VS Code",
        link: "https://code.visualstudio.com/download",
      },
      {
        type: "Ableton Live",
        link: "https://www.ableton.com/en/",
      },
      {
        type: "Chrome Dev Tools",
        link: "https://developers.google.com/web/tools/chrome-devtools",
      },
      {
        type: "Blender",
        link: "https://www.blender.org/",
      },
      {
        type: "WinSCP",
        link: "https://winscp.net/eng/download.php",
      },
      {
        type: "Adobe Creative Suite",
        link:
          "https://www.adobe.com/nz/creativecloud.html?gclid=Cj0KCQjwwuD7BRDBARIsAK_5YhUL0DkZ02zU-Lp_tQOtuBq_jqCPD9s15CEMy9R5NAFwE82lMs5ssLEaAnpdEALw_wcB&sdid=VKW3KHYL&mv=search&ef_id=Cj0KCQjwwuD7BRDBARIsAK_5YhUL0DkZ02zU-Lp_tQOtuBq_jqCPD9s15CEMy9R5NAFwE82lMs5ssLEaAnpdEALw_wcB:G:s&s_kwcid=AL!3085!3!424696917355!e!!g!!adobe%20creative%20suite",
      },
    ],
    platforms: [
      {
        type: "Firebase",
        link: "https://firebase.google.com/",
      },
      {
        type: "AWS",
        link: "https://aws.amazon.com/",
      },
      {
        type: "Github",
        link: "https://github.com/",
      },
      {
        type: "Wordpress",
        link: "https://wordpress.com/",
      },
      {
        type: "Squarespace",
        link: "https://www.squarespace.com/",
      },
      {
        type: "Figma",
        link: "https://www.figma.com/",
      },
    ],
    soundDesign: [
      {
        project: "Worst Idea of All Time Podcast",
        detail: "Season 5 Theme Song",
        link: "https://www.worstideaofalltime.com/",
      },
      {
        project: "Life is Easy",
        detail: "Gym Scene Music ep. 6 & 7",
        link: "https://www.tvnz.co.nz/shows/life-is-easy"
      },
      {
        project: "Brothers (2014)",
        detail: "Music Composer & Boom Operater",
        link: "https://www.imdb.com/title/tt4575724/"
      },
      {
        project: "Blanking: The Unseen Art",
        detail: "Music Composer",
        link: "https://vimeo.com/25180123"
      },
    ],
    socials: [
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/brandon.sayring",
      },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/in/brandon-sayring-19a811180/",
      },
      {
        icon: "mdi-github",
        link: "https://github.com/BrandonSayring/Brandon-Sayring",
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
