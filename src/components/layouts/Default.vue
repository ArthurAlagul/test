<template>
  <div>
    <site-navbar></site-navbar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <site-footer></site-footer>
  </div>
</template>

<script>
  import SiteFooter from '@/components/layouts/partials/Footer';
  import SiteNavbar from '@/components/layouts/partials/Navbar';

  export default {
    name: "DefaultLayout",
    components: {
      SiteFooter,
      SiteNavbar,
    }
  };
</script>
