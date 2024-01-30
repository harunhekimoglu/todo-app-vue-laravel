import router from "@router";

import axiosClient from "@utils/axiosClient";

const axiosCatch = (error, commit) => {
  if (error.response?.status === 401) {
    commit("setUser", {});
    router.push({ name: "AuthLogin" });
  }
  if (error.response?.status === 419) {
    location.reload();
  }
  return error;
};

const csrfCookie = async () => {
  const axiosOptions = {
    url: "/auth/csrf-cookie",
    method: "GET",
  };
  return await axiosClient(axiosOptions).catch((error) => {
    return axiosCatch(error, commit);
  });
};

const actions = {
  register: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/auth/register",
      method: "POST",
      data: payload,
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (response.data?.data?.token && response.data?.data?.user) {
          commit("setUser", {
            token: response.data.data.token,
            data: response.data.data.user,
          });
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  login: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/auth/login",
      method: "POST",
      data: payload,
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (response.data?.data?.token && response.data?.data?.user) {
          commit("setUser", {
            token: response.data.data.token,
            data: response.data.data.user,
          });
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  forgotPassword: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/auth/forgot-password",
      method: "POST",
      data: payload,
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (!response.data?.error) {
          return {
            status: response.data.status,
            error: false,
          };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  resetPassword: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/auth/reset-password",
      method: "POST",
      data: payload,
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (!response.data?.error) {
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  logout: async ({ commit }) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/auth/logout",
      method: "POST",
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (!response.data?.error) {
          commit("setUser", {});
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  updateUser: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/user/profile/update",
      method: "PUT",
      data: payload,
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (response.data?.data?.user) {
          commit("updateUser", {
            data: response.data.data.user,
          });
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  updateUserPassword: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/user/profile/update-password",
      method: "PUT",
      data: payload,
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (!response.data?.error) {
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  deleteUser: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/user/profile",
      method: "PUT",
      data: payload,
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (!response.data?.error) {
          commit("setUser", {});
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  getTodos: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/todos?filter[is_done]=" + payload,
      method: "GET",
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        return response.data || [];
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  getTodo: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/todos/" + payload,
      method: "GET",
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        return response.data || null;
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  updateTodo: async ({ commit }, payload) => {
    const id = payload.id;

    const method = id ? "put" : "post";
    const url = "/todos/" + (id || "");

    delete payload.id;

    await csrfCookie();
    const axiosOptions = {
      url,
      method,
      data: payload,
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (!response.data?.error) {
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  deleteTodo: async ({ commit }, payload) => {
    await csrfCookie();
    const axiosOptions = {
      url: "/todos/" + payload,
      method: "DELETE",
    };
    return await axiosClient(axiosOptions)
      .then((response) => {
        if (!response.data?.error) {
          return { error: false };
        }
        return { error: true };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
};

export default actions;
