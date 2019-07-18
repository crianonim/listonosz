<template>
<div>
  <v-toolbar dense>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
    <v-toolbar-title>Request History</v-toolbar-title>
    <v-spacer></v-spacer>
     <v-icon @click="toggleBookmarkOnly" data-type="unmark-item" class="shrink" v-if="bookmarkedOnly" small>favorite</v-icon>
        <v-icon @click="toggleBookmarkOnly" data-type="bookmark-item" class="shrink" v-if="!bookmarkedOnly" small>favorite_border</v-icon>
  </v-toolbar>
  <v-card class="containing">
    <v-card
      class="item mb-1"
      :class="{bookmarked:val.bookMarked}"
      v-for="(val,key) in filteredList"
      :data-item="key"
      :data-id="val.id"
      :key="val.id"
    >
      <v-flex class="request-row" :data-item="key" :data-id="val.id">
        <v-icon @click="handleIdClick" data-type="unmark-item" class="shrink" v-if="val.bookMarked" small>favorite</v-icon>
        <v-icon @click="handleIdClick" data-type="bookmark-item" class="shrink" v-if="!val.bookMarked" small>favorite_border</v-icon>

        <span class="method grow">{{val.method}}</span>
        <v-icon @click="handleIdClick" data-type="delete-item" class="shrink" small>delete</v-icon>
      </v-flex>

      <div @click="handleItemClick" data-type="select-from-list" class="url">{{val.url}}</div>
    </v-card>
  </v-card>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data(){
    return {
      bookmarkedOnly:false
    }
  },
  computed:{
    filteredList(){
      return this.bookmarkedOnly?this.list.filter(el=>el.bookMarked):this.list;
    }
  },
  methods: {
    toggleBookmarkOnly(){
      this.bookmarkedOnly=!this.bookmarkedOnly;
    },
    handleItemClick(event) {
      let item = event.currentTarget.parentElement.dataset.item;

      this.$emit(event.currentTarget.dataset.type, item);
    },
    handleIdClick(event) {
      let id = event.currentTarget.parentElement.dataset.id;
      this.$emit(event.currentTarget.dataset.type, id);
    }
  }
};
</script>

<style scoped>
.item {
  overflow-wrap: break-word;
  font-size: 0.9em;
  padding: 5px;
}
div.containing {
  margin-right: 2px;
  padding: 5px;
}
.bookmarked {
  font-weight: bold;
}
.url,
i {
  cursor: pointer;
}
.request-row {
  display: flex;
}
.method,
.url {
  text-align: center;
}
</style>
