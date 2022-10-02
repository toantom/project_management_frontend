<template>
  <div id="login-form">
    <div class="form bordered">
      <h2 class="title text-start">Sign In</h2>
      <hr class="form--separator" />
      <div class="error text-center text-danger mb-3">
        <p class="m-0" v-if="error" v-text="error" />
      </div>
      <form class="mb-3" @keyup.enter="submit">
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
        </div>
        <div class="d-flex justify-content-between">
          <button-base
            :type="'button'"
            :class="{ 'btn-primary': disabled, 'btn-secondary': !disabled }"
            :label="'Submit'"
            @click="submit"
            :disabled="!disabled"
          />
          <div
            class="forgot-password"
            @click="this.$router.push({ name: 'forgotPassword' })"
          >
            Forgot your password ?
          </div>
        </div>
      </form>
      <hr class="form--separator" />
      <h3 class="title text-start">Do not have account ? Sign up</h3>
      <div class="d-flex">
        <button-base
          :type="'button'"
          :classes="['btn-primary']"
          :label="'Sign up'"
          @click="this.$router.push({ name: 'Signup' })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
//components
import ButtonBase from "@/components/base/ButtonBase";
//constants
import { API_LOGIN } from "@/common/api.constants";
// service
import AuthService from "@/services/auth.service";

export default defineComponent({
  name: "LoginPage",
  components: {
    ButtonBase,
  },
  data() {
    return {
      email: "",
      password: "",
      disabled: false,
      error: "",
    };
  },
  watch: {
    email(value) {
      this.disabled = !!(value && this.password);
    },
    password(value) {
      this.disabled = !!(value && this.email);
    },
  },
  methods: {
    submit() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch(API_LOGIN, payload)
        .then(() => {
          this.error = "";
          AuthService.getAccountMe().then(() =>
            this.$router.push({ name: "Homepage" })
          );
        })
        .catch((response) => {
          console.log(response);
          this.error = response.data.message;
        });
    },
  },
});
</script>

<style lang="scss" scoped>
#login-form {
  .form {
    width: 511px;
    margin: 50px auto 0;
    padding: 30px 20px;
    background-color: #f8f8f8;
    border: 1px solid #eaeaea;
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
