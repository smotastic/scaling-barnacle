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
        <button class="button" type="button" @click="$parent.close()">Schliessen</button>
        <button class="button is-primary" @click="enterRoom">Betreten</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  data: () => {
    return {
      roomName: "",
      roomPassword: ""
    };
  },
  methods: {
    enterRoom() {
      console.log(this.roomName);
      console.log(this.roomPassword);
    }
  }
};
</script>