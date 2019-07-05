<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs2>
        <request-list 
        @delete-item="deleteItemFromList"
        @bookmark-item="bookmarkFromList"
        @unmark-item="unmarkFromList"
        @select-from-list="handleSelectFromList" :list="list"></request-list>
      </v-flex>
      <v-flex xs10>
        <request @send-request="handleRequest" :pending="requestPending" :request="request" :error="error"></request>
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
       item.headers = JSON.parse(item.headers);
       let {method,url,headers,body,bodyType}=item
      this.request={method,url,headers,body,bodyType};
    },
    deleteItemFromList(id){
      console.log("DEL ",this.serviceUrl+'/'+id)
      Axios.delete( this.serviceUrl+'/'+id).then(res=>{
        console.log(res);
        this.getList().then(result=>{
          this.list = result.data;
        })
      })
    },
    bookmarkFromList(id){
      console.log("BOOK ",this.serviceUrl+'/'+id)
      Axios.put( this.serviceUrl+'/bookmark/'+id).then(res=>{
        console.log(res);
        this.getList().then(result=>{
          this.list = result.data;
        })
      })
    },
    unmarkFromList(id){
      console.log("UNBOOK ",this.serviceUrl+'/'+id)
      Axios.put( this.serviceUrl+'/unmark/'+id).then(res=>{
        console.log(res);
        this.getList().then(result=>{
          this.list = result.data;
        })
      })
    },
    async handleRequest() {
      //   this.request=request;
      let result;
      let data = Object.assign({},this.request);
      // let arrayHeaders=this.request.headers;
      console.log(data,this.request)
      data.headers=this.request.headers.reduce((acc,cur)=>{
        acc[cur[0]]=cur[1];
        return acc;
        },{});
      
      console.log("HEADERS",data.headers==this.request.headers,data.headers,this.request.headers)
      try {
        this.error=null;
        this.requestPending=data.method+" "+data.url;
        let requestId=Date.now();
        data.requestId=requestId;
        this.requestId=requestId;
        console.log("URL",this.serviceUrl)
        result = await Axios({
          url:this.serviceUrl, 
          method: "post",
          data
        });
        
        this.requestPending='';
         result = result.data;
          console.log("RESULT",result)
          this.getList().then(
            list=>this.list=list.data
          )
        if (result.requestId!=this.requestId){
          console.log("Different IDs",this.requestId,result.requestId)
        } else {
        this.response = result;

        }
      } catch (err) {
        this.error = err;
      } finally {
        // this.request.headers=arrayHeaders;
      }
    },
    getList() {
      console.log(this.serviceUrl)
      return Axios.get( this.serviceUrl);//?limit=12
    }
  },
  
  data: () => ({
    activeTab: 3,
    requestPending:'',
    serviceUrl:location.origin+"/service",
    activeTabResponse: 0,
    http_methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "OPTIONS"],
    error: "",
    requestId:null,
    
    // error:"",
    request: {
      headers: [[ "Content-Type","application/json" ]],
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
      body: JSON.stringify({ url: "http://onet.pl", time: 1223123 }, null, 2),
      bodyType:"raw",
    },
    response: {},
    list: [{ method: "s" }]

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
