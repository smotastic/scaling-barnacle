<template>
  <div class="container" style="height:100%">
    <div class="columns is-vcentered is-centered is-multiline is-mobile" style="height:100vh">
      <div class="column is-narrow">
        <div class="columns is-centered">
          <div class="column is-narrow">
            <b-button type="is-primary" @click="isCreateRoomDialog = true">Raum erstellen</b-button>
          </div>
          <div class="column is-narrow">
            <b-button type="is-primary" @click="isEnterRoomDialog = true">Raum beitreten</b-button>
          </div>
        </div>
        <div v-if="isMock" class="columns is-centered">
          <div class="column is-narrow">
            <b-button type="is-danger" @click="clearMockingDb">Clean DB</b-button>
          </div>
        </div>
        <div v-if="isMock" class="columns is-centered">
          <div class="column is-narrow">
            <pre>{{mockedDb}}</pre>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      :active.sync="isCreateRoomDialog"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <CreateRoomDialog />
    </b-modal>

    <b-modal
      :active.sync="isEnterRoomDialog"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <EnterRoomDialog />
    </b-modal>
  </div>
</template>

<script>
import CreateRoomDialog from "../components/CreateRoomDialog";
import EnterRoomDialog from "../components/EnterRoomDialog";

export default {
  name: "home",
  components: {
    CreateRoomDialog,
    EnterRoomDialog
  },
  data: () => {
    return {
      isCreateRoomDialog: false,
      isEnterRoomDialog: false,
      mockedDb: ""
    };
  },
  mounted() {
    if (this.isMock) {
      this.calcMockingDb();
    }
  },
  computed: {
    isMock() {
      return process.env.VUE_APP_DATABASE === "mock";
    }
  },
  methods: {
    clearMockingDb() {
      let storage = require("../facade/impl/mock/db");
      storage.default.clear();
      this.calcMockingDb();
    },
    calcMockingDb() {
      let storage = require("../facade/impl/mock/db");
      let db = {};
      storage.default
        .iterate(function(value, key) {
          db[key] = value;
        })
        .then(() => {
          this.mockedDb = JSON.stringify(db, null, "\t");
        });
    }
  }
};
</script>
