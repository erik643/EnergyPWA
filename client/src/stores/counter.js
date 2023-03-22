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
    // const result2 = await axios.get('/eee');

    // for (const i of result.data) {
    //   let tas = 0;
    //   let ova = 0;
    //   let number = 0;
    //   for (const ii of result2.data) {
    //     if (i.id == ii.id) {
    //       tas += ii.trating;
    //       ova += ii.overall;
    //       number++;
    //     }
    //   }
    //   i.trating = tas / number;
    //   i.arating = ova / number;

    // }

    for (const i of result.data) {
      const result2 = await axios.get(`/review/${i.id}`);
      let number = 0;
      let tas = 0;
      let ova = 0;

      for (const iterator of result2.data.reviews) {
        tas += iterator.taste;
        ova += iterator.overall;
        number++;
      }
      i.trating = tas / number;
      i.arating = ova / number;
    }

    data.value = result.data;
  }

  async function getDetail(id) {
    const result = await axios.get(`/review/${id}`);
    detail.value = result.data;

    // const result = await axios.get('/energy');
    // const result2 = await axios.get('/eee');



  }

  async function addUser(obj) {
    const result = await axios.post(`/user/`, obj);
    profile.value = result.data;
  }
  async function delrev(id, curr) {
    await axios.delete(`/img/${id}`);
    getDetail(curr);
  }
  async function getAllUsers() {
    const result = await axios.get('/users');
    const usernames = result.data.map((user) => user.username);
    check.value = usernames;
  }

  async function loginUser(obj) {
    const result = await axios.patch('/user', obj);
    profile.value = result.data;
    console.log(profile.value);
  }

  return {
    profile,
    data,
    getData,
    detail,
    getDetail,
    addUser,
    check,
    getAllUsers,
    loginUser,
    delrev,
  };
});
