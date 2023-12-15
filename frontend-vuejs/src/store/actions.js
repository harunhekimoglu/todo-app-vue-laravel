import axiosClient from "@utils/axiosClient";

function csrfCookie() {
  axiosClient.get("/auth/csrf-cookie");
}

function axiosCatch(error, commit) {
  if (error.response?.status === 401) {
    commit("setUser", {});
    return;
  }
  if (error.response?.status === 419) {
    location.reload();
    return;
  }
  return error;
}

const actions = {
  register: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .post("/auth/register", payload)
      .then((response) => {
        if (response.data?.data?.token && response.data?.data?.user) {
          commit("setUser", {
            token: response.data.data.token,
            data: response.data.data.user,
          });
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  login: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .post("/auth/login", payload)
      .then((response) => {
        if (response.data?.data?.token && response.data?.data?.user) {
          commit("setUser", {
            token: response.data.data.token,
            data: response.data.data.user,
          });
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  forgotPassword: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .post("/auth/forgot-password", payload)
      .then((response) => {
        if (!response.data?.error) {
          return {
            status: response.data.status,
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  resetPassword: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .post("/auth/reset-password", payload)
      .then((response) => {
        if (!response.data?.error) {
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  logout: ({ commit }) => {
    csrfCookie();
    return axiosClient
      .post("/auth/logout")
      .then((response) => {
        if (!response.data?.error) {
          commit("setUser", {});
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  updateUser: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .put("/user/profile/update", payload)
      .then((response) => {
        if (response.data?.data?.user) {
          commit("updateUser", {
            data: response.data.data.user,
          });
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  updateUserPassword: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .put("/user/profile/update-password", payload)
      .then((response) => {
        if (!response.data?.error) {
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  deleteUser: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .put("/user/profile", payload)
      .then((response) => {
        if (!response.data?.error) {
          commit("setUser", {});
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  getTodos: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .get("/todos?filter[is_done]=" + payload)
      .then((response) => {
        return response.data || [];
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  getTodo: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .get("/todos/" + payload)
      .then((response) => {
        return response.data || null;
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  updateTodo: ({ commit }, payload) => {
    const id = payload.id;

    const method = id ? "put" : "post";
    const url = "/todos/" + (id || "");

    delete payload.id;

    csrfCookie();
    return axiosClient({ url, data: payload, method })
      .then((response) => {
        if (!response.data?.error) {
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
  deleteTodo: ({ commit }, payload) => {
    csrfCookie();
    return axiosClient
      .delete("/todos/" + payload)
      .then((response) => {
        if (!response.data?.error) {
          return {
            error: false,
          };
        }
        return {
          error: true,
        };
      })
      .catch((error) => {
        return axiosCatch(error, commit);
      });
  },
};

export default actions;
