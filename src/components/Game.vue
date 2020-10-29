<template>
<div>
  <div :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else>
    Downloading ...
  </div>
  {{ score }}
</div>
</template>


<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'Game',
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container'
    }
  },
  computed: {
    ...mapState({
      score: state => state.game.score,
      levels: state => state.game.levels
    }),
    ...mapGetters('game', {
      score: 'score',
      levels: 'levels'
    })
  },
  methods: {
    ...mapActions('game',{
      setLevels: 'setLevels',
      setScore: 'setScore'
    })
  },
  async mounted() {
    this.setScore();
    this.setLevels();

    const game = await import(/* webpackChunkName: "game" */ '@/game/game')
    this.downloaded = true
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId)
    })
  },
  destroyed() {
    this.gameInstance.destroy(false)
  }
}
</script>


<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
