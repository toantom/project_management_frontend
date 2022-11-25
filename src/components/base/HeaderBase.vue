<template>
  <template v-if="isEmployee">
    <header class="header-root" id="header">
      <div class="header_toggle">
        <i
          class="bx bx-menu"
          id="header-toggle"
          @click="(e) => showNavbar(e)"
        ></i>
      </div>
      <router-link :to="{ name: 'Homepage' }">
        <img src="../../assets/image/logo.png" alt="" class="logo" />
      </router-link>
      <div class="dropdown text-end">
        <div
          class="d-block link-dark text-decoration-none cursor-pointer"
          id="dropdownUser"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            :src="`https://ui-avatars.com/api/?name=${user.name}&background=4723d9&color=fff`"
            alt="mdo"
            width="40"
            height="40"
            class="rounded-circle"
          />
        </div>
        <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser">
          <template v-if="isEmployee">
            <li><div class="dropdown-item">My Page</div></li>
            <li>
              <div
                class="dropdown-item"
                @click="$router.push({ path: '/account' })"
              >
                My Account
              </div>
            </li>
            <li><hr class="dropdown-divider" /></li>
          </template>

          <li>
            <div class="dropdown-item" @click="showModalLogOut">Sign out</div>
          </li>
        </ul>
      </div>
    </header>
    <div class="l-navbar" id="nav-sidebar">
      <nav class="nav-sidebar">
        <div v-if="Object.keys(project).length === 0">
          <div class="nav_list">
            <router-link
              :to="{
                name: 'ProjectList',
              }"
              class="nav_link-sidebar"
              :class="projectList && 'active'"
            >
              <i class="bx bx-info-circle nav_icon-sidebar"></i>
              <span class="nav_name">Project</span>
            </router-link>
          </div>
        </div>
        <div v-else>
          <div class="nav_list">
            <router-link
              :to="{
                name: 'ProjectDetail',
                params: { project_id: project?.id },
              }"
              class="nav_link-sidebar"
              :class="ProjectDetail && 'active'"
              title="Project Overview"
            >
              <i class="bx bx-info-circle nav_icon-sidebar"></i>
              <span class="nav_name">Overview</span>
            </router-link>
            <a
              href="#"
              class="nav_link-sidebar"
              :class="projectDashboard && 'active'"
              title="Project Dashboard"
            >
              <i class="bx bx-grid-alt nav_icon-sidebar"></i>
              <span class="nav_name">Dashboard</span>
            </a>
            <router-link
              :to="{ name: 'ProjectBacklog' }"
              class="nav_link-sidebar"
              :class="projectSprints && 'active'"
              title="Project Sprints"
            >
              <i class="bx bx-book-content nav_icon-sidebar"></i>
              <span class="nav_name">Sprints</span>
            </router-link>
            <router-link
              :to="{ name: 'ProjectActivities' }"
              class="nav_link-sidebar"
              :class="projectActivities && 'active'"
              title="Project Activities"
            >
              <i class="bx bx-briefcase-alt-2 nav_icon-sidebar"></i>
              <span class="nav_name">Activities</span>
            </router-link>
            <!--            <a-->
            <!--              href="#"-->
            <!--              class="nav_link-sidebar"-->
            <!--              :class="projectWiki && 'active'"-->
            <!--            >-->
            <!--              <i class="bx bxs-book-reader nav_icon-sidebar"></i>-->
            <!--              <span class="nav_name">Wiki</span>-->
            <!--            </a>-->
            <a
              href="#"
              class="nav_link-sidebar"
              :class="projectMember && 'active'"
              title="Project Members "
            >
              <i class="bx bx-group nav_icon-sidebar"></i>
              <span class="nav_name">Members</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </template>
  <template v-else>
    <header class="header-root justify-content-end" id="header">
      <div class="dropdown text-end">
        <div
          class="d-block link-dark text-decoration-none cursor-pointer"
          id="dropdownUser"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            :src="`https://ui-avatars.com/api/?name=${user.name}&background=4723d9&color=fff`"
            alt="mdo"
            width="40"
            class="rounded-circle"
          />
        </div>
        <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser">
          <li>
            <div class="dropdown-item" @click="showModalLogOut">Sign out</div>
          </li>
        </ul>
      </div>
    </header>
  </template>
  <logout-modal v-if="showModalLogout" @close="showModalLogout = false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoutModal from "@/components/base/LogoutModal.vue";
import UserService from "@/common/user.service";
import { mapGetters } from "vuex";
import { store } from "@/store";
import { SET_PROJECT } from "@/store/mutations.types";
import ProjectService from "@/services/project.service";
export default defineComponent({
  name: "HeaderBase",
  components: {
    LogoutModal,
  },
  data() {
    return {
      showModalLogout: false,
      isEmployee: false,
    };
  },
  watch: {
    $route() {
      if (!this.$route.fullPath.includes("projects/")) {
        store.commit(SET_PROJECT, {});
      }
    },
  },
  computed: {
    ...mapGetters(["user", "project"]),
    projectList(): boolean {
      return this.$route.name === "ProjectList";
    },
    ProjectDetail(): boolean {
      return this.$route.name === "ProjectDetail";
    },
    projectDashboard(): boolean {
      return this.$route.name === "ProjectDashboard";
    },
    projectSprints(): boolean {
      return this.$route.name === "ProjectBacklog";
    },
    projectActivities(): boolean {
      return this.$route.name === "ProjectActivities";
    },
    projectWiki(): boolean {
      return this.$route.name === "ProjectWiki";
    },
    projectMember(): boolean {
      return this.$route.name === "ProjectMember";
    },
  },
  mounted() {
    this.isEmployee = !UserService.isAdminType();
    if (
      this.$route.fullPath.match(/\/projects\/.+/g) &&
      !Object.keys(this.project).length
    ) {
      ProjectService.getProjectInfo(this.$route.params.project_id.toString());
    }
  },
  methods: {
    showModalLogOut() {
      this.showModalLogout = true;
    },
    showNavbar(e: { target: HTMLElement }) {
      const nav = document.getElementById("nav-sidebar"),
        bodypd = document.getElementById("body-pd"),
        headerpd = document.getElementById("header");
      nav?.classList.toggle("show-sidebar");
      // change icon
      e.target.classList.toggle("bx-x");
      // add padding to body
      bodypd?.classList.toggle("body-pd");
      // add padding to header
      headerpd?.classList.toggle("header-pd");
    },
  },
});
</script>

<style lang="scss">
:root {
  --header-height: 3rem;
  --nav-width: 68px;
  --first-color: #4723d9;
  --first-color-light: #afa5d9;
  --white-color: #f7f6fb;
  --body-font: "Nunito", sans-serif;
  --normal-font-size: 1rem;
  --z-fixed: 100;
}
.header-root {
  width: 100%;
  height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: var(--white-color);
  z-index: var(--z-fixed);
  transition: 0.5s;
  .dropdown-item {
    cursor: pointer;
  }
}
.header_toggle {
  color: var(--first-color);
  font-size: 1.5rem;
  cursor: pointer;
}
.header_img {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
}
.header_img img {
  width: 40px;
}
.l-navbar {
  position: fixed;
  top: 0;
  left: -30%;
  width: var(--nav-width);
  height: 100vh;
  background-color: var(--first-color);
  padding: 0.5rem 1rem 0 0;
  transition: 0.5s;
  z-index: var(--z-fixed);
}
.nav-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.nav_link-sidebar {
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  column-gap: 1rem;
  padding: 0.5rem 0 0.5rem 1.5rem;
}
.nav_link-sidebar {
  position: relative;
  color: var(--first-color-light);
  margin-bottom: 1.5rem;
  transition: 0.3s;
  text-decoration: none;
}
.nav_link-sidebar:hover {
  color: var(--white-color);
}
.nav_icon-sidebar {
  font-size: 1.25rem;
}
.show-sidebar {
  left: 0;
}
.body-pd {
  padding-left: calc(var(--nav-width) + 1rem);
}
.header-pd {
  padding-left: calc(var(--nav-width) + 1rem);
}

.nav_link-sidebar.active {
  color: var(--white-color);
}
.nav_link-sidebar.active::before {
  content: "";
  position: absolute;
  left: 0;
  width: 2px;
  height: 32px;
  background-color: var(--white-color);
}
.height-100 {
  height: 100vh;
}
.logo {
  height: 60px;
}

@media screen and (min-width: 768px) {
  #body-pd {
    margin: calc(var(--header-height) + 1rem) 0 0 0 !important;
    padding-left: calc(var(--nav-width) + 2rem);
    min-height: calc(100vh - 65px) !important;
  }
  .header-root {
    height: calc(var(--header-height) + 1rem);
    padding: 0 2rem 0 calc(var(--nav-width) + 1rem);
  }
  .header_img {
    width: 40px;
    height: 40px;
  }
  .header_img img {
    width: 45px;
  }
  .l-navbar {
    left: 0;
    padding: 1rem 1rem 0 0;
  }
  .show-sidebar {
    width: calc(var(--nav-width) + 156px);
  }
  .body-pd,
  .header-pd {
    padding-left: calc(var(--nav-width) + 165px) !important;
  }
}
</style>
