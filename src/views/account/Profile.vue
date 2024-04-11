<template>
  <div class="profile container flex-column">
    <div class="profile-main-section flex-column">
      <div class="profile-header flex-column">
        <i class="fas fa-user-circle fa-5x"></i>
        <input
          class="custom-input title center"
          type="text"
          v-model="username"
        />
      </div>
      <div class="profile-tools flex-row pointer">
        <i class="fas fa-edit fa-md" @click="updateUser"></i>
        <i class="fas fa-sign-out-alt fa-md" @click="logout"></i>
        <i class="fas fa-trash-alt fa-md" @click="deleteUser"></i>
      </div>
    </div>
    <div class="profile-content" v-if="!isLoading">
      <div class="profile-content-item flex-row">
        <p>{{ $t("firstname") }}:</p>
        <input class="custom-input" type="text" v-model="user.firstname" />
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("lastname") }}:</p>
        <input class="custom-input" type="text" v-model="user.lastname" />
      </div>
      <div class="profile-content-item flex-row">
        <p>{{ $t("email") }}:</p>
        <input class="custom-input" type="text" v-model="user.email" />
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { updateUser } from "@/api/user/updateUser";
import Loader from "@/components/Loader.vue";

export default {
  name: "Profile",
  components: { Loader },
  data() {
    return {
      user: {},
      password: "",
      editMode: false,
    };
  },
  created() {
    this.user = this.getCurrentUser();
  },
  computed: {
    isLoading() {
      const authStore = useAuthStore();
      return authStore.isLoading;
    },
  },
  methods: {
    async updateUser() {
      const authStore = useAuthStore();
      this.user = await authStore.updateUser(this.user.id, this.user);
    },
    async getCurrentUser() {
      const authStore = useAuthStore();
      authStore.loading = true;
      this.$http
        .get("http://localhost:3000/user")
        .then((response) => {
          this.user = response.data;
        })
        .then(() => {
          authStore.insertUser(this.user);
          authStore.loading = false;
          this.editMode = false;
        })
        .catch((error) => {
          authStore.loading = false;
          console.log(error);
        });
    },
    async logout() {
      const authStore = useAuthStore();
      authStore.loading = true;
      this.$http
        .post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
        .then(() => {
          authStore.loading = false;
          authStore.logout();
          this.$router.push({ name: "AppLogin" });
        })
        .catch((error) => {
          authStore.loading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.profile {
  justify-content: center;
  gap: 3rem;
  color: var(--font-color);
}

.custom-input {
  border: none;
  background: none;
  outline: none;
  width: 100%;
  padding: 0;
}
</style>
