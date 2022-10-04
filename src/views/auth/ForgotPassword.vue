<template>
  <div id="forgot-form">
    <div class="form bordered">
      <h2 class="title text-start">Forgot your password ?</h2>
      <hr class="form--separator" />
      <form class="mb-3">
        <input-base
          :type="'email'"
          :id="'email'"
          :placeholder="'abc@example.com'"
          :label="'Email'"
          :required="true"
        />
        <div class="d-flex justify-content-between">
          <button-base
            :type="'submit'"
            :classes="['btn-primary']"
            :label="'Submit'"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import InputBase from "@/components/base/InputBase";
import ButtonBase from "@/components/base/ButtonBase";
export default defineComponent({
  name: "ForgotPassword",
  components: {
    InputBase,
    ButtonBase,
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
  }
}
</style>
