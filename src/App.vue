<template>
  <div id="app" v-bind:class="{gameOver : gameOver}">
    <Board v-bind:size="size" @gameOver="shake" />
  </div>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name: 'app',
  components: {
    Board
  }, 
  data: function() {
    return {
      size : {
        width : 15,
        height : 15,
        mines : 40
      },
      gameOver : false
    }
  },

  methods : {
    shake : function(value) {
      this.gameOver = true;
    }
  }
}
</script>

<style lang="scss">
#app.gameOver {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
