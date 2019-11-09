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
              <p class="card-header-title">{{file.filename}}</p>
            </header>
            <div class="card-image" @click="showMedia(file)" style="cursor:pointer">
              <figure class="image is-4by3">
                <img :src="file.url" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <b-modal :active.sync="showActiveFile" aria-role="dialog" aria-modal @close="onMediaClose">
        <p class="image is-1by1">
          <img v-if="activeFile" :src="activeFile.url" />
        </p>
      </b-modal>
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
      seenFiles: [],
      activeFile: null,
      showActiveFile: false,
      uploadListener: undefined
    };
  },
  mounted() {
    readRoom(this.id).then(foundRoom => {
      this.room = foundRoom;
    });
    this.uploadListener = listenToUpload(this.id, file => {
      this.seenFiles.push(file);
      this.showMedia(file, 10000);
    });
  },
  destroyed() {
    if(this.uploadListener) {
      this.uploadListener();
    }
  },
  methods: {
    showMedia(file, timeout) {
      this.activeFile = file;
      this.showActiveFile = true;
      if (timeout) {
        setTimeout(() => {
          this.onMediaClose();
        }, timeout);
      }
    },
    onMediaClose() {
      this.activeFile = null;
      this.showActiveFile = false;
    }
  }
};
</script>