<template>
  <div id="signup-form">
    <div class="form bordered">
      <h2 class="title text-start">Sign Up</h2>
      <hr class="form--separator" />
      <form class="mb-3">
        <div class="mb-3 row">
          <label for="name" class="col-sm-4 col-form-label text-start">
            Username <span class="required-input">*</span>
          </label>
          <div class="col-sm-8">
            <input
              type="text"
              maxlength="256"
              class="form-control"
              id="name"
              placeholder="Username"
              v-model="username"
            />
          </div>
          <div class="error text-center text-danger mt-1" v-if="error.name">
            <p class="m-0 fs-1" v-text="error.name[0]" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="email" class="col-sm-4 col-form-label text-start">
            Email <span class="required-input">*</span>
          </label>
          <div class="col-sm-8">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="abc@example.com"
              v-model="email"
            />
          </div>
          <div class="error text-center text-danger mt-1" v-if="error.email">
            <p class="m-0" v-text="error.email[0]" />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="password" class="col-sm-4 col-form-label text-start">
            Password <span class="required-input">*</span>
          </label>
          <div class="col-sm-8">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="********"
              v-model="password"
            />
          </div>
          <div class="error text-center text-danger mt-1" v-if="error.password">
            <p class="m-0" v-text="error.password[0]" />
          </div>
        </div>
        <div class="mb-3 row">
          <label
            for="confirm-password"
            class="col-sm-4 col-form-label text-start"
          >
            Confirm Password <span class="required-input">*</span>
          </label>
          <div class="col-sm-8">
            <input
              type="password"
              class="form-control"
              id="confirm-password"
              placeholder="********"
              v-model="confirmPassword"
            />
          </div>
          <div
            class="error text-center text-danger mt-1"
            v-if="error.password_confirmation"
          >
            <p class="m-0" v-text="error.password_confirmation[0]" />
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <button-base
            :type="'button'"
            :class="{ 'btn-primary': disabled, 'btn-secondary': !disabled }"
            :label="'Submit'"
            :disabled="!disabled"
            @click="submit"
          />
        </div>
      </form>
      <hr class="form--separator" />
      <h3 class="title text-start">Already have account ? Log In</h3>
      <div class="d-flex">
        <button-base
          :type="'button'"
          :classes="['btn-primary']"
          :label="'Log in'"
          @click="this.$router.push({ name: 'Login' })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
//components
import ButtonBase from "@/components/base/ButtonBase";
import { API_REGISTER } from "@/common/api.constants";
import AuthService from "@/services/auth.service";
export default defineComponent({
  name: "SignUp",
  components: {
    ButtonBase,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      disabled: false,
      error: [],
    };
  },
  watch: {
    name(value) {
      this.disabled = !!(
        value &&
        this.password &&
        this.confirmPassword &&
        this.email
      );
    },
    email(value) {
      this.disabled = !!(
        value &&
        this.password &&
        this.confirmPassword &&
        this.username
      );
    },
    password(value) {
      this.disabled = !!(
        value &&
        this.email &&
        this.confirmPassword &&
        this.username
      );
    },
    confirmPassword(value) {
      this.disabled = !!(value && this.email && this.password && this.username);
    },
  },
  methods: {
    submit() {
      const payload = {
        name: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword,
      };
      this.$store
        .dispatch(API_REGISTER, payload)
        .then(() => {
          this.error = "";
          AuthService.getAccountMe().then(() =>
            this.$router.push({ name: "Homepage" })
          );
        })
        .catch((response) => {
          this.error = response.data.errors;
        });
    },
  },
});
</script>

<style lang="scss" scoped>
#signup-form {
  height: 100vh;
  background-color: rgb(237, 237, 237);
  .form {
    width: 511px;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 30px 20px;
    background-color: #f8f8f8;
    border: 1px solid #eaeaea;
    transform: translate(-50%, -50%);
    .title {
      color: #333333;
      font-weight: bold;
      padding: 0 0 8px 0;
      margin: 0;
    }
    @media only screen and (max-width: 42.4375em) {
      width: 100%;
    }
    .forgot-password {
      cursor: pointer;
      color: var(--bs-link-color);

      &:hover {
        text-decoration: underline;
        color: var(--bs-link-hover-color);
      }
    }
  }
  .required-input {
    color: var(--bs-danger);
  }
}
</style>
