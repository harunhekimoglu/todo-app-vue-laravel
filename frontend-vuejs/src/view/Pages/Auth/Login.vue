<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import PageComponent from "@view/Components/Auth/PageComponent.vue";

const store = useStore();
const router = useRouter();

const ENV_PROD = import.meta.env.PROD;

const loginForm = ref({
  email: ENV_PROD ? "" : "john.doe@example.com",
  password: ENV_PROD ? "" : "Password123!",
  remember: !ENV_PROD,
});
const loginFormErrors = ref({
  header: "",
  email: "",
});
const loginFormButton = ref(true);

const clearLoginForm = () => {
  loginForm.value = {
    email: "",
    password: "",
    remember: false,
  };
  loginFormButton.value = true;
};
const clearLoginFormErrors = () => {
  loginFormErrors.value = {
    header: "",
    email: "",
  };
};

const handleLoginForm = async () => {
  if (loginFormButton.value) {
    clearLoginFormErrors();
    loginFormButton.value = false;

    return await store.dispatch("login", loginForm.value).then((response) => {
      if (response.response?.data?.errors) {
        for (const [oKey, oValue] of Object.entries(
          response.response.data.errors
        )) {
          if (oKey in loginFormErrors.value) {
            loginFormErrors.value[oKey] =
              oValue.length > 0 ? oValue.join("<br>") : "";
          }
        }
      } else if (!response.error) {
        clearLoginForm();
        router.push({ name: "Base" });
      } else {
        loginFormErrors.value.header = "Oops. Something went wrong.";
      }
      loginFormButton.value = true;
      return;
    });
  }
};
</script>

<template>
  <PageComponent title="Login to your account">
    <form class="space-y-4" @submit.prevent="handleLoginForm">
      <div
        v-if="loginFormErrors.header"
        class="text-xs bg-red-500 text-white px-2 py-3 rounded"
      >
        {{ loginFormErrors.header }}
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Email Address
        </label>
        <div class="mt-2">
          <input
            v-model.trim="loginForm.email"
            id="email"
            type="email"
            autocomplete="email"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div v-if="loginFormErrors.email" class="text-xs text-red-500 mt-1">
          {{ loginFormErrors.email }}
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div class="mt-2">
          <input
            v-model.trim="loginForm.password"
            id="password"
            type="password"
            autocomplete="current-password"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              v-model="loginForm.remember"
              id="remember"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div class="text-sm">
            <router-link
              :to="{ name: 'AuthForgotPassword' }"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </router-link>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="!loginFormButton"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-indigo-600 disabled:opacity-75"
        >
          Login
        </button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <router-link
        :to="{ name: 'AuthRegister' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Register for new account
      </router-link>
    </p>
  </PageComponent>
</template>
