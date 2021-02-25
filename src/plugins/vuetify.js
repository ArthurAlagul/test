import Vue from "vue";
import Vuetify from "vuetify/lib";

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#424242',
        secondary: '#a9ddd6',
        accent: '#8c9eff',
        error: '#b71c1c',
        success: '#0ba869',
        admin: '#B3E5FC'
      },
    },
  }
};

const vuetify = new Vuetify(opts);

Vue.use(Vuetify);

export default vuetify;
