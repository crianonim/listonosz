<template>
  <div class="hello">
    <!-- <v-container> -->
    <v-layout row>
      <v-flex xs2>
        <v-layout d-block>
          <p>Pierwszy</p>
          <p>Drugi</p>
        </v-layout>
      </v-flex>
      <v-flex xs10>
        <v-layout row>
            <v-select style="max-width:10em" shrink :items="http_methods" solo v-model="method"></v-select>
          <v-text-field placeholder="Url" solo></v-text-field>
          <v-btn raised  large>SEND</v-btn>
        </v-layout>
        <v-tabs v-model="activeTab" color="green" dark slider-color="grey">
          <v-tab>Params</v-tab>
          <v-tab>Authorization</v-tab>
          <v-tab>Headers</v-tab>
          <v-tab>Body</v-tab>

          <v-tab-item v-for="n in 3" :key="n">
            <v-card flat>
              <v-card-text>{{ n }}</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>a</v-card-text>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
    <!-- </v-container> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      activeTab: 2,
      http_methods: ["GET", "POST", "PUT","HEAD","DELETE","OPTIONS"],
      method: "POST"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
