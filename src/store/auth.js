import { defineStore } from "pinia";

const useLoginStore = defineStore("auth", {
  state: () => {
    return {
      email: "ejemplo@gmail.com",
      password: "12345",
      token: false,
    };
  },
  actions: {
    auth(email, pass) {
      if (this.email === email && this.password === pass) {
        this.token = true;
        return true;
      } else {
        return false;
      }
    },
  },
});

export default useLoginStore;
