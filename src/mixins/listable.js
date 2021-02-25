import {
  STORE_FILTERS_SETTINGS,
  RETRIEVE_FILTERS_SETTINGS,
} from "@/store/settings/actions";

export default {
  props: {
    resetFilters: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  beforeMount() {
    if (this.resetFilters) {
      this.getData();
      return;
    }

    if (!this.$isEmpty(this.$route.query)) {
      this.filters = this.$route.query;
      return;
    }

    this.$store.dispatch(RETRIEVE_FILTERS_SETTINGS, {
      module: this.$options.name
    }).then((filters) => {
      if (filters) {
        this.filters = filters;
      } else {
        this.getData();
      }
    });
  },
  methods: {
    sort(column) {
      if (this.filters.sortBy === column) {
        this.filters.order = this.filters.order === 'asc' ? 'desc' : 'asc';
      } else {
        this.filters.sortBy = column;
        this.filters.order = 'asc';
      }
    }
  },
  computed: {
    params() {
      return {
        page: this.pagination.page,
        perPage: this.pagination.perPage,
        ...this.filters
      };
    },
    collection() {
      return this.request.collection;
    },
    pagination() {
      if (!this.request) {
        return {
          page: 1,
          perPage: 15
        };
      }

      if (!this.request.pagination) {
        return {};
      }

      return this.request.pagination;
    },
    isAsc() {
      return this.filters.order === 'asc';
    },
    isDesc() {
      return this.filters.order === 'desc';
    },
  },
  watch: {
    "pagination.page"() {
      if (this.withoutPagination) {
        return false;
      }

      this.getData();
    },
    filters: {
      handler() {
        this.pagination.page = 1;
        this.getData();

        if (!this.$isEmpty(this.$route.query)) {
          return;
        }

        this.$store.dispatch(STORE_FILTERS_SETTINGS, {
          module: this.$options.name,
          filters: this.filters
        });
      },
      deep: true
    }
  }
};
