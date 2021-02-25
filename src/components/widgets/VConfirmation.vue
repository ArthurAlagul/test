<template>
  <v-dialog v-model="isOpen" :width="width">
    <v-card>
      <v-card-title>
        <span v-if="!!title">
          {{ title }}
        </span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <span v-if="!!message">
          {{ message }}
        </span>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="ok">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: "VConfirmation",
    props: {
      value: {
        default: null
      },
      options: {
        type: Object,
        required: false,
        default() {
          return {};
        }
      },
      title: {
        type: String,
        required: false,
      },
      message: {
        type: String,
        required: false,
      },
      width: {
        required: false,
        default: '300'
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    created() {
      this.isOpen = this.value;
    },
    methods: {
      ok() {
        this.isOpen = false;
      },
    },
    watch: {
      value() {
        this.isOpen = this.value;
      },
      isOpen(val) {
        this.$emit('input', val);
      }
    }
  }
</script>

<style scoped>

</style>
