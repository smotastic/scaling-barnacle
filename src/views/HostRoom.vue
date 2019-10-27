<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Raum: {{room.name}}</h1>
          <h2 class="subtitle">Passwort: {{room.password}}</h2>
        </div>
      </div>
    </section>
    <!-- Upload Media -->
    <section class="section">
      <b-field class="file">
        <b-upload v-model="file">
          <a class="button is-primary">
            <b-icon icon="upload"></b-icon>
            <span>Media hochladen</span>
          </a>
        </b-upload>
        <span class="file-name" v-if="file">{{ file.name }}</span>
      </b-field>
    </section>
        
    <section class="section">
      <b-button @click="upload">Upload</b-button>
    </section>
  </div>
</template>

<script>
import { readRoom } from "Service";

export default {
  props: ["name"],
  data: () => {
    return {
      room: {},
      file: null
    };
  },
  mounted() {
    readRoom(this.name).then(foundRoom => {
      this.room = foundRoom;
    });
  },
  methods: {
    upload() {
      console.log(this.file);
    }
  }
};
</script>