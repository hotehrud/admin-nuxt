import axios from "~/plugins/axios";

const state = {
  _items: [],
  _item: {}
};

const getters = {
  items(state) {
    return state._items;
  },
  item(state) {
    return state._item;
  }
};

const mutations = {
  setItems(state, items) {
    state._items = items;
  },
  setItem(state, item) {
    state._item = item;
  }
};

const actions = {
  async getItems({ commit }) {
    let { data } = await axios.get("/api/items");
    commit("setItems", data);
  },
  async getItem({ commit, store }, id) {
    let { data } = await axios.get("/api/items/" + id);
    commit("setItem", data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
