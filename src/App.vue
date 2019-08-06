<template>
  <div id="app">
    <Board v-bind:size="size" />
  </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'app',
  components: {
    Board
  }, 
  data: function() {
    return {
      size : {
        width : 10,
        height : 10,
        mines : 20
      }
    }
  }
}
</script>

<style lang="scss">
#app {

}
</style>
