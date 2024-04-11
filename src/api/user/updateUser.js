import { useAuthStore } from "@/stores/auth";
import axios from "@/plugins/axios";

export async function updateUser(id, user) {
  const authStore = useAuthStore();
  authStore.loading = true;
  const response = await axios.patch("http://localhost:3000/user/" + id, user);
  if (response.status === 200) {
    authStore.loading = false;
    return response.data.content.user;
  } else {
    authStore.loading = false;
    return user;
  }
}
