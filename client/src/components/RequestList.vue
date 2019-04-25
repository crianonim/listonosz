<template>
  <v-card class="containing">
    <v-card
      class="item mb-1"
      :class="{bookmarked:val.bookMarked}"
      v-for="(val,key) in list"
      :data-item="key"
      :data-id="val.id"
      :key="key"
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
</template>

<script>
export default {
  props: ["list"],
  methods: {
    handleItemClick(event) {
      let item = event.currentTarget.parentElement.dataset.item;

      this.$emit(event.currentTarget.dataset.type, item);
      //  console.log(this.list[item])
    },
    handleIdClick(event) {
      let id = event.currentTarget.parentElement.dataset.id;
      // console.log(id, event.currentTarget.parentElement);
      this.$emit(event.currentTarget.dataset.type, id);
      //  console.log(this.list[item])
    }
  }
};
</script>

<style scoped>
.item {
  /* border: 1px solid black; */
  overflow-wrap: break-word;
  font-size: 0.9em;
  padding: 5px;
  /* background: grey; */
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
