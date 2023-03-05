import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCounterStore = defineStore('counter', () => {
  const data = ref([]);
  const detail = ref({});
  const profile = ref({});
  const check = ref([]);

  async function getData() {
    const result = await axios.get('/energy');
    data.value = result.data;
  }

  async function getDetail(id) {
    const result = await axios.get(`/energy/${id}`);
    detail.value = result.data;
  }

  async function addUser(obj) {
    const result = await axios.post(`/user/`, obj);
    profile.value = result.data;
  }
  async function getAllUsers() {
    const result = await axios.get('/users');
    const usernames = result.data.map((user) => user.username);
    check.value = usernames;
  }

  async function loginUser(obj) {
    const result = await axios.patch('/user', obj);
    profile.value = result.data;

  }

  return { profile, data, getData, detail, getDetail, addUser, check, getAllUsers, loginUser };
});
