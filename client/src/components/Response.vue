<template>
  <div>
      <v-card>
        <div class="response-header">
          <span>RESPONSE</span>
          <span class="flex-spacer"></span>
          <span class="status-code">
            Status:
            <span class="response-value">{{response.status||'-'}} {{response.statusText||'-'}}</span>
            Time: {{response.time||'-'}} ms Length: {{response.length||'-'}} B
          </span>
        </div>
        <v-tabs v-model="activeTab" color="blue" dark slider-color="grey">
          <v-tab>Body</v-tab>
          <v-tab disabled>Cookies</v-tab>
          <v-tab>Headers</v-tab>

          <v-tab-item>
            <v-card class="mono">
              <v-card-text>
                <pre class="wrapped">{{typeof response.body=="object" ?JSON.stringify(response.body,null,2):response.body}}
                </pre>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>Cookies</v-tab-item>
          <v-tab-item>
            <v-card>
              <v-card-text>
                <div v-for="(value,key) in response.headers" :key="key">{{key}} : {{value}}</div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
  </div>
</template>

<script>
export default {
  props: ["response"],
  data: () => ({
    activeTab: 0,
  })
};
</script>

<style scoped>
.mono {
  font-family: monospace;
}
.wrapped {
  word-break: break-all;
  white-space: pre-wrap;
  /* overflow-x: auto; */
}
.response-header {
  padding: 12px;
  display: flex;
}
.flex-spacer {
  flex-grow: 1;
}
.response-value {
  color: lightgreen;
}

</style>
