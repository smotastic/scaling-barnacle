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
      <div class="columns">
        <div class="column is-narrow">
          <b-upload v-model="uploadedFile">
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Media hochladen</span>
            </a>
          </b-upload>
        </div>
        <div class="column is-narrow">
          <span class="uploadedFile-name" v-if="uploadedFile">{{ uploadedFile.name }}</span>
        </div>
      </div>
      <div class="columns">
        <div class="column is-narrow">
          <b-button @click="upload">Upload</b-button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="columns">
        <div class="column is-narrow" v-for="(url,index) in uploadedFiles" :key="index">
          <img width="250px" :src="url" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { readRoom, uploadMedia, downloadMedia } from "Facade";

export default {
  props: ["id"],
  data: () => {
    return {
      room: {},
      uploadedFile: null,
      uploadedFiles: []
    };
  },
  mounted() {
    readRoom(this.id).then(foundRoom => {
      this.room = foundRoom;
      this.downloadRoom();
    });
  },
  methods: {
    upload() {
      uploadMedia(this.room.id, this.uploadedFile).then(code => {
        this.uploadedFile = null;
        this.uploadedFiles.push(code.url);
      });
    },
    downloadRoom() {
      downloadMedia(this.room.id).then(urls => {
        this.uploadedFiles = urls;
      });
    }
  }
};
</script>