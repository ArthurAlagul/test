<template>
  <div>
    <v-app-bar app dark clipped-left class="d-print-none">
      <v-row align="center" justify="center">
        <v-col cols="12" md="4" xs="4" align="center">
          <router-link :to="{ name: 'home' }">
            <v-btn>
              Home
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'collection' }">
            <v-btn>
              Collection
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
  };
</script>

<style scoped></style>
