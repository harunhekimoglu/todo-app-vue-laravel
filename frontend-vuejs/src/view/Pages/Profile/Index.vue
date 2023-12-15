<script setup>
import { inject, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const toast = inject("toast");

const user = computed(() => {
  return store.getters.getUserData;
});

const userForm = ref({
  name: user.value.name,
  email: user.value.email,
});
const userFormErrors = ref({
  header: "",
  name: "",
  email: "",
});
const userFormButton = ref(true);

function clearUserForm() {
  userForm.value = {
    name: user.value.name,
    email: user.value.email,
  };
  userFormButton.value = true;
}
function clearUserFormErrors() {
  userFormErrors.value = {
    header: "",
    name: "",
    email: "",
  };
}

const userPasswordForm = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});
const userPasswordFormErrors = ref({
  header: "",
  current_password: "",
  password: "",
  password_confirmation: "",
});
const userPasswordFormButton = ref(true);

function clearUserPasswordForm() {
  userPasswordForm.value = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };
  userPasswordFormButton.value = true;
}
function clearUserPasswordFormErrors() {
  userPasswordFormErrors.value = {
    header: "",
    current_password: "",
    password: "",
    password_confirmation: "",
  };
}

const userDeleteForm = ref({
  current_password: "",
});
const userDeleteFormErrors = ref({
  header: "",
  current_password: "",
});
const userDeleteFormButton = ref(true);

function clearUserDeleteForm() {
  userDeleteForm.value = {
    current_password: "",
  };
  userDeleteFormButton.value = true;
}
function clearUserDeleteFormErrors() {
  userDeleteFormErrors.value = {
    header: "",
    current_password: "",
  };
}

function handleUserForm() {
  if (userFormButton.value) {
    clearUserFormErrors();
    userFormButton.value = false;

    store.dispatch("updateUser", userForm.value).then((response) => {
      if (response.response?.data?.errors) {
        for (const [oKey, oValue] of Object.entries(
          response.response.data.errors
        )) {
          if (oKey in userFormErrors.value) {
            userFormErrors.value[oKey] =
              oValue.length > 0 ? oValue.join("<br>") : "";
          }
        }
      } else if (!response.error) {
        clearUserForm();
        toast();
      } else {
        userFormErrors.value.header = "Oops. Something went wrong.";
      }
      userFormButton.value = true;
      return;
    });
  }
}

function handleUserPasswordForm() {
  if (userPasswordFormButton.value) {
    clearUserPasswordFormErrors();
    userPasswordFormButton.value = false;

    store
      .dispatch("updateUserPassword", userPasswordForm.value)
      .then((response) => {
        if (response.response?.data?.errors) {
          for (const [oKey, oValue] of Object.entries(
            response.response.data.errors
          )) {
            if (oKey in userPasswordFormErrors.value) {
              userPasswordFormErrors.value[oKey] =
                oValue.length > 0 ? oValue.join("<br>") : "";
            }
          }
        } else if (!response.error) {
          clearUserPasswordForm();
          toast();
        } else {
          userPasswordFormErrors.value.header = "Oops. Something went wrong.";
        }
        userPasswordFormButton.value = true;
        return;
      });
  }
}

function handleUserDeleteForm() {
  if (userDeleteFormButton.value) {
    clearUserDeleteFormErrors();
    userDeleteFormButton.value = false;

    store.dispatch("deleteUser", userDeleteForm.value).then((response) => {
      if (response.response?.data?.errors) {
        for (const [oKey, oValue] of Object.entries(
          response.response.data.errors
        )) {
          if (oKey in userDeleteFormErrors.value) {
            userDeleteFormErrors.value[oKey] =
              oValue.length > 0 ? oValue.join("<br>") : "";
          }
        }
      } else if (!response.error) {
        clearUserDeleteForm();
        router.push({ name: "AuthLogin" });
      } else {
        userDeleteFormErrors.value.header = "Oops. Something went wrong.";
      }
      userDeleteFormButton.value = true;
      return;
    });
  }
}
</script>

<template>
  <div class="bg-white p-4 rounded-xl">
    <form @submit.prevent="handleUserForm">
      <div class="space-y-12">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Profile Information
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Update your account's profile Information and email address.
          </p>
          <div class="mt-6">
            <div
              v-if="userFormErrors.header"
              v-html="userFormErrors.header"
              class="text-xs bg-red-500 text-white px-2 py-3 rounded"
            ></div>
            <div class="mt-4">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Name Surname
              </label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model.trim="userForm.name"
                    id="name"
                    type="text"
                    autocomplete="name"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  v-if="userFormErrors.name"
                  v-html="userFormErrors.name"
                  class="text-xs text-red-500 mt-1"
                ></div>
              </div>
            </div>
            <div class="mt-4">
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model.trim="userForm.email"
                    id="email"
                    type="email"
                    autocomplete="email"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  v-if="userFormErrors.email"
                  v-html="userFormErrors.email"
                  class="text-xs text-red-500 mt-1"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          :disabled="!userFormButton"
          class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:hover:bg-indigo-600 disabled:opacity-75"
        >
          Save
        </button>
      </div>
    </form>
  </div>

  <div class="bg-white p-4 rounded-xl mt-8">
    <form @submit.prevent="handleUserPasswordForm">
      <div class="space-y-12">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Update Password
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Ensure your account is using a long, random password to stay secure.
          </p>
          <div class="mt-6">
            <div
              v-if="userPasswordFormErrors.header"
              v-html="userPasswordFormErrors.header"
              class="text-xs bg-red-500 text-white px-2 py-3 rounded"
            ></div>
            <div class="mt-4">
              <label
                for="current_password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password
              </label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model.trim="userPasswordForm.current_password"
                    id="current_password"
                    type="password"
                    autocomplete="current_password"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  v-if="userPasswordFormErrors.current_password"
                  v-html="userPasswordFormErrors.current_password"
                  class="text-xs text-red-500 mt-1"
                ></div>
              </div>
            </div>
            <div class="mt-4">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model.trim="userPasswordForm.password"
                    id="password"
                    type="password"
                    autocomplete="password"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  v-if="userPasswordFormErrors.password"
                  v-html="userPasswordFormErrors.password"
                  class="text-xs text-red-500 mt-1"
                ></div>
              </div>
            </div>
            <div class="mt-4">
              <label
                for="password_confirmation"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model.trim="userPasswordForm.password_confirmation"
                    id="password_confirmation"
                    type="password"
                    autocomplete="password_confirmation"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  v-if="userPasswordFormErrors.password_confirmation"
                  v-html="userPasswordFormErrors.password_confirmation"
                  class="text-xs text-red-500 mt-1"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          :disabled="!userPasswordFormButton"
          class="flex justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:hover:bg-orange-600 disabled:opacity-75"
        >
          Update
        </button>
      </div>
    </form>
  </div>

  <div class="bg-white p-4 rounded-xl mt-8">
    <form @submit.prevent="handleUserDeleteForm">
      <div class="space-y-12">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Delete Account
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Once your account is deleted, all of its resources and data will be
            permanently deleted.
          </p>
          <div class="mt-6">
            <div
              v-if="userDeleteFormErrors.header"
              v-html="userDeleteFormErrors.header"
              class="text-xs bg-red-500 text-white px-2 py-3 rounded"
            ></div>
            <div class="mt-4">
              <label
                for="current_password_2"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password
              </label>
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model.trim="userDeleteForm.current_password"
                    id="current_password_2"
                    type="password"
                    autocomplete="current_password_2"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                <div
                  v-if="userDeleteFormErrors.current_password"
                  v-html="userDeleteFormErrors.current_password"
                  class="text-xs text-red-500 mt-1"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          :disabled="!userDeleteFormButton"
          class="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:hover:bg-red-600 disabled:opacity-75"
        >
          Delete Account
        </button>
      </div>
    </form>
  </div>
</template>
