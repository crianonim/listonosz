<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs1>
        <request-list></request-list>
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
import Axios from 'axios';
export default {
  components: { Request,Response,RequestList },
  methods:{
      async handleRequest(request,body){
       //   this.request=request;
       let result
          try{
              let data=this.request;
            if (body=="none") ({body,...data} = data);
              
             result=await Axios({url:"http://localhost:3000/service",method:"post",data})
            result=result.data
            this.response=result.response;
            //   this.response=result.data.response;
              this.error=result.error;
            //   this.request=result.request;
          }
          catch (err){
              this.error=err;
            // this.error=typeof result.request;
          }
    //    console.log(request);
        //   this.error=JSON.stringify(request)
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
    response: {

    }
      
    ,

    // requestBody: JSON.stringify({ url: "http://wp.pl", time: 1223123 }, null, 2)
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
