import axios from "~/plugins/axios";

const state = {
  _tree: {},
  _focus: {
    path: "",
    extensions: ""
  }
};

const getters = {
  tree(state) {
    return state._tree;
  },
  currentPath(state) {
    return state._focus.path;
  },
  currentExtensions(state) {
    return state._focus.extensions;
  }
};

const mutations = {
  setTree(state, tree) {
    state._tree = tree;
  },
  setCurrentType(state, type) {
    state._focus.path = type.path;
    state._focus.extensions = type.extensions;
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
    let ext = "." + path.split(".").pop();
    let current = {
      path: path,
      extensions: ext
    };
    commit("setCurrentType", current);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
