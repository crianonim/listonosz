<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-toolbar app color="brown darken-4" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>{{appTitle}}</v-toolbar-title>
          <v-btn flat>Menu</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat>SIGN IN</v-btn>
          <v-btn color="brown lighten-3">JOIN</v-btn>
        </v-toolbar>
        <v-container fluid>
          <!-- <img src="./assets/logo.png"> -->
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App"
};

</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
