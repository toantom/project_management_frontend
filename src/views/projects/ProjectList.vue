<template>
  <div class="project px-2 px-sm-4">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="m-0">Projects</h1>
      <div v-if="isManager">
        <button
          type="button"
          class="btn btn-primary d-flex align-items-center"
          @click="isShowProjectCreate = true"
        >
          <i class="bx bx-plus pe-1" /> Create Projects
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Public</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td>{{ project.title }}</td>
            <td>{{ PROJECT_STATUS[project.status] }}</td>
            <td>
              <i
                class="bx bx-check bx-md"
                style="color: #06ff38"
                v-if="project.public === 1"
              />
              <i class="bx bxs-shield-x bx-md" style="color: #f60508" v-else />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination-base :value="page" :pageCount="pages" @input="toPage" />
  </div>
  <project-create-modal
    v-if="isShowProjectCreate"
    @close="isShowProjectCreate = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import PaginationBase from "@/components/base/PaginationBase.vue";
import ProjectCreateModal from "@/components/project/ProjectCreateModal.vue";
//service
import ProjectService from "@/services/project.service";
import UserService from "@/common/user.service";
//constants
import { PROJECT_STATUS } from "@/common/constants";
import { SET_CANCEL_LOADING, SET_LOADING } from "@/store/mutations.types";
export default defineComponent({
  name: "ProjectViewAll",
  data() {
    return {
      projects: [],
      page: 1,
      pages: 0,
      total: 0,
      PROJECT_STATUS,
      isManager: false,
      isShowProjectCreate: false,
    };
  },
  components: {
    PaginationBase,
    ProjectCreateModal,
  },
  watch: {
    $route(to) {
      if (to.name === "ProjectList") {
        this.page = Number(this.$route.query.page || 1);
        this.getListProjects(this.page);
      }
    },
  },
  async mounted() {
    this.$store.commit(SET_LOADING, true);
    this.isManager = UserService.isManagerRole();
    await this.getListProjects(this.page);
    if (this.projects) {
      this.$store.commit(SET_CANCEL_LOADING, false);
    }
  },
  methods: {
    async getListProjects(page: number) {
      const response = await ProjectService.getListProjects(page);
      if (response) {
        const { per_page, current_page, total } = response.data;
        this.projects = response.data.data;

        this.page = current_page;
        this.pages = Math.ceil(total / per_page);
      }
    },
    async toPage(page: number) {
      this.$router.push({
        name: this.$route.name || "",
        query: { page: page },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.project {
  td {
    vertical-align: middle;
  }
}
</style>
