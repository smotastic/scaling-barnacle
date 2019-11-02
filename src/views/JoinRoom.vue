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

    <!-- MEDIA CARD -->
    <section class="section">
      <div class="columns">
        <div class="column is-one-quarter" v-for="(file,index) in seenFiles" :key="index">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">{{file.name}}</p>
            </header>
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="file.url" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { readRoom, listenToUpload } from "Facade";
export default {
  props: ["id"],
  data: () => {
    return {
      room: {},
      seenFiles: []
    };
  },
  mounted() {
    readRoom(this.id).then(foundRoom => {
      this.room = foundRoom;
    });
    listenToUpload(this.id, file => {
      console.log(file);
    });
  }
};
</script>