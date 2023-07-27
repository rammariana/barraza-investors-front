const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./", //antes era '/'
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/scss/_variables.scss";
        `,
      },
    },
  },
  pwa: {
    themeColor: "#37b7e3",
    msTileColor: "#37b7e3", // Color de la barra de tareas en dispositivos Windows
    appleMobileWebAppCapable: "yes", // Habilitar el modo pantalla completa en dispositivos iOS
    appleMobileWebAppStatusBarStyle: "#37b7e3", // Color de la barra de estado en dispositivos iOS
    manifestOptions: {
      name: "Barraza Investors",
      short_name: "Barraza Investors",
      start_url: "/", // URL de inicio de la aplicación
      display: "standalone", // Estilo de visualización de la aplicación
      background_color: "#ffffff", // Color de fondo de la pantalla de carga inicial
      iconPaths: {
        favicon: "./img/icons/logo-icon-pwa.png",
      },
      icons: [
        // Iconos para la pantalla de inicio
        {
          src: "./img/icons/logo-icon-pwa.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
});
