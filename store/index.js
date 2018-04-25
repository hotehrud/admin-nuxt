import Vuex from "vuex";
import items from "./modules/items";

export default () =>
  new Vuex.Store({
    modules: {
      items
    }
  });
