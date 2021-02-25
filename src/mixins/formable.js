export default {
  data() {
    return {
      form: {}
    };
  },
  methods: {
    resetScope() {
      const data = this.$options.data.call(this);
      Object.assign(this.$data, data);

      if (typeof this.resetAction === 'function') {
        this.$store.dispatch(this.resetAction());
      }
    },
    cancel() {
      this.resetScope();
      this.$emit("cancel");
    },
    error(response) {
      this.$emit("error", response);
    },
    success(response) {
      this.resetScope();
      this.$emit("success", response);
    },
    edit(response) {
      this.resetScope();
      this.$emit("edit", response);
    },
    submit() {
      this.$store
        .dispatch(this.submitAction(), this.submitActionOptions())
        .then(response => {
          this.success(response);
        })
        .catch(response => {
          this.error(response);
        });
    },
    submitThenEdit() {
      this.$store
        .dispatch(this.submitAction(), this.submitActionOptions())
        .then(response => {
          this.edit(response);
        })
        .catch(response => {
          this.error(response);
        });
    }
  },
  watch: {
    item: {
      handler(item) {
        if (!item) {
          return false;
        }

        if (typeof this.populate === 'function') {
          this.populate(item);
        }
      },
      deep: true
    }
  }
};
