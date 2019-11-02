<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column">
              <h1 class="title">Raum: {{room.name}}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { readRoom } from "Facade";
export default {
  props: ["id"],
  data: () => {
    return {
      room: {}
    };
  },
  mounted() {
    readRoom(this.id).then(foundRoom => {
      this.room = foundRoom;
    });
  }
};
</script>