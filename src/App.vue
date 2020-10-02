<template>
  <Game />
</template>


<script>
import Game from '@/components/Game'
export default {
  name: 'App',
  components: { Game }
}
</script>


<style lang="scss">
@font-face {
    font-family: "VCR";
    src: url("game/assets/font/VCR_OSD_MONO.ttf");
    font-weight: 800;
}

body {
  font-family: "VCR";
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
