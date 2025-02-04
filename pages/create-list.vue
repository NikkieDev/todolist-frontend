<script lang="ts" setup>
import axios from 'axios'

let listName = ref('');

async function createList() {
  if (listName.value.length <= 0) {
    return; 
  }
  console.log('submit');

  const response = await axios.post('/api/create-list', {
    name: listName.value
  });
}
</script>

<template>
  <input name="Listname" v-model="listName">
  <button @click="createList()">Submit</button>
</template>