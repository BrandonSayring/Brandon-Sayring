<template>
  <div class="home">
    <HelloWorld />
    
    <div app id="splash">
      <div>
      <img id="splash" class="logosplash" src="../assets/logo.png" alt="logo" height="20px"/>
      </div>
      <div class="loading"></div>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<style scoped>
#splash {
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 300px;
  height: 300px;

  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 0.25rem solid transparent;
  border-top-color: white;
  animation: spin 1s infinite linear;
}
.logosplash {
  position: absolute;
  max-width: 300px;
  max-height: 300px;
  filter: invert(1);


}
</style>
