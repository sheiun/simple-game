<template>
  <div>
    <canvas ref="game" width="500px" height="500px" style="border: 1px solid black;"></canvas>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "BlockGame",
  data: () => ({
    socket: {},
    context: {},
    keys: { 37: "left", 38: "up", 39: "right", 40: "down" },
    position: {
      x: 0,
      y: 0
    }
  }),
  created() {
    this.socket = io("http://localhost:3000");
    window.addEventListener("keydown", this.move);
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("position", data => {
      this.position = data;
      this.context.clearRect(
        0,
        0,
        this.$refs.game.width,
        this.$refs.game.height
      );
      this.context.fillStyle = "#FFFFFF";
      this.context.fillRect(0, 0, this.$refs.game.width, this.$refs.game.width);
      this.context.fillStyle = "#000000";
      this.context.fillRect(this.position.x, this.position.y, 20, 20);
    });
  },
  methods: {
    move(event) {
      let direction = this.keys[event.keyCode];
      if (direction !== undefined) {
        this.socket.emit("move", direction);
      }
    }
  }
};
</script>

<style scoped>
canvas {
  width: 500px;
  height: 500px;
}
</style>
