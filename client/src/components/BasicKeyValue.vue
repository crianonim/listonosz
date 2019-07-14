<template>
    <div>
        <!-- <span v-for="(value,key) in entries" :key="key">{{value}}</span> -->
        <ul>
              <li v-for="(header,key) in entries" :key="key" class="header__item">
                <span v-for="(value,key2) in header" :key="key2">
                  <v-text-field hide-details  class="small-input" clearable v-model="entries[key][key2]"></v-text-field>
                  <v-input v-model="entries[key][key2]"></v-input>
                </span>
                <v-btn @click="removeEntry" :data-header-id="key" small color="error">X</v-btn>
              </li>
            </ul>
    </div>
</template>

<script>
export default {
    props:["entries"],
    methods:{
        removeEntry(event){
            const id=event.currentTarget.dataset.headerId
            console.log("ENTRY BEING REMOVED",id);
            this.$emit('removeEntry',id);
        },
        
    }
}
</script>

<style>
ul {
  list-style: none;
    padding:1em 0;
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
.small-input {
    margin:0;
    padding: 0;
    font-size: 1rem;
}
.header__item .v-messages {
    min-height: 0;
    background-color: gold;
}
</style>
