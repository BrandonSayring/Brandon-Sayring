


      <template>
  <a-entity id="toxicEntity">
    <a-gltf-model
      id="toxicWaste"
      visible="false"
      class="not-clickable"
      animation__visible="property: visible; startEvents: toxicVisible; from: false; to: true; dur: 1;"
      position="-0.6 2 -0.5"
      scale="0.2 0.2 0.2"
      src="#toxicwastecan"
    >
      <a-gltf-model
        id="toxicWaste2"
        class="not-clickable"
        @click="toxicClick"
        position="-0.2 -0.7 1"
        rotation="87 9 111"
        src="#toxicwastecan"
        event-set__clearclasscan="_event: click; _target: #toxicWaste; class: not-clickable;"
        event-set__clearclass="_event: click; class: not-clickable;"
        refresh-obj
      >
      </a-gltf-model>
      <a-gltf-model
        id="toxicWaste3"
        @click="toxicEnd"
        class="not-clickable"
        position="6 -0.6 0.6"
        rotation="-30 -12 -52"
        src="#toxicwastecan"
        animation__move="property: position; startEvents: shrink; to: 5 -5.5 2; dur: 3000;"
        animation__mouseenter="property: scale; startEvents: mouseenter; easing: easeInOutQuint; to: 1.1 1.1 1.1; dur: 5000"
        animation__shrinkCan="property: scale; startEvents: shrinkCan; easing: easeInOutQuint;   to: 0 0 0; dur: 5000"
        event-set__clearclass="_event: click; class: not-clickable;"
        refresh-obj
      ></a-gltf-model>
      <VRLink
        v-if="visibleLink"
        q="Do you wanna check out my record Label?"
        qID="bandcamp"
        declineID="nobandcamp"
        qPosition="3 -9.5 2.5;"
        qLink="href: https://patternrecognitionlabel.bandcamp.com/album/biohazard"
        :question="question"
        parentEntity="#toxicWaste3"
        model="toxicWaste2"
        @question="question = false"
      />
    </a-gltf-model>
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
    question: false,
    visibleLink: true
  }),
  methods: {
    toxicClick() {
      const toxic = document.querySelector("#blobject1");
      toxic.emit("blobjectVisible");
      toxic.className = "clickable";
      this.question = true;
      document.querySelector("#toxicWaste3").className = "clickable";
      document.getElementById("clicksound").play();
    },
    toxicEnd() {
      document.querySelector("#dome").emit("headExpand");
      this.visibleLink = false;
    }
  }
};
</script>
