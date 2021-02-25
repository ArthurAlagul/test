<template>
  <v-app id="app">
    <default-layout>
    </default-layout>
  </v-app>
</template>

<script>
  import ApiService from "@/services/api";

  import DefaultLayout from '@/components/layouts/Default';

  export default {
    name: "App",
    components: {
      DefaultLayout
    },
    data() {
      return {
        isLoaded: false
      };
    },
    created() {
      ApiService.handleRequest();
      ApiService.handleResponse(this.handleResponseErrors);
    },
    methods: {
      handleResponseErrors(status, message) {
        if (status === 400 || status === 403) {
          this.showNotification(message, "error");
        }
      },
    },
  };
</script>

<style lang="scss">

</style>
