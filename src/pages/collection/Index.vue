<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" xs="12" md="6">
            <h2>
              {{ collection.title }}
            </h2>
            <p>
              {{ collection.description }}
            </p>
          </v-col>
          <v-col cols="12" xs="12" md="6">
            <v-row>
              <v-row align="center" justify="center">
                <v-col cols="12" xs="12" md="6" align="center" v-for="(block, i) in collection.blocks" :key="i">
                  <v-card class="pointer" @click="changeValue(block.id)">
                    <v-card-text :class="[block.value === 100 ? 'bg-purple' : 'bg-grey']">
                      {{ block.value }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-confirmation
      v-model="isOpen"
      :message="'Good job on completing your collection!'"
    >
    </v-confirmation>
  </v-container>
</template>

<script>
  import { mapState } from "vuex";

  import {
    CHANGE_SINGLE_VALUE,
    GET_COLLECTION
  } from "@/store/collection/actions";

  import VConfirmation from "@/components/widgets/VConfirmation";

  export default {
    name: "CollectionIndex",
    components: {
      VConfirmation
    },
    data() {
      return {
        isOpen: false
      }
    },
    beforeMount() {
      this.$store.dispatch(GET_COLLECTION);
    },
    methods: {
      changeValue(id) {
        this.$store.commit(CHANGE_SINGLE_VALUE, id);

        if (this.isLast) {
          this.isOpen = true;
        }
      }
    },
    computed: {
      isLast() {
        return this.collection.blocks.filter(block => block.value === 100).length === this.collection.blocks.length;
      },
      ...mapState({
        collection: state => state.collection.getCollectionRequest.data,
        collectionRequest: state => state.collection.getCollectionRequest,
      }),
    },
  };
</script>

<style scoped>
  .bg-grey {
    background: grey;
  }
  .bg-purple {
    background: purple;
  }
  .pointer {
    cursor: pointer;
  }
</style>
