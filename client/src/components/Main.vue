<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs2>
        <request-list
          @delete-item="deleteItemFromList"
          @bookmark-item="bookmarkFromList"
          @unmark-item="unmarkFromList"
          @select-from-list="handleSelectFromList"
          :list="list"
        ></request-list>
      </v-flex>
      <v-flex xs10>
        <request
          @send-request="handleRequest"
          :pending="requestPending"
          :request="request"
          :error="error"
        ></request>
        <response :response="response"></response>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Request from "./Request.vue";
import Response from "./Response.vue";
import RequestList from "./RequestList.vue";
import Axios from "axios";
export default {
  components: { Request, Response, RequestList },
  methods: {
    handleSelectFromList(id) {
      let item = JSON.parse(JSON.stringify(this.list[id]));
      let { method, url, headers, body, bodyType, params = [] } = item;
      headers = this.headersObject2Array(headers);
      this.request = { method, url, headers, body, bodyType, params };
    },
    deleteItemFromList(id) {
      console.log("DEL ", id);
      this.list = this.list.filter(item => item.id != id);
      this.saveHistory();
    },
    bookmarkFromList(id) {
      console.log("BOOK ", id);
      let item = this.list.find(item => item.id == id);
      if (item) {
        item.bookMarked = !item.bookMarked;
      }
      this.saveHistory();
    },
    unmarkFromList(id) {
      this.bookmarkFromList(id);
    },
    headersArray2Object(headers) {
      return headers.reduce((acc, cur) => {
        acc[cur[0]] = cur[1];
        return acc;
      }, {});
    },
    headersObject2Array(headers) {
      return Object.entries(headers);
    },
    async handleRequest() {
      let result;
      let data = Object.assign({}, this.request);
      console.log(data, this.request);
      data.headers = this.headersArray2Object(this.request.headers);
      let paramsString = "";

      if (data.params.length) {
        paramsString =
          "?" + data.params.map(param => param.join("=")).join("&");
      }
      console.log("PARAMS", data.params, { paramsString });

      
      console.log(
        "HEADERS",
        data.headers == this.request.headers,
        data.headers,
        this.request.headers
      );
      try {
        this.error = null;
        this.requestPending = data.method + " " + data.url;
        let requestId = Date.now();
        data.requestId = requestId;
        this.requestId = requestId;
        console.log("URL", this.serviceUrl);
        this.saveRequestToHistory(data);
        data.url += paramsString;
        result = await Axios({
          url: this.serviceUrl,
          method: "post",
          data
        });

        this.requestPending = "";
        result = result.data;

        if (result.requestId != this.requestId) {
          console.log("Different IDs", this.requestId, result.requestId);
        } else {
          this.response = result;
        }
      } catch (err) {
        console.log("ERROR", err, err.stack);
        this.error = err;
      } finally {
      }
    },
    
    saveRequestToHistory(req) {
      let { requestId, ...toSave } = req;
      let toSaveString = JSON.stringify(toSave);
      let unique = this.list.map((item)=>{
        let {bookMarked,id,...rest} = item;
         return JSON.stringify(rest)
      })
      .every((itemString)=>{
        // console.log("EX",itemString);
        // console.log("NE",toSaveString,itemString==toSaveString)
        return itemString!=toSaveString
        });
      console.log("IS UNIQUE?",unique);
      if (!unique) return;
      toSave.bookMarked = false;
      toSave.id = ++this.historyIdMax;
      this.list = [toSave].concat(this.list);
      this.saveHistory();
      console.log("TO SAVE", toSave);
    },
    saveHistory() {
      localStorage.setItem("history", JSON.stringify(this.list));
    },
    getList() {
      // console.log(this.serviceUrl);
      // return Axios.get(this.serviceUrl); //?limit=12
      this.list = JSON.parse(localStorage.getItem("history") || "[]");
      return this.list;
    }
  },

  data: () => ({
    activeTab: 3,
    requestPending: "",
    serviceUrl: location.origin + "/service",
    activeTabResponse: 0,
    http_methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"],
    error: "",
    requestId: null,

    // error:"",
    request: {
      headers: [["Content-Type", "application/json"]],
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
      body: JSON.stringify({ url: "http://onet.pl", time: 1223123 }, null, 2),
      bodyType: "raw",
      params: [["delay", "1"], ["status", "403"]]
    },
    response: {},
    list: [{ method: "" }],
    historyIdMax: 0
  }),
  async mounted() {
    // let result = await this.getList();
    this.getList();
    this.historyIdMax = this.list.reduce(
      (acc, cur) => (cur.id > acc ? cur.id : acc),
      0
    );
    console.log(this.historyIdMax, this.list);
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
}
.flex-spacer {
  flex-grow: 1;
}
.response-value {
  color: lightgreen;
}
</style>
