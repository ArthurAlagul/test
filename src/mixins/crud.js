import listable from "@/mixins/listable";

import VConfirmation from '@/components/widgets/VConfirmation';

export default {
  components: {
    VConfirmation
  },
  mixins: [
    listable
  ],
  data() {
    return {
      items: [],
      activeId: null,
      isOpenView: false,
      isOpenRemove: false,
      isOpenEditing: false,
      isOpenCreation: false
    };
  },
  methods: {
    openView(id) {
      this.isOpenView = true;
      this.activeId = id;
    },
    closeView() {
      this.isOpenView = false;
      this.activeId = null;
    },
    openCreation() {
      this.isOpenCreation = true;
    },
    closeCreation() {
      this.isOpenCreation = false;
    },
    openEditing(id) {
      this.isOpenEditing = true;
      this.activeId = id;
    },
    closeEditing() {
      this.isOpenEditing = false;
      this.activeId = null;
    },
    openRemoving(id) {
      this.isOpenRemove = true;
      this.activeId = id;
    },
    closeRemoving() {
      this.isOpenRemove = false;
      this.activeId = null;
    },
    getData() {
      let params = this.params;

      if (typeof this.dataActionData === 'function') {
        params._data = this.dataActionData();
      }

      if (typeof this.dataActionParams === 'function') {
        params = {...params, ...this.dataActionParams()};
      }

      this.$store.dispatch(this.dataAction(), params);
    },
    remove(id) {
      this.$store.dispatch(this.removeAction(), {id}).then(() => {
        this.removed();
      });
    },
    failed(response) {
      const message = response && response.message ? response.message : this.$lang("main.crud.something_went_wrong");
      this.showNotification(message, "error");
    },
    created(response) {
      this.getData();
      this.closeCreation();
      this.showNotification(this.$lang("main.crud.success_create"), "success");
    },
    updated(response) {
      this.getData();
      this.closeEditing();
      this.showNotification(this.$lang("main.crud.success_update"), "success");
    },
    removed(response) {
      this.getData();
      this.closeRemoving();
      this.showNotification(this.$lang("main.crud.success_remove"), "success");
    },
    createdThenEdit(response) {
      this.getData();
      this.closeCreation();
      if (!!response.id) {
        this.openEditing(response.id);
      }
    },
  }
};
