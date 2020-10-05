<template>
  <a-entity id="rig">
    <!-- Camera -->

    <a-entity
      id="camera"
      camera
      position="0 1.6 0"
      look-controls="pointerLockEnabled: true"
      wasd-controls
    >
      <!-- Cursor -->
      <a-entity>
        <a-entity
          id="GBcursor"
          cursor="fuse: true; fuseTimeout: 1500; "
          raycaster="far: 500; objects: .clickable;"
          event-set__cursorfusing="_target: #cursorFeedback; _event: fusing;
                                    animation.property: scale; animation.from: 0 0.05 0.05; animation.to: 0.5 0.05 0.05; animation.easing: linear; animation.dur: 1500"
          event-set__cursorclick="_target: #cursorFeedback; _event: click;
                                    animation.property: scale; animation.to: 0 0.05 0.05; animation.easing: linear;"
          event-set__cursorcancel="_target: #cursorFeedback; _event: mouseleave;
                                    animation.property: scale; animation.to: 0 0.05 0.05; animation.easing: linear;"
        ></a-entity>

        <a-light
          angle="20"
          decay=".5"
          distance="500"
          intensity="0"
          type="spot"
          color="#ff0000"
          penumbra="0.29"
          animation="property: light.intensity; from: 0; to: 1; dur: 10000"
        >
        </a-light>

        <a-cylinder
          position="0 0 -1"
          scale=".02 .02 .5"
          opacity="0.4"
          color="#00aaff"
          shader="flat"
          height="1"
          radius="0.2"
        ></a-cylinder>
        <a-cylinder
          position="0 0 -1"
          scale=".02 .02 .5"
          opacity="0.4"
          color="#00aaff"
          shader="flat"
          height="0.2"
          radius="1"
        ></a-cylinder>
        <a-box
          id="cursorFeedback"
          position="0 -0.3 -1"
          scale="0 0.05 0.05"
          opacity="0.4"
          color="#00aaff"
          shader="flat"
        >
        </a-box>
      </a-entity>
    </a-entity>
  </a-entity>
</template>

<script>
export default {
  name: "camera-rig"
};
</script>
