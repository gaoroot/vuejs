import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import axios from "@/plugins/axios";

export async function resetPassword(token, password) {
  const authStore = useAuthStore();
  authStore.loading.value = true;
  const response = await axios.post("http://localhost:3000/reset-password/" + token, {
    password: password,
  });
  if (response.status === 200) {
    authStore.loading.value = false;
    router.push({ name: "AppLogin" }).then();
  } else {
    authStore.loading.value = false;
  }
}

