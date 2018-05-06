import axios from "~/plugins/axios";

const state = {
  _tree: {},
  _focus: ""
};

const getters = {
  tree(state) {
    return state._tree;
  },
  currentPath(state) {
    return state._focus;
  },
  currentPathIdx(state, getters, rootState) {
    let n = 2;
    for (let [index, obj] of rootState.items._items.entries()) {
      let a = obj.imageURL.split("/").slice(-n);
      let b = state._focus.split("/").slice(-n);
      let flag = true;
      for (let i = 0; i < n; i++) {
        if (a[i] !== b[i]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        return index;
      }
    }
    return -1;
  }
};

const mutations = {
  setTree(state, tree) {
    state._tree = tree;
  },
  setCurrentPath(state, path) {
    state._focus = path;
  }
};

const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("getTree");
  },
  async getTree({ commit }) {
    let { data } = await axios.get("/api/tree");
    commit("setTree", data);
  },
  currentPath({ commit }, path) {
    commit("setCurrentPath", path);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
