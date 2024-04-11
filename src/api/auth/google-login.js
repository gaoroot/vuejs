import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import axios from "@/plugins/axios";

export async function googleLogin(googleToken) {
  const authStore = useAuthStore();
  authStore.loading = true;
  const token = googleToken.credential;
  const response = await axios.post("http://localhost:3000/auth/google", { token });
  if (response.status === 200) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.accessToken;
    authStore.accessToken = response.data.accessToken;
    authStore.loading = false;
    router.push({ name: "Dashboard" }).then();
  } else {
    authStore.loading = false;
  }
}

