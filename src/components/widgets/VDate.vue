<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="nudge"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateValueFormatted"
        :label="label"
        :hint="hint"
        :prepend-icon="!!prependIcon ? prependIcon : ''"
        persistent-hint
        readonly
        v-on="on"
        :error="error"
        :error-messages="errorMessages"
        :dense="dense"
        :clearable="clearable"
        :disabled="disabled"
        :dark="dark"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateValue"
      @input="menu = false"
      :locale="lang"
      :min="minValue"
      :scrollable="scrollable"
      :type="type"
      :first-day-of-week="firstDayOfWeek"
      :readonly="readonly"
    >
      <template v-slot:default>
        <v-btn color="primary" @click="setToday()">{{ $lang('main.words.today') }}</v-btn>
      </template>
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name: "VDate",
    props: {
      label: {
        type: String,
        default: 'Date'
      },
      hint: {
        type: String,
        default: ''
      },
      nudge: {
        type: Number,
        default: 40
      },
      value: {
        default: null
      },
      error: {
        default: false
      },
      errorMessages: {
        default: () => []
      },
      dense: {
        type: Boolean,
        default: false
      },
      prependIcon: {
        default: 'mdi-calendar'
      },
      locale: {
        type: String
      },
      min: {
        type: String,
        required: false,
        default: null
      },
      scrollable: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        default: 'date',
      },
      firstDayOfWeek: {
        type: Number,
        default: 1
      },
      clearable: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      dark: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        dateValue: null,
        dateValueFormatted: null,
        menu: false,
        minValue: null,
        lang: null,
      }
    },
    mounted() {
      this.lang = this.locale ? this.locale : this.$locale();
    },
    created() {
      this.dateValue = this.value;
      this.minValue = this.min;
    },
    methods: {
      setToday() {
        this.dateValue = this.$moment().format('YYYY-MM-DD');
        this.menu = false;
      },
    },
    watch: {
      value() {
        this.dateValue = this.value;
      },
      min() {
        this.minValue = this.min;
      },
      dateValue(newVal) {
        this.$emit('input', newVal);
        if (this.type === 'month') {
          this.dateValueFormatted = this.$moment(this.dateValue).format('MM/YYYY');
        } else {
          this.dateValueFormatted = this.$toDateFormat(this.dateValue);
        }
      },
      dateValueFormatted() {
        if (!this.dateValueFormatted) {
          this.dateValue = null;
        }
      }
    }
  }
</script>
