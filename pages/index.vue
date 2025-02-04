<script setup lang="ts">
import axios from 'axios'

const route = useRoute()
const lists = useFetch('/api/lists').data

enum ItemStatus {
  NEW = 'New',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed',
}

function getStatus(statusInt) {
  switch (statusInt) {
    case 0: return ItemStatus.NEW;
    case 1: return ItemStatus.IN_PROGRESS;
    case 2: return ItemStatus.COMPLETED;
    default: return '';
  }
}

async function createItem(listId) {
  const names = ['Get pizza', 'Clean Oven', 'Repair car'];
  const descriptions = ['Get the pizza from the store', 'Do not use bleach', 'Replace the 12v battery'];

  const response = await axios.post('/api/create-item', {
    data: {
      item_name: names[Math.floor(Math.random()*(names.length))],
      item_description: descriptions[Math.floor(Math.random()*(descriptions.length))],
      list_id: listId
    }
  });
}

async function changeStatus(itemId, status) {
  console.log(`Changing status to ${status} ${getStatus(status)}`);
  try {
    const response = await axios.post('/api/change-status', {
      item: itemId,
      newStatus: status
    });
    console.log("Status changed");
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div class="lists--wrapper" v-for="list in lists">
    <p class="list" @click="createItem(list.id)">{{ list.name }}</p>
    <div class="items" v-for="item in list.items">
      <p class="item">{{ item.name }}</p>
      <label for="status">status:</label>
      <select :value="item.status" v-model="item.status" @change="changeStatus(item.id, parseInt($event.target.value))" name="status">
        <option disabled :value="0">New</option>
        <option :value="1">In progress</option>
        <option :value="2">Completed</option>
      </select>
    </div>
  </div>
</template>
