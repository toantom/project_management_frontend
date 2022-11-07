<template>
  <div class="project-backlog px-2 px-sm-4">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="m-0">Backlogs</h1>
      <div v-if="isManager">
        <button
          type="button"
          class="btn btn-primary d-flex align-items-center"
          @click="isShowBacklogCreate = true"
        >
          <template class="d-block d-sm-none">
            <i class="bx bx-plus" />
          </template>
          <template class="d-none d-sm-block">
            <i class="bx bx-plus pe-1" /> Create New Backlog
          </template>
        </button>
      </div>
    </div>
    <div class="row mt-4">
      <div
        v-for="(backlog, index) in backlogs"
        :key="index"
        class="col-lg-4 col-md-6 col-sm-12"
      >
        <project-backlog-card :backlog="backlog" />
      </div>
    </div>
    <pagination-base :value="page" :pageCount="pages" @input="toPage" />
  </div>
  <project-backlog-create-modal
    v-if="isShowBacklogCreate"
    @close="isShowBacklogCreate = false"
    @createSuccess="getListWithPageURL()"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import ProjectBacklogCard from "@/components/project/ProjectBacklogCard.vue";
import PaginationBase from "@/components/base/PaginationBase.vue";
import ProjectBacklogCreateModal from "@/components/project/ProjectBacklogCreateModal.vue";
//services
import BacklogService from "@/services/backlog.service";
import UserService from "@/common/user.service";
//constants and types
import { SET_CANCEL_LOADING, SET_LOADING } from "@/store/mutations.types";
import { Backlog } from "@/views/projects/type";
import ProjectService from "@/services/project.service";

export default defineComponent({
  name: "ProjectBacklog",
  data() {
    return {
      backlogs: [] as Backlog[],
      page: 1,
      pages: 0,
      total: 0,
      isManager: false,
      isShowBacklogCreate: false,
    };
  },
  components: {
    ProjectBacklogCard,
    PaginationBase,
    ProjectBacklogCreateModal,
  },
  watch: {
    $route(to) {
      if (to.name === "ProjectBacklog") {
        this.getListWithPageURL();
      }
    },
  },
  async mounted() {
    this.$store.commit(SET_LOADING, true);
    this.isManager = UserService.isManagerRole();
    const projectId = this.$route.params.project_id.toString();
    await ProjectService.getProjectDetail(projectId);
    this.getListWithPageURL();
    if (this.backlogs) {
      this.$store.commit(SET_CANCEL_LOADING, false);
    }
  },
  methods: {
    getListWithPageURL() {
      this.page = Number(this.$route.query.page || 1);
      this.getListBacklog(this.page);
    },
    async getListBacklog(page: number) {
      const project_id = Number(this.$route.params.project_id);
      const response = await BacklogService.getListBacklog(page, 6, project_id);
      if (response) {
        const { per_page, current_page, total } = response.backlogs;
        this.backlogs = response.backlogs.data;

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
