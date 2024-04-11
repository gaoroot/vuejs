import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import axios from "@/plugins/axios";

export async function login(user) {
  const authStore = useAuthStore();
  authStore.loading = true;
  const response = await axios.post("http://localhost:3000/auth/login", user);
  if (response.status === 200) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.accessToken;
    authStore.accessToken = response.data.accessToken;
    authStore.loading = false;
    router.push({ name: "Dashboard" }).then();
  } else {
    authStore.loading = false;
  }
}

