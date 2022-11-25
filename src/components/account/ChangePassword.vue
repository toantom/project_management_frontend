<template>
  <form action="" class="change-password mt-3">
    <div class="mb-3 row">
      <label for="email" class="col-sm-4 col-form-label text-start">
        Current Password <span class="required-input">*</span>
      </label>
      <div class="col-sm-8">
        <input
          type="password"
          class="form-control"
          id="current_password"
          placeholder="Current Password"
          v-model="currentPassword"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="username" class="col-sm-4 col-form-label text-start">
        New Password <span class="required-input">*</span>
      </label>
      <div class="col-sm-8">
        <input
          type="password"
          class="form-control"
          id="new_password"
          placeholder="New Password"
          v-model="newPassword"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="username" class="col-sm-4 col-form-label text-start">
        Confirm New Password <span class="required-input">*</span>
      </label>
      <div class="col-sm-8">
        <input
          type="password"
          class="form-control"
          id="confirm_password"
          placeholder="Confirm New Password"
          v-model="newPasswordConfirm"
        />
      </div>
    </div>
    <button-base
      :type="'button'"
      :class="{ 'btn-primary': disabled, 'btn-secondary': !disabled }"
      :label="'Submit'"
      @click="submit"
      :disabled="!disabled"
    />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// components
import ButtonBase from "@/components/base/ButtonBase.vue";
import AccountService from "@/services/account.service";
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex";
export default defineComponent({
  name: "ChangePassword",
  components: {
    ButtonBase,
  },
  data() {
    return {
      disabled: false,
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  },
  watch: {
    currentPassword(value) {
      this.disabled = !!(value && this.newPassword && this.newPasswordConfirm);
    },
    newPassword(value) {
      this.disabled = !!(
        value &&
        this.currentPassword &&
        this.newPasswordConfirm
      );
    },
    newPasswordConfirm(value) {
      this.disabled = !!(
        value &&
        this.currentPassword &&
        this.newPasswordConfirm
      );
    },
  },
  computed: {
    ...mapGetters(["error"]),
  },
  methods: {
    async submit() {
      const payload = {
        current_password: this.currentPassword,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirm,
      };
      const response = await AccountService.updatePassword(payload);
      const toast = useToast();
      if (response.result === "ok") {
        toast.success("Update Password Successfully");
        this.currentPassword = "";
        this.newPassword = "";
        this.newPasswordConfirm = "";
      } else {
        const errors = Object.values(response.errors);
        let errorString = "";
        for (const error of errors) {
          errorString += error + " \n";
        }
        toast.error(errorString);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.change-password {
  width: 700px;
}
</style>
