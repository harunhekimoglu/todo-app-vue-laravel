const getters = {
  getUserTokenType: (state) => {
    return state.user?.token?.type || "";
  },
  getUserTokenValue: (state) => {
    return state.user?.token?.value || "";
  },
  getUserToken: (state) => {
    const userToken =
      (state.user?.token?.type || "") + " " + (state.user?.token?.value || "");
    return userToken.trim();
  },
  getUserData: (state) => {
    return state.user?.data || {};
  },
};

export default getters;
