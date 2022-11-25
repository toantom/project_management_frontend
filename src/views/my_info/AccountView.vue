<template>
  <div class="account px-2 px-sm-4">
    <h1 class="mb-3">Account</h1>
    <section class="content">
      <div class="container">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
            >
              Profile
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="change-password-tab"
              data-bs-toggle="tab"
              data-bs-target="#change-password"
              type="button"
              role="tab"
              aria-controls="change-password"
              aria-selected="false"
            >
              Change password
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <profile-edit />
          </div>
          <div
            class="tab-pane fade"
            id="change-password"
            role="tabpanel"
            aria-labelledby="change-password-tab"
          >
            <change-password />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileEdit from "@/components/account/ProfileEdit.vue";
import ChangePassword from "@/components/account/ChangePassword.vue";

export default defineComponent({
  name: "AccountView",
  components: {
    ProfileEdit,
    ChangePassword,
  },
});
</script>

<style lang="scss" scoped></style>
