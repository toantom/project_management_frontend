<template>
  <modal-base
    :title="'Are You Sure Want To Logout ?'"
    :primary-label="'Confirm'"
    :second-label="'Cancel'"
    :close-button="true"
    :active="true"
    :open="open"
    @ok="logout"
    @hidden="$emit('close')"
    @cancel="open = false"
  >
    <p>
      This action will end your login session.<br />
      You will be redirected to the login page？
    </p>
  </modal-base>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ModalBase from "@/components/base/ModalBase.vue";
import AuthService from "@/services/auth.service";

export default defineComponent({
  name: "LogoutModal",
  components: {
    ModalBase,
  },
  emits: ["save", "close"],
  data() {
    return {
      open: true,
    };
  },
  methods: {
    async logout() {
      this.open = false;
      await AuthService.logout();
      this.$router.replace({ name: "Login" });
    },
  },
});
</script>
