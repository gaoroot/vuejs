<template>
  <div class="settings">
    <div>{{ $t("settings") }} of {{ user.username }}</div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth"

export default {
  name: "Settings",
  computed: {
    user() {
      // return useAuthStore().user;
      const authStore = useAuthStore();
      return authStore.user;
    },
    role() {
      const userStore = useAuthStore();
      if (userStore.user.role === 1) {
        return "admin";
      } else if (userStore.user.role === 0) {
        return "user";
      } else {
        return "user";
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
