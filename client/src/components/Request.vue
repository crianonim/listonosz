<template>
  <div>
    <v-toolbar dense>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>New REQUEST</v-toolbar-title>
      <v-spacer/>
      <div :class="{invisible:!pending}">Request pending: {{pending||'none'}}</div>
    </v-toolbar>
    <v-layout>
      <v-select
        hide-details
        style="max-width:10em"
        shrink
        :items="http_methods"
        solo
        flat
        v-model="request.method"
      ></v-select>
      <v-text-field
        @keyup.enter="sendRequest"
        placeholder="Url"
        solo
        flat
        v-model="request.url"
        hide-details
      ></v-text-field>
      <v-btn
        @click="sendRequest"
        large
        flat
        dark
        style="height:48px"
        class="lime mt-0 mb-0 mr-0"
      >SEND</v-btn>
    </v-layout>

    <v-alert type="error" :value="error">{{error}}</v-alert>

    <v-tabs v-model="activeTab" color="green" dark slider-color="grey">
      <v-tab>Params ({{request.params.length}})</v-tab>
      <v-tab>Authorization</v-tab>
      <v-tab>Headers ({{request.headers.length}})</v-tab>
      <v-tab>Body</v-tab>

      <v-tab-item lazy>
        <v-card flat>
           <basic-key-value  @removeEntry="removeParam" :entries="request.params"></basic-key-value>
           <v-btn color="primary" @click="addParam">Add Param</v-btn>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
          <h2>Add Basic Auth Header</h2>
          <div class="auth-data-row">
           <v-text-field label="Username" clearable v-model="auth_username"></v-text-field>
           <v-text-field label="Password" clearable v-model="auth_password"></v-text-field>
          </div>
           <v-btn @click="createAuthHeader">Create header</v-btn>
           <span v-if="auth_encoded">Authorization: Basic {{auth_encoded}}</span>
        </v-card>
      </v-tab-item>
     
      <v-tab-item lazy> <!-- lazy seems to fix my expanding errors-->
        <v-card flat >
          <basic-key-value  @removeEntry="removeHeader" :entries="request.headers"></basic-key-value>
          <div class="flex-container">
            <v-btn color="primary" @click="addHeader">Add Header</v-btn>
            <v-select
              hide-details
              style="flex-grow:1"
              shrink
              :items="request_headers_examples"
              flat
              v-model="add_example_header"
            ></v-select>
          </div>
          <!-- <p v-for="(header,key) in request.headers" :key="key">{{header}}</p> -->
        </v-card>
      </v-tab-item>

      

      <v-tab-item>
        <v-radio-group v-model="request.bodyType" row>
          <v-radio label="none" value="none"></v-radio>
          <v-radio disabled label="form-data" value="form"></v-radio>
          <v-radio disabled label="x-www-form-urlencoded" value="www"></v-radio>
          <v-radio label="raw" value="raw"></v-radio>
          <!-- select format, json sets header -->
          <v-radio disabled label="binary" value="binary"></v-radio>
          <!-- select file -->
        </v-radio-group>
        <v-textarea
          solo
          :disabled="request.bodyType=='none'"
          class="mono"
          spellcheck="false"
          v-model="request.body"
        ></v-textarea>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { request } from "http";
import BasicKeyValue from "./BasicKeyValue.vue";
export default {
  components: { BasicKeyValue },
  props: ["request", "error", "pending"],
  data: () => ({
    activeTab: 3,
    http_methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS", "PATCH"],
    request_headers_examples: [
      "",
      "Accept",
      "Accept-Language",
      "Accept-Encoding",
      "Authorization"
    ],
    add_example_header: "",
    auth_username:"",
    auth_password:"",
    auth_encoded:"",
  }),
  methods: {
    sendRequest() {
      // console.log("Will send up",this.request)
      this.$emit("send-request", this.request);
    },
    addHeader() {
      this.request.headers = this.request.headers.concat([
        [this.add_example_header, ""]
      ]);
    },
    removeHeader(id) {
      this.request.headers = this.request.headers.filter(
        (header, i) => i != id
      );
    },
    addParam() {
      this.request.params = this.request.params.concat([
        ["", ""]
      ]);
    },
    removeParam(id) {
      this.request.params = this.request.params.filter(
        (param, i) => i != id
      );
    },
    createAuthHeader(){
      this.auth_encoded=btoa(this.auth_username+":"+this.auth_password);
      this.request.headers=this.request.headers.concat([["Authorization","Basic "+this.auth_encoded]])
    },
  }
};
</script>

<style scoped>
.mono {
  font-family: monospace;
}
.response-header {
  padding: 12px;
  display: flex;
  border: 1px solid #b3d4fc;
  /* background-color: #82b1ff33; */
}
.flex-spacer {
  flex-grow: 1;
}
.response-value {
  color: lightgreen;
}
.invisible {
  visibility: hidden;
}
ul {
  list-style: none;
}
.header__item {
  display: flex;
}
.header__item > span {
  flex-grow: 1;
  padding: 0 1em;
}
.flex-container {
  display: flex;
}
.auth-data-row {
  display: flex;
  padding: 1em;
}
.auth-data-row > * {
  padding: 0 1em;
}
h2 {
  text-transform: uppercase;
  font-size: 1.2rem;
  padding: 1rem;
}

</style>
