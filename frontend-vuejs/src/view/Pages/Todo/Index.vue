<script setup>
import { inject, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";

const store = useStore();
const route = useRoute();
const router = useRouter();

const toast = inject("toast");

if (!route.query.isDone) {
  router.push({ name: "TodoIndex", query: { isDone: false } });
}

const todoForm = ref({
  id: null,
  title: "",
  description: "",
});
const todoFormErrors = ref({
  header: "",
  title: "",
  description: "",
});
const todoFormButton = ref(true);

function clearTodoForm() {
  todoForm.value = {
    id: null,
    title: "",
    description: "",
  };
  todoFormButton.value = true;
}
function clearTodoFormErrors() {
  todoFormErrors.value = {
    header: "",
    title: "",
    description: "",
  };
}

const modal = ref({
  open: false,
  type: "",
  header: "",
});

async function openModal(type, id = null) {
  clearTodoFormErrors();

  if (type === "create") {
    modal.value.header = "Add New Todo";
  } else if (id !== null) {
    modal.value.header = "Edit Todo";
    const todo = await getTodo(id);
    if (!todo.id) {
      return;
    }
    todoForm.value = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
    };
  }
  modal.value.type = type;
  modal.value.open = true;
}

const todos = ref([]);
const todoFilters = ref({
  isDone: route.query.isDone === "true",
});

function getTodos() {
  store.dispatch("getTodos", todoFilters.value.isDone).then((response) => {
    todos.value = response.data || [];
  });
}

async function getTodo(id) {
  return await store.dispatch("getTodo", id).then((response) => {
    return (
      response.data || {
        id: null,
        title: "",
        description: "",
      }
    );
  });
}

function doneTodo(id, is_done) {
  const data = {
    id,
    is_done,
  };
  store.dispatch("updateTodo", data).then((response) => {
    if (!response.error) {
      getTodos();
    }
  });
}

function deleteTodo(id) {
  toast("question", null, null, (instance, toast, closedBy) => {
    if (closedBy === "true") {
      setTimeout(() => {
        store.dispatch("deleteTodo", id).then((response) => {
          if (!response.error) {
            getTodos();
          }
        });
      }, 100);
    }
  });
}

function handleTodoForm() {
  if (todoFormButton.value) {
    clearTodoFormErrors();
    todoFormButton.value = false;

    store.dispatch("updateTodo", todoForm.value).then((response) => {
      if (response.response?.data?.errors) {
        for (const [oKey, oValue] of Object.entries(
          response.response.data.errors
        )) {
          if (oKey in todoFormErrors.value) {
            todoFormErrors.value[oKey] =
              oValue.length > 0 ? oValue.join("<br>") : "";
          }
        }
      } else if (!response.error) {
        clearTodoForm();
        getTodos();
        modal.value.open = false;
      } else {
        todoFormErrors.value.header = "Oops. Something went wrong.";
      }
      todoFormButton.value = true;
      return;
    });
  }
}

onMounted(() => {
  getTodos();
});

watch(
  todoFilters,
  () => {
    getTodos();
  },
  { deep: true }
);
watch(
  route,
  () => {
    todoFilters.value.isDone = route.query.isDone === "true";
  },
  { deep: true }
);
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Todo</h1>
      <a
        href="#"
        @click.prevent="openModal('create')"
        class="py-2 px-3 text-white bg-sky-500 rounded-md hover:bg-sky-600 cursor-pointer"
      >
        Add New
      </a>
    </div>
  </div>
  <div class="mt-6 border-t border-gray-300">
    <div class="flex mt-6 mb-2">
      <button
        @click="router.push({ name: 'TodoIndex', query: { isDone: false } })"
        :class="[
          'py-2 mr-3 w-full rounded-md cursor-pointer',
          todoFilters.isDone
            ? 'text-sky-500 bg-white border-2 border-sky-500 hover:bg-sky-500 hover:text-white'
            : 'text-white bg-sky-500',
        ]"
      >
        Open
      </button>
      <button
        @click="router.push({ name: 'TodoIndex', query: { isDone: true } })"
        :class="[
          'py-2 w-full rounded-md cursor-pointer',
          todoFilters.isDone
            ? 'text-white bg-sky-500'
            : 'text-sky-500 bg-white border-2 border-sky-500 hover:bg-sky-500 hover:text-white',
        ]"
      >
        Finish
      </button>
    </div>
    <ul role="list" class="divide-y divide-gray-100">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex justify-between gap-x-4 py-4"
      >
        <div class="flex min-w-0 gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="font-semibold leading-6 text-gray-900">
              {{ todo.title }}
            </p>
            <p class="mt-1 text-xs leading-5 text-gray-500 text-justify">
              {{ todo.description }}
            </p>
            <p class="mt-1 text-xs leading-5 text-gray-700">
              <div v-if="todo.done_at">
                <span>
                  Done At:
                  {{ todo.done_at.slice(0, -8).replace("T", " ") }}
                </span>
                <br />
              </div>
              <div v-if="todo.updated_at">
                <span>
                  Updated At:
                  {{ todo.updated_at.slice(0, -8).replace("T", " ") }}
                </span>
                <br />
              </div>
              <div v-if="todo.created_at">
                <span>
                  Created At:
                  {{ todo.created_at.slice(0, -8).replace("T", " ") }}
                </span>
              </div>
            </p>
          </div>
        </div>
        <div class="shrink-0 flex flex-col sm:flex-row items-center justify-center">
          <a
            href="#"
            @click.prevent="doneTodo(todo.id, !todo.is_done)"
            :class="[
              'text-sm leading-6',
              todo.is_done
                ? 'text-orange-500 hover:text-orange-600'
                : 'text-sky-500 hover:text-sky-600',
            ]"
          >
            <svg
              v-if="todo.is_done"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            @click.prevent="openModal('edit', todo.id)"
            class="text-sm leading-6 my-1 sm:my-0 sm:mx-1 text-emerald-500 hover:text-emerald-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
              />
              <path
                d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
              />
            </svg>
          </a>
          <a
            href="#"
            @click.prevent="deleteTodo(todo.id)"
            class="text-sm leading-6 text-red-500 hover:text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </li>
      <div v-if="!todos.length" class="text-center text-sm font-semibold mt-6">
        There is no data
      </div>
    </ul>
  </div>
  <TransitionRoot as="template" :show="modal.open">
    <Dialog as="div" class="relative z-10" @close="modal.open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <CheckIcon
                      v-if="modal.type === 'create'"
                      class="h-6 w-6 text-sky-600"
                      aria-hidden="true"
                    />
                    <PencilSquareIcon
                      v-else
                      class="h-6 w-6 text-emerald-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-3/4"
                  >
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      {{ modal.header }}
                    </DialogTitle>
                    <div class="mt-2">
                      <form @submit.prevent="handleTodoForm">
                        <div
                          class="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6"
                        >
                          <div class="col-span-full">
                            <label
                              for="title"
                              class="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Title <span class="text-red-500">*</span>
                            </label>
                            <div class="mt-2">
                              <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                              >
                                <input
                                  v-model.trim="todoForm.title"
                                  type="text"
                                  name="title"
                                  class="block flex-1 border-0 bg-transparent px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                              </div>
                              <div
                                v-if="todoFormErrors.title"
                                class="text-xs text-red-500 mt-1"
                              >
                                {{ todoFormErrors.title }}
                              </div>
                            </div>
                          </div>

                          <div class="col-span-full">
                            <label
                              for="description"
                              class="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Description
                            </label>
                            <div class="mt-2">
                              <textarea
                                v-model.trim="todoForm.description"
                                name="description"
                                rows="5"
                                class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <div
                              v-if="todoFormErrors.description"
                              class="text-xs text-red-500 mt-1"
                            >
                              {{ todoFormErrors.description }}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  @click="handleTodoForm"
                  :disabled="!todoFormButton"
                  class="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="modal.open = false"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
