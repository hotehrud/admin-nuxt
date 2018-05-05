import Vuex from "vuex";
import items from "./modules/items";
import tree from "./modules/tree";

export default () =>
  new Vuex.Store({
    modules: {
      items,
      tree
    }
  });
