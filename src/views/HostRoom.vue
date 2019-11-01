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
          <b-button @click="upload" :disabled="!uploadedFile">Upload</b-button>
        </div>
      </div>
    </section>

    <!-- MEDIA CARD -->
    <section class="section">
      <div class="columns">
        <div class="column is-one-quarter" v-for="(file,index) in uploadedFiles" :key="index">
          <div class="card" :class="{'active' : file.name === activeFile}">
            <header class="card-header">
              <p class="card-header-title">{{file.name}}</p>

              <!-- <b-button type="is-danger"  icon-right="delete" /> -->

              <a @click="deleteMedia(file)" class="card-header-icon">
                <span class="icon">
                  <i class="delete" aria-hidden="true"></i>
                </span>
              </a>
            </header>
            <div class="card-image" @click="showMedia(file)" style="cursor:pointer">
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
import { readRoom, uploadMedia, downloadMedia, removeMedia } from "Facade";

export default {
  props: ["id"],
  data: () => {
    return {
      room: {},
      uploadedFile: null,
      uploadedFiles: [],
      activeFile: null
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
        this.uploadedFiles.push({ url: code.file.url, name: code.file.name });
      });
    },
    downloadRoom() {
      downloadMedia(this.room.id).then(files => {
        this.uploadedFiles = files;
      });
    },
    showMedia(file) {
      if (file.name === this.activeFile) {
        this.activeFile = null;
      } else {
        this.activeFile = file.name;
      }
    },
    deleteMedia(file) {
      removeMedia(this.id, file.name);
    }
  }
};
</script>

<style scoped>
.card.active {
  border-color: #17a689;
  border-width: 5px;
}
.card.active > .card-header > p {
  color: #17a689;
}
</style>