<template>
  <div class="home">
    <b-button @click="hallo" type="is-dark">Dark</b-button>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    hallo: () => {
      console.log("Hallo");
    }
  }
};
</script>
