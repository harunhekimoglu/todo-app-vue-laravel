import { createStore } from "vuex";

import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import modules from "./modules";

const store = createStore({
  state,
  getters,
  actions,
  mutations,
  modules,
});

export default store;
