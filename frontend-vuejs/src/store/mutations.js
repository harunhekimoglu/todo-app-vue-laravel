import { setItem } from "@utils/crypto";

const mutations = {
  setUser: (state, payload) => {
    state.user = payload;
    setItem("user", payload);
  },
  updateUser: (state, payload) => {
    payload.token = {
      type: state.user.token.type,
      value: state.user.token.value,
    };
    state.user = payload;
    setItem("user", payload);
  },
};

export default mutations;
