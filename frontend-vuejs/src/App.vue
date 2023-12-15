<script setup>
import { provide } from "vue";
import iziToast from "izitoast";

iziToast.settings({
  theme: "light",
  timeout: 10000,
  layout: 1,
  displayMode: 0,
  position: "topRight",
  pauseOnHover: true,
  resetOnHover: false,
  progressBar: true,
  transitionIn: "bounceInLeft",
  transitionInMobile: "fadeInLeft",
  zindex: 999,
});

const toast = (
  type = "success",
  title = null,
  message = null,
  onClosing = () => {}
) => {
  if (type === "success") {
    iziToast.success({
      title: title || "Good job!",
      message: message || "Process has been successfully done!",
    });
  } else if (type === "warning") {
    iziToast.warning({
      title: title || "Caution!",
      message: message || "Something went wrong!",
    });
  } else if (type === "error") {
    iziToast.error({
      title: title || "Oops...",
      message: message || "Something went wrong!",
    });
  } else if (type === "question") {
    iziToast.question({
      close: false,
      overlay: true,
      displayMode: "once",
      icon: "ico-warning",
      title: title || "&nbsp;",
      message: message || "Are you sure?",
      position: "center",
      transitionIn: "bounceInDown",
      transitionInMobile: "fadeInDown",
      buttons: [
        [
          `<button><b>YES</b></button>`,
          (instance, toast) => {
            instance.hide({}, toast, "true");
          },
          true,
        ],
        [
          `<button>NO</button>`,
          (instance, toast) => {
            instance.hide({}, toast, "false");
          },
        ],
      ],
      onClosing: onClosing,
    });
  }
};

provide("toast", toast);
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <router-view></router-view>
  </div>
</template>
