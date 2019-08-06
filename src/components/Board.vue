<template>
  <div class="container">
    <div class="row" v-bind:key="index" v-for="(row,index) in selects">
      <div
        @contextmenu.prevent="rClick(index, jndex)"
        v-on:click="clicked(index, jndex)"
        v-bind:key="jndex"
        v-for="(cell, jndex) in row"
        class="cell scene scene--card"
      >
        <div class="card" v-bind:class="{isFlipped : cell}">
          <div class="card__face card__face--front">
            <img
              v-if="flags[index][jndex]"
              src="../assets/redflag.png"
              alt="flag"
              height="30"
              width="30"
            />
          </div>
          <div class="card__face card__face--back">
            <div v-if="mines[index][jndex] === -1">
              <img src="../assets/landmine.png" alt="MINE!" height="30" width="30" />
            </div>
            <div v-else>{{mines[index][jndex]}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gameOver" v-bind:class="{show : isGameOver}">GAME OVER</div>
  </div>
</template>

<script>
import Logic from "../assets/logic.js";
import uuidv4 from "uuid/v4";
export default {
  props: ["size"],
  data: function() {
    const { height, width, mines } = this.size;
    return {
      selects: Logic.selectBoard(height, width),
      mines: Logic.mineBoard(height, width, mines),
      flags: Logic.selectBoard(height, width),
      isGameOver: false
    };
  },

  methods: {
    clicked: function(index, jndex) {
      if (this.isGameOver) {
        return;
      }
      let value = Logic.updateSelectionBoard(
        this.mines,
        this.selects,
        index,
        jndex,
        this
      );
      if (!value) {
				this.$set(this.selects[index], jndex, true);
				this.$emit('gameOver', true);
        this.gameOver();
      }
    },

    id: function() {
      return uuidv4();
    },

    rClick: function(X, Y) {
      if (this.isGameOver) {
        return;
      }
      this.$set(this.flags[X], Y, true);
    },

    gameOver: function() {
      this.isGameOver = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 750px;
  height: 800px;
}

.row {
  height: 50px;
}

.cell {
  display: inline-block;
  width: 50px;
  height: 50px;
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

.card {
  cursor: url(http://cur.cursors-4u.net/others/oth-3/oth213.cur), auto;
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
}

.card.isFlipped {
  transform: translateX(-100%) rotateY(-180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 50px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  backface-visibility: hidden;
}

.card__face--front {
  background: green;
}

.card__face--back {
  background: #2b1d0e;
  transform: rotateY(180deg);
}
</style>