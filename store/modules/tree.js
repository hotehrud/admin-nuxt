import axios from "~/plugins/axios";

const state = {
  _tree: {}
};

const getters = {
  tree(state) {
    return state._tree;
  }
};

const mutations = {
  setTree(state, item) {
    state._tree = item;
  }
};

const actions = {
  async getTree({ commit }) {
    let { data } = await axios.get("/api/tree");
    commit("setTree", data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
