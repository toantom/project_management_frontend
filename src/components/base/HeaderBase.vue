<template>
  <header class="header" id="header">
    <div class="header_toggle">
      <i
        class="bx bx-menu"
        id="header-toggle"
        @click="(e) => showNavbar(e)"
      ></i>
    </div>
    <div class="dropdown text-end">
      <div
        class="d-block link-dark text-decoration-none cursor-pointer"
        id="dropdownUser"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://github.com/mdo.png"
          alt="mdo"
          width="40"
          height="40"
          class="rounded-circle"
        />
      </div>
      <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser">
        <li><div class="dropdown-item">New project...</div></li>
        <li><div class="dropdown-item">Settings</div></li>
        <li><div class="dropdown-item">Profile</div></li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <div class="dropdown-item" @click="showModalLogOut">Sign out</div>
        </li>
      </ul>
    </div>
  </header>
  <div class="l-navbar" id="nav-bar">
    <nav class="nav">
      <div>
        <a href="#" class="nav_logo">
          <i class="bx bx-layer nav_logo-icon"></i>
          <span class="nav_logo-name">BBBootstrap</span>
        </a>
        <div class="nav_list">
          <a href="#" class="nav_link active">
            <i class="bx bx-grid-alt nav_icon"></i>
            <span class="nav_name">Dashboard</span>
          </a>
          <a href="#" class="nav_link">
            <i class="bx bx-user nav_icon"></i>
            <span class="nav_name">Users</span>
          </a>
          <a href="#" class="nav_link">
            <i class="bx bx-message-square-detail nav_icon"></i>
            <span class="nav_name">Messages</span>
          </a>
          <a href="#" class="nav_link">
            <i class="bx bx-bookmark nav_icon"></i>
            <span class="nav_name">Bookmark</span>
          </a>
          <a href="#" class="nav_link">
            <i class="bx bx-folder nav_icon"></i>
            <span class="nav_name">Files</span>
          </a>
          <a href="#" class="nav_link">
            <i class="bx bx-bar-chart-alt-2 nav_icon"></i>
            <span class="nav_name">Stats</span>
          </a>
        </div>
      </div>
    </nav>
  </div>
  <logout-modal v-if="showModalLogout" @close="showModalLogout = false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoutModal from "@/components/base/LogoutModal.vue";
export default defineComponent({
  name: "HeaderBase",
  components: {
    LogoutModal,
  },
  data() {
    return {
      showModalLogout: false,
    };
  },
  methods: {
    showModalLogOut() {
      this.showModalLogout = true;
    },
    showNavbar(e: { target: HTMLElement }) {
      const nav = document.getElementById("nav-bar"),
        bodypd = document.getElementById("app"),
        headerpd = document.getElementById("header");
      nav?.classList.toggle("show");
      // change icon
      e.target.classList.toggle("bx-x");
      // add padding to body
      bodypd?.classList.toggle("body-pd");
      // add padding to header
      headerpd?.classList.toggle("body-pd");
    },
  },
});
</script>

<style lang="scss" scoped>
$header-height: 3rem;
$nav-width: 68px;
$first-color: #4723d9;
$first-color-light: #afa5d9;
$white-color: #f7f6fb;
$body-font: "Nunito", sans-serif;
$normal-font-size: 1rem;
$z-fixed: 100;
a {
  text-decoration: none;
}
.header {
  width: 100%;
  height: $header-height;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: $white-color;
  z-index: $z-fixed;
  transition: 0.5s;
}
.header_toggle {
  color: var($first-color);
  font-size: 1.5rem;
  cursor: pointer;
}
.l-navbar {
  position: fixed;
  top: 0;
  left: -30%;
  width: $nav-width;
  height: 100vh;
  background-color: $first-color;
  padding: 0.5rem 1rem 0 0;
  transition: 0.5s;
  z-index: $z-fixed;
}
.nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.nav_logo,
.nav_link {
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  column-gap: 1rem;
  padding: 0.5rem 0 0.5rem 1.5rem;
}
.nav_logo {
  margin-bottom: 2rem;
}
.nav_logo-icon {
  font-size: 1.25rem;
  color: $white-color;
}
.nav_logo-name {
  color: $white-color;
  font-weight: 700;
}
.nav_link {
  position: relative;
  color: $first-color-light;
  margin-bottom: 1.5rem;
  transition: 0.3s;
}
.nav_link:hover {
  color: $white-color;
}
.nav_icon {
  font-size: 1.25rem;
}
.show {
  left: 0;
}
.body-pd {
  padding-left: calc($nav-width + 1rem);
}
.active {
  color: $white-color;
}
.active::before {
  content: "";
  position: absolute;
  left: 0;
  width: 2px;
  height: 32px;
  background-color: $white-color;
}
.dropdown-item {
  cursor: pointer;
}
@media screen and (min-width: 768px) {
  body {
    margin: calc($header-height + 1rem) 0 0 0;
    padding-left: calc($nav-width + 2rem);
  }
  .header {
    height: calc($header-height + 1rem);
    padding: 0 2rem 0 calc($nav-width + 2rem);
  }
  .l-navbar {
    left: 0;
    padding: 1rem 1rem 0 0;
  }
  .show {
    width: calc($nav-width + 156px);
  }
  .body-pd {
    padding-left: calc($nav-width + 188px);
  }
}
</style>
