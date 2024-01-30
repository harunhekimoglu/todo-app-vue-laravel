<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import PageComponent from "@view/Components/Auth/PageComponent.vue";

const store = useStore();
const router = useRouter();

const ENV_PROD = import.meta.env.PROD;

const registerForm = ref({
  name: ENV_PROD ? "" : "John Doe",
  email: ENV_PROD ? "" : "john.doe@example.com",
  password: ENV_PROD ? "" : "Password123!",
  password_confirmation: ENV_PROD ? "" : "Password123!",
});
const registerFormErrors = ref({
  header: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const registerFormButton = ref(true);

const clearRegisterForm = () => {
  registerForm.value = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  registerFormButton.value = true;
};
const clearRegisterFormErrors = () => {
  registerFormErrors.value = {
    header: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
};

const handleRegisterForm = async () => {
  if (registerFormButton.value) {
    clearRegisterFormErrors();
    registerFormButton.value = false;

    return await store
      .dispatch("register", registerForm.value)
      .then((response) => {
        if (response.response?.data?.errors) {
          for (const [oKey, oValue] of Object.entries(
            response.response.data.errors
          )) {
            if (oKey in registerFormErrors.value) {
              registerFormErrors.value[oKey] =
                oValue.length > 0 ? oValue.join("<br>") : "";
            }
          }
        } else if (!response.error) {
          clearRegisterForm();
          router.push({ name: "Base" });
        } else {
          registerFormErrors.value.header = "Oops. Something went wrong.";
        }
        registerFormButton.value = true;
        return;
      });
  }
};
</script>

<template>
  <PageComponent title="Register for new account">
    <form class="space-y-4" @submit.prevent="handleRegisterForm">
      <div
        v-if="registerFormErrors.header"
        v-html="registerFormErrors.header"
        class="text-xs bg-red-500 text-white px-2 py-3 rounded"
      ></div>

      <div>
        <label
          for="name"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Name Surname
        </label>
        <div class="mt-2">
          <input
            v-model.trim="registerForm.name"
            id="name"
            type="text"
            autocomplete="name"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div
          v-if="registerFormErrors.name"
          v-html="registerFormErrors.name"
          class="text-xs text-red-500 mt-1"
        ></div>
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
            v-model.trim="registerForm.email"
            id="email"
            type="email"
            autocomplete="email"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div
          v-if="registerFormErrors.email"
          v-html="registerFormErrors.email"
          class="text-xs text-red-500 mt-1"
        ></div>
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
            v-model.trim="registerForm.password"
            id="password"
            type="password"
            autocomplete="current-password"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div
          v-if="registerFormErrors.password"
          v-html="registerFormErrors.password"
          class="text-xs text-red-500 mt-1"
        ></div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password_confirmation"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Password Confirmation
          </label>
        </div>
        <div class="mt-2">
          <input
            v-model.trim="registerForm.password_confirmation"
            id="password_confirmation"
            type="password"
            autocomplete="current-password_confirmation"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div
          v-if="registerFormErrors.password_confirmation"
          v-html="registerFormErrors.password_confirmation"
          class="text-xs text-red-500 mt-1"
        ></div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="!registerFormButton"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-indigo-600 disabled:opacity-75"
        >
          Register
        </button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Already a member?
      <router-link
        :to="{ name: 'AuthLogin' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        Login to your account
      </router-link>
    </p>
  </PageComponent>
</template>
