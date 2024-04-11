import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axios from "@/plugins/axios";

export async function sendForgotPassword(email) {
  const store = useAuthStore();
  const router = useRouter();

  store.loading.value = true;
  const response = await axios.post("http://localhost:3000/reset-password", { email: email });
  if (response.status === 201) {
    store.loading.value = false;
    router.push({ name: "AppLogin" });
  } else {
    store.loading.value = false;
  }
}
