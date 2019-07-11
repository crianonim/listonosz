<template>
  <div>
    <v-toolbar dense>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>New REQUEST</v-toolbar-title>
      <v-spacer />
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
      <v-tab disabled>Params</v-tab>
      <v-tab disabled>Authorization</v-tab>
      <v-tab>Headers ({{request.headers.length}})</v-tab>
      <v-tab>Body</v-tab>

      <v-tab-item v-for="n in 2" :key="n">
        <v-card flat>
          <v-card-text>{{ n }}</v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
         
          <v-card-text>
            <ul>
              <li v-for="(header,key) in request.headers" :key="key" class="header__item">
                <span v-for="(value,key2) in header" :key="key2">
                  <v-text-field v-model="request.headers[key][key2]"></v-text-field>
                </span>
              </li>
             </ul>
              <v-btn @click="addHeader">Add Header</v-btn>
            <!-- <p v-for="(header,key) in request.headers" :key="key">{{header}}</p> -->
          </v-card-text>
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
export default {
  props: ["request", "error", "pending"],
  data: () => ({
    activeTab: 3,
    http_methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS", "PATCH"],
  }),
  methods: {
    sendRequest() {
      // console.log("Will send up",this.request)
      this.$emit("send-request", this.request);
    },
    addHeader() {
      this.request.headers = this.request.headers.concat([["", ""]]);
    }
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
</style>
