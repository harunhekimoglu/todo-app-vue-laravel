<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

import PageComponent from "@view/Components/Auth/PageComponent.vue";

const store = useStore();

const forgotPasswordForm = ref({
  email: "",
});
const forgotPasswordFormErrors = ref({
  header: "",
  email: "",
});
const forgotPasswordFormButton = ref(true);
const forgotPasswordFormStatus = ref("");

function clearForgotPasswordForm() {
  forgotPasswordForm.value = {
    email: "",
  };
  forgotPasswordFormButton.value = true;
}
function clearForgotPasswordFormErrors() {
  forgotPasswordFormErrors.value = {
    header: "",
    email: "",
  };
}

function handleForgotPasswordForm() {
  if (forgotPasswordFormButton.value) {
    clearForgotPasswordFormErrors();
    forgotPasswordFormButton.value = false;

    store
      .dispatch("forgotPassword", forgotPasswordForm.value)
      .then((response) => {
        if (response.response?.data?.errors) {
          for (const [oKey, oValue] of Object.entries(
            response.response.data.errors
          )) {
            if (oKey in forgotPasswordFormErrors.value) {
              forgotPasswordFormErrors.value[oKey] =
                oValue.length > 0 ? oValue.join("<br>") : "";
            }
          }
        } else if (!response.error && response.status) {
          // clearForgotPasswordForm();
          forgotPasswordFormStatus.value = response.status;
        } else {
          forgotPasswordFormErrors.value.header = "Oops. Something went wrong.";
        }
        forgotPasswordFormButton.value = true;
        return;
      });
  }
}
</script>

<template>
  <PageComponent title="Reset password">
    <form class="space-y-4" @submit.prevent="handleForgotPasswordForm">
      <div
        v-if="forgotPasswordFormErrors.header"
        class="text-xs bg-red-500 text-white px-2 py-3 rounded"
      >
        {{ forgotPasswordFormErrors.header }}
      </div>

      <div
        v-if="forgotPasswordFormStatus"
        class="text-xs bg-emerald-500 text-white px-2 py-3 rounded"
      >
        {{ forgotPasswordFormStatus }}
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
            v-model.trim="forgotPasswordForm.email"
            id="email"
            type="email"
            autocomplete="email"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div
          v-if="forgotPasswordFormErrors.email"
          class="text-xs text-red-500 mt-1"
        >
          {{ forgotPasswordFormErrors.email }}
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="!forgotPasswordFormButton"
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
