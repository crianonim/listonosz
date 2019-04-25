<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs2>
        <request-list @select-from-list="handleSelectFromList" :list="list"></request-list>
      </v-flex>

      <v-flex xs10>
        <div :class="{invisible:!requestPending}"> Request pending: {{requestPending||'none'}} </div>
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
import Config from "../../../listonosz.config.js"
export default {
  components: { Request, Response, RequestList },
  methods: {
    handleSelectFromList(id) {
      let item = this.list[id];
       item.headers = JSON.parse(item.headers);
       let {method,url,headers,body}=item
      this.request={method,url,headers,body};
    },
    async handleRequest(request) {
      //   this.request=request;
      let result;
      try {
        let data = this.request;
        this.error=null;
        // if (body == "none") ({ body, ...data } = data);
        //DB stuff
        let newListItem=JSON.parse(JSON.stringify(data));
        // newListItem.headers=JSON.stringify(newListItem.headers)
        this.list.unshift(newListItem) ;
        this.requestPending=data.method+" "+data.url;
        let requestId=Date.now();
        data.requestId=requestId;
        this.requestId=requestId;
        // let {protocol,hostname,pathname}=window.location;
        // let url=protocol+"//"+hostname+":"+Config.port+pathname+"service"
        console.log("URL",this.serviceUrl)
        result = await Axios({
          
          // url:window.location.origin+window.location.pathname+'service',
         // url: "http://localhost:"+Config.port+"/"+Config.mountpath+"/service",
          // url: "http://localhost:3130/listonosz/service", //PORT
          url:this.serviceUrl, 
          method: "post",
          data
        });
        this.requestPending='';
         result = result.data;
          console.log("RESULT",result)
        if (result.requestId!=this.requestId){
          console.log("Different IDs",this.requestId,result.requestId)
        } else {
        this.response = result;

        }
        //   this.response=result.data.response;
        // this.error = result.error;
        //   this.request=result.request;
      } catch (err) {
        this.error = err;
        // this.error=typeof result.request;
      }
      //    console.log(request);
      //   this.error=JSON.stringify(request)
    },
    getList() {
      // let url=window.location.origin+window.location.pathname+'service';
      console.log(this.serviceUrl)
      return Axios.get( this.serviceUrl);//?limit=12
      // return Axios.get("http://localhost:"+3130+"/service"); // PORT

      //   console.log(typeof result, result);
    }
  },
  
  data: () => ({
    activeTab: 3,
    requestPending:'',
    serviceUrl:location.protocol+"//"+location.hostname+":"+Config.port+location.pathname+"service",
    activeTabResponse: 0,
    http_methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"],
    error: "",
    requestId:null,
    
    // error:"",
    request: {
      headers: [{ "Content-Type": "application/json" }],
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
      body: JSON.stringify({ url: "http://onet.pl", time: 1223123 }, null, 2),
      bodyType:"raw",
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
.invisible {
  visibility: hidden;
}
</style>
