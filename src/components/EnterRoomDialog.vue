<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Raum betreten</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Raumname">
          <b-input v-model="roomName" value placeholder="Raumname" required></b-input>
        </b-field>

        <b-field label="Password">
          <b-input v-model="roomPassword" placeholder="Passwort"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button class="button" type="button" @click="$parent.close()">Schliessen</b-button>
        <b-button
          class="button is-primary"
          type="button"
          @click="enterRoom"
          :disabled="!roomName"
        >Betreten</b-button>
      </footer>
    </div>
  </form>
</template>

<script>
import { findRoomByName } from "Facade";
export default {
  data: () => {
    return {
      roomName: "",
      roomPassword: ""
    };
  },
  methods: {
    enterRoom() {
      findRoomByName(this.roomName).then(foundRoom => {
        if (foundRoom) {
          if (foundRoom.password === this.roomPassword) {
            this.$router.push({
              name: "joinroom",
              params: { id: foundRoom.id }
            });
          } else {
            console.log("Falsches Passwort");
          }
        } else {
          console.log("Kein Raum gefunden");
        }
      });
    }
  }
};
</script>