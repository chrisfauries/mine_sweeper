<template>
  <div class="container">
    <div class="row" v-bind:key="index" v-for="(row,index) in selects">
      <div
        v-on:click="clicked(index, jndex)"
        class="cell"
        v-bind:key="jndex"
        v-for="(cell, jndex) in row"
        v-bind:class="{clicked : cell}"
      >{{mines[index][jndex]}}</div>
    </div>
    <div class="gameOver" v-bind:class="{show : isGameOver}">GAME OVER</div>
  </div>
</template>

<script>
import Logic from "../assets/logic.js";
// console.log(size)
export default {
  props: ['size'],
  data: function() {
		const { height, width, mines } = this.size;
		console.log()
    return {
      selects: Logic.selectBoard(height, width),
      mines: Logic.mineBoard(height, width, mines),
      isGameOver: false
    };
  },

  methods: {
    clicked: function(index, jndex) {
			console.log(this.size)
      let value = Logic.updateSelectionBoard(
        this.mines,
        this.selects,
        index,
        jndex,
        this
      );
      if (!value) {
        this.gameOver();
      }
    },

    gameOver: function() {
      this.isGameOver = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
}
.row {
}

.cell {
  display: inline-block;
  width: 75px;
  height: 75px;
  background-color: #eee;
  box-sizing: border-box;
  border: 1px solid black;
}
.clicked {
  background-color: red;
}

.gameOver {
  display: none;
  font-size: 60px;
  color: red;
  font-weight: bold;
}

.show {
  display: block;
}
</style>