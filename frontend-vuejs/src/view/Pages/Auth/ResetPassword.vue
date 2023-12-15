<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import PageComponent from "@view/Components/Auth/PageComponent.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

if (!route.params.token || !route.query.email) {
  router.push({ name: "AuthForgotPassword" });
}

const resetPasswordForm = ref({
  token: route.params.token,
  email: route.query.email,
  password: "",
  password_confirmation: "",
});
const resetPasswordFormErrors = ref({
  header: "",
  password: "",
  password_confirmation: "",
});
const resetPasswordFormButton = ref(true);

function clearResetPasswordForm() {
  resetPasswordForm.value = {
    password: "",
    password_confirmation: "",
  };
  resetPasswordFormButton.value = true;
}
function clearResetPasswordFormErrors() {
  resetPasswordFormErrors.value = {
    header: "",
    password: "",
    password_confirmation: "",
  };
}

function handleResetPasswordForm() {
  if (resetPasswordFormButton.value) {
    clearResetPasswordFormErrors();
    resetPasswordFormButton.value = false;

    store
      .dispatch("resetPassword", resetPasswordForm.value)
      .then((response) => {
        if (response.response?.data?.errors) {
          for (const [oKey, oValue] of Object.entries(
            response.response.data.errors
          )) {
            if (oKey in resetPasswordFormErrors.value) {
              resetPasswordFormErrors.value[oKey] =
                oValue.length > 0 ? oValue.join("<br>") : "";
            }
          }
        } else if (!response.error) {
          clearResetPasswordForm();
          router.push({ name: "AuthLogin" });
        } else {
          resetPasswordFormErrors.value.header = "Oops. Something went wrong.";
        }
        resetPasswordFormButton.value = true;
        return;
      });
  }
}
</script>

<template>
  <PageComponent title="Reset password">
    <form class="space-y-4" @submit.prevent="handleResetPasswordForm">
      <div
        v-if="resetPasswordFormErrors.header"
        class="text-xs bg-red-500 text-white px-2 py-3 rounded"
      >
        {{ resetPasswordFormErrors.header }}
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
            v-model.trim="resetPasswordForm.password"
            id="password"
            type="password"
            autocomplete="current-password"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div
          v-if="resetPasswordFormErrors.password"
          v-html="resetPasswordFormErrors.password"
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
            v-model.trim="resetPasswordForm.password_confirmation"
            id="password_confirmation"
            type="password"
            autocomplete="current-password_confirmation"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div
          v-if="resetPasswordFormErrors.password_confirmation"
          v-html="resetPasswordFormErrors.password_confirmation"
          class="text-xs text-red-500 mt-1"
        ></div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="!resetPasswordFormButton"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-indigo-600 disabled:opacity-75"
        >
          Reset Password
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
