import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCounterStore = defineStore('counter', () => {
  const data = ref([]);

  async function getData() {
    const result = await axios.get('/energy');
    data.value = result.data;
    console.log(this.data)
  }
  // async function getDetail(id) {
  //   const result = await axios.get(`/energy?id=${id}`);
  //   detail.value = result.data;
  // }

  return { data, getData };
});
