<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const store = useStore();
const router = useRouter();

function handleLogout() {
  store.dispatch("logout").then((response) => {
    if (!response.error) {
      router.push({ name: "AuthLogin" });
    }
  });
}
</script>

<template>
  <header class="bg-white shadow">
    <nav
      class="mx-auto flex items-center justify-between py-6 px-8"
      aria-label="Global"
    >
      <div class="flex flex-1">
        <router-link :to="{ name: 'Base' }" class="-m-1.5 p-1.5">
          <span class="sr-only">Todo App</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="logo"
          />
        </router-link>
      </div>
      <div class="flex flex-1 justify-end">
        <div class="ml-4 flex items-center md:ml-6">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="/static/img/avatar.png"
                  alt="avatar"
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <router-link
                    :to="{ name: 'ProfileIndex' }"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Profile
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    @click.prevent="handleLogout"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >
                    Logout
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </nav>
  </header>
</template>
