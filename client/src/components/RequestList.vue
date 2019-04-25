<template>
        <v-card class="containing">
          <div class="item" @click="handleItemClick" v-for="(val,key) in list" :data-item="key" :key="key"> <span class="method">{{val.method}}</span> {{val.url}}</div>
        </v-card>
</template>

<script>
export default {
 props:["list"],
 methods:{
   handleItemClick(event){
     let item=event.currentTarget.dataset.item;
     this.$emit('select-from-list',item);
    //  console.log(this.list[item])
   }
 }
}
</script>

<style scoped>
 div.item {
   overflow-wrap: break-word;
   font-size: 0.9em;
 }
 div.containing {
   margin-right: 2px;
   padding: 5px;
 }
</style>
