<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs2>
        <v-layout d-block>
          <p>Pierwszy</p>
          <p>Drugi</p>
        </v-layout>
      </v-flex>

      <v-flex xs10>
        <v-layout row>
          <v-select
            hide-details
            style="max-width:10em"
            shrink
            :items="http_methods"
            solo
            flat
            v-model="request.method"
          ></v-select>
          <v-text-field placeholder="Url" solo flat v-model="request.url" hide-details></v-text-field>
          <v-btn large flat dark style="height:48px" class="green mt-0 mb-0 mr-0">SEND</v-btn>
        </v-layout>

        <v-alert type="error" :value="error">{{error}}</v-alert>

        <v-tabs v-model="activeTab" color="green" dark slider-color="grey">
          <v-tab>Params</v-tab>
          <v-tab>Authorization</v-tab>
          <v-tab>Headers ({{request.headers.length}})</v-tab>
          <v-tab>Body</v-tab>

          <v-tab-item v-for="n in 3" :key="n">
            <v-card flat>
              <v-card-text>{{ n }}</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-radio-group v-model="row" row>
              <v-radio label="none" value="radio-1"></v-radio>
              <v-radio label="form-data" value="radio-2"></v-radio>
              <v-radio label="x-www-form-urlencoded" value="radio-2"></v-radio>
              <v-radio label="raw" value="radio-2"></v-radio>
              <!-- select format, json sets header -->
              <v-radio label="binary" value="radio-2"></v-radio>
              <!-- select file -->
            </v-radio-group>
            <v-textarea solo class="mono" spellcheck="false" v-model="requestBody"></v-textarea>
          </v-tab-item>
        </v-tabs>

        <div class="response-header">
          <span>RESPONSE</span>
          <span class="flex-spacer"></span>
          <span class="status-code">
            Status:
            <span class="response-value">{{response.statusCode}} {{response.statusText}}</span>
            Time: {{response.time}} ms Length: {{response.length}} B
          </span>
        </div>
        <v-tabs v-model="activeTabResponse" color="blue" dark slider-color="grey">
          <v-tab>Body</v-tab>
          <v-tab>Cookies</v-tab>
          <v-tab>Headers</v-tab>

          <v-tab-item>
            <v-card class="mono">
              <v-card-text>
                <pre>{{JSON.stringify(response.body,null,2)}}
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
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >{{ next.text }}</a>
        </v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >{{ eco.text }}</a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    activeTab: 3,
    activeTabResponse: 0,
    http_methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"],
    error: "End point not found",
    // error:"",
    request: {
      headers: [{ "Content-Type": "application/json" }],
      url: "http://localhost:3000",
      method: "POST"
    },
    response: {
      length: 2342,
      statusCode: 200,
      statusText: "OK",
      time: 323,
      body: { id: 12, token: "askdlaksjlkj12323", name: "Jan Skowronski" },
      headers: {
        "Content-Type": "application/json",
        "Content-Length": 232323
      }
    },

    requestBody: JSON.stringify(
      { url: "http://wp.pl", time: 1223123 },
      null,
      2
    ),

    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuetifyjs.com"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
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
</style>
