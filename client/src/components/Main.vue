<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs2>
        <request-list @select-from-list="handleSelectFromList" :list="list"></request-list>
      </v-flex>

      <v-flex xs11>
        <request @send-request="handleRequest" :request="request" :error="error"></request>
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
// import Config from "../../../listonosz.config.js"
export default {
  components: { Request, Response, RequestList },
  methods: {
    handleSelectFromList(id) {
      let item = this.list[id];
       item.headers = JSON.parse(item.headers);
       let {method,url,headers,body}=item
      this.request={method,url,headers,body};
    },
    async handleRequest(request, body) {
      //   this.request=request;
      let result;
      try {
        let data = this.request;
        if (body == "none") ({ body, ...data } = data);
        let newListItem=JSON.parse(JSON.stringify(data));
        newListItem.headers=JSON.stringify(newListItem.headers)
        this.list.unshift(newListItem) ;
        result = await Axios({
          url:window.location.origin+window.location.pathname+'service',
         // url: "http://localhost:"+Config.port+"/"+Config.mountpath+"/service",
          // url: "http://localhost:3130/service", //PORT

          method: "post",
          data
        });
        result = result.data;
        this.response = result.response;
        //   this.response=result.data.response;
        this.error = result.error;
        //   this.request=result.request;
      } catch (err) {
        this.error = err;
        // this.error=typeof result.request;
      }
      //    console.log(request);
      //   this.error=JSON.stringify(request)
    },
    getList() {
      let url=window.location.origin+window.location.pathname+'service';
      console.log(url)
      return Axios.get( url);//?limit=12
      // return Axios.get("http://localhost:"+3130+"/service"); // PORT

      //   console.log(typeof result, result);
    }
  },
  data: () => ({
    activeTab: 3,
    activeTabResponse: 0,
    http_methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"],
    error: "",
    // error:"",
    request: {
      headers: [{ "Content-Type": "application/json" }],
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
      body: JSON.stringify({ url: "http://onet.pl", time: 1223123 }, null, 2)
    },
    response: {},
    list: [{ method: "s" }]

    // requestBody: JSON.stringify({ url: "http://wp.pl", time: 1223123 }, null, 2)
  }),
  async mounted() {
    let result = await this.getList();
    this.list = result.data;
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
</style>
