<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Raum erstellen</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Raumname">
          <b-input v-model="roomName" value placeholder="Dein Raumname" required></b-input>
        </b-field>

        <b-field label="Password">
          <b-input v-model="roomPassword" placeholder="Optionales Passwort"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Schliessen</button>
        <button class="button is-primary" type="button" @click="createRoom">Erstellen</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { createRoom } from "Facade";

export default {
  data: () => {
    return {
      roomName: "",
      roomPassword: ""
    };
  },
  methods: {
    createRoom() {
      createRoom(this.roomName, this.roomPassword)
        .then(success => {
          console.log(success);
          this.$router.push({ name: "hostroom", params: { id: success.id } });
          // this.$router.push(`/hostroom/${success.id}`);
        })
        .catch(err => console.err(err));
    }
  }
};
</script>