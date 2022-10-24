<template>
  <form action="" class="profile-form mt-3">
    <div class="mb-3 row">
      <label for="email" class="col-sm-4 col-form-label text-start">
        Login Email
      </label>
      <div class="col-sm-2">{{ email }}</div>
    </div>
    <div class="mb-3 row">
      <label for="username" class="col-sm-4 col-form-label text-start">
        Username <span class="required-input">*</span>
      </label>
      <div class="col-sm-8">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
          v-model="username"
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
// services
import AccountService from "@/services/account.service";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";
import { store } from "@/store";
import { SET_AUTH } from "@/store/mutations.types";
export default defineComponent({
  name: "ProfileEdit",
  components: {
    ButtonBase,
  },
  data() {
    return {
      disabled: false,
      username: "",
      email: "",
      userId: "",
    };
  },
  mounted() {
    this.userId = this.user.id;
    this.username = this.user.name;
    this.email = this.user.email;
  },
  watch: {
    username(value) {
      this.disabled = !!value;
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async submit() {
      const data = {
        name: this.username,
      };
      const response = await AccountService.updateAccountInfo(
        data,
        this.userId
      );
      const toast = useToast();
      if (response.result === "ok") {
        toast.success("Update Info User Success");
        store.commit(SET_AUTH, response.user);
      } else {
        const errors = Object.values(response.data.errors);
        let errorString = "";
        for (const error of errors) {
          errorString = errorString + error + " \n";
        }
        toast.error(errorString);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.profile-form {
  width: 500px;
}
</style>
