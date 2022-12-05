import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
components,
directives,
  theme: {
    dark: true,
    themes: {
      // Spotify green = 1DB954
      // Spotify black = 191414
      light: {
        primary: "#1DB954", //'#1976D2',
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#1DB954", //'#4CAF50',
        warning: "#FFC107",
      },
      dark: {
        primary: "#1DB954", //'#1976D2',
        success: "#1DB954", //'#4CAF50',
      },
    },
  },
});
