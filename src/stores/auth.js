import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    accessToken: '',
    user: {},
  }),
  actions: {
    setLoading(payload) {
      this.isLoading = payload;
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
    },
    setUser(user) {
      this.user = user;
    },
    reset() {
      this.$reset();
    },
    login(payload) {
      localStorage.setItem('accessToken', payload.accessToken);
      this.setAccessToken(payload.accessToken);
      this.setUser(payload.user);
    },
    logout() {
      localStorage.removeItem('accessToken');
      this.reset();
    },
    loading(payload) {
      this.setLoading(payload);
    },
    insertAccessToken(token) {
      localStorage.setItem('accessToken', token);
      this.setAccessToken(token);
    },
    insertUser(user) {
      this.setUser(user);
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
});

export default useAuthStore;

// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', () => {
//    const isLoading = ref(false)
//    const accessToken = ref("")
//    const user = ref({})
//   // const count = ref(0)
//   // const doubleCount = computed(() => count.value * 2)
//   // function increment() {
//   //   count.value++
//   // }

//   return { isLoading, accessToken, user }
// })



// import { createStore } from "vuex";

// const getDefaultState = () => {
//   return {
//     accessToken: "",
//     user: {},
//   };
// };

// export default createStore({
//   state: {
//     isLoading: false,
//     accessToken: "",
//     user: {},
//   },
//   mutations: {
//     setLoading(state, payload) {
//       state.isLoading = payload;
//     },
//     setAccessToken: (state, accessToken) => {
//       state.accessToken = accessToken;
//     },
//     setUser: (state, user) => {
//       state.user = user;
//     },
//     reset: (state) => {
//       Object.assign(state, getDefaultState());
//     },
//   },
//   actions: {
//     login: ({ commit }, payload) => {
//       localStorage.setItem("accessToken", payload.accessToken);
//       commit("setAccessToken", payload.accessToken);
//       commit("setUser", payload.user);
//     },
//     logout: ({ commit }) => {
//       localStorage.removeItem("accessToken");
//       commit("reset", "");
//     },
//     loading: ({ commit }, payload) => {
//       commit("setLoading", payload);
//     },
//     insertAccessToken: ({ commit }, token) => {
//       localStorage.setItem("accessToken", token);
//       commit("setAccessToken", token);
//     },
//     insertUser: ({ commit }, user) => {
//       commit("setUser", user);
//     },
//   },
//   getters: {
//     isLoading(state) {
//       return state.isLoading;
//     },
//     isLoggedIn(state) {
//       return !!state.accessToken;
//     },
//     user(state) {
//       return state.user;
//     },
//   },
// });