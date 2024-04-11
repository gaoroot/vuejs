import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import axios from "@/plugins/axios";

export async function logout() {
  const authStore = useAuthStore();
  authStore.loading = true;
  const response = await axios.post("http://localhost:3000/auth/logout");
  if (response.status === 200) {
    authStore.logout();
    localStorage.removeItem("accessToken");
    authStore.loading = false;
    router.push({ name: "Home" }).then();
  } else {
    authStore.loading = false;
  }
}

