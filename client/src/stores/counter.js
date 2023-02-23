import { defineStore } from 'pinia';
import axios from 'axios';

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    dataFood: [],
    dataDes: [],
  }),
  actions: {
    async getFood() {
      const result = await axios.get('http://localhost:3000/fastfood');
      this.dataFood = result.data;
    },
    async getDes() {
      const result = await axios.get('http://localhost:3000/desserts');
      this.dataDes = result.data;
    },
    async delData(obj) {
      await axios.delete(`http://localhost:3000/fastfood/${obj.id}`);
      this.getFood();
    },
    async patchData(obj) {
      obj.price = (Number(obj.price) * 1.2).toFixed(2);
      await axios.patch(`http://localhost:3000/fastfood/${obj.id}`, obj);
      this.getFood();
    },
  },
});
