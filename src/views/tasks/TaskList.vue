<template>
  <div class="task-list px-2 px-sm-4">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1 class="m-0">Work Package</h1>
      <button
        type="button"
        class="btn btn-primary d-flex align-items-center"
        @click="isShowTaskCreate = true"
      >
        <template class="d-block d-sm-none">
          <i class="bx bx-plus" />
        </template>
        <template class="d-none d-sm-block">
          <i class="bx bx-plus pe-1" /> Create New Task
        </template>
      </button>
    </div>
    <div>
      <table class="table table-bordered table-hover table-responsive">
        <thead class="table-secondary">
          <tr>
            <th class="column-id">ID</th>
            <th class="column-title">Title</th>
            <th class="column-status">Status</th>
            <th class="column-assignee">Assignee</th>
            <th class="column-backlog">Backlog</th>
            <th class="column-date">Start Date</th>
            <th class="column-date">End Date</th>
          </tr>
        </thead>
        <tbody>
          <task-list-item
            v-for="task in tasks"
            :key="task"
            :tasks="task.children"
            :task="task"
            :depth="task.depth"
            :list-employee="listEmployee"
            :list-backlog="listBacklog"
          />
        </tbody>
      </table>
      <pagination-base :value="page" :pageCount="pages" @input="toPage" />
    </div>
  </div>
  <task-create-modal
    v-if="isShowTaskCreate"
    @close="isShowTaskCreate = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import TaskCreateModal from "@/components/task/TaskCreateModal.vue";
import TaskListItem from "@/components/task/TaskListItem.vue";
import PaginationBase from "@/components/base/PaginationBase.vue";
//services
import TaskService from "@/services/task.service";
import BacklogService from "@/services/backlog.service";
import ProjectService from "@/services/project.service";
//types and constants
import { SET_CANCEL_LOADING, SET_LOADING } from "@/store/mutations.types";
import { User } from "@/components/account/type";
import { Option } from "@/views/projects/type";
import { DEFAULT_PAGE } from "@/common/constants";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "TaskList",
  data() {
    return {
      isShowTaskCreate: false,
      page: 1,
      pages: 0,
      total: 0,
      limit: 10,
      tasks: [] as any,
      listEmployee: [] as object[],
      listBacklog: [] as object[],
    };
  },
  components: {
    TaskCreateModal,
    TaskListItem,
    PaginationBase,
  },
  computed: {
    ...mapGetters(["project"]),
  },
  watch: {
    $route(to) {
      if (to.name === "WorkPackages") {
        this.getListWithPageURL();
      }
    },
  },
  async mounted() {
    this.$store.commit(SET_LOADING, true);
    this.getListWithPageURL();
    const employees: any = await ProjectService.getProjectEmployee(
      this.project.id
    );
    this.getList(employees, this.listEmployee, "name");
    const backlogs = await BacklogService.getListBacklog(
      DEFAULT_PAGE,
      0,
      this.project.id
    );
    this.getList(backlogs.backlogs.data, this.listBacklog, "backlog_title");
    this.$store.commit(SET_CANCEL_LOADING, false);
  },
  methods: {
    getListWithPageURL() {
      this.page = Number(this.$route.query.page || 1);
      this.viewTasks(this.page);
    },
    async viewTasks(page: number) {
      const data = {
        project_id: this.project.id,
        page: page,
        limit: this.limit,
      };
      const response = await TaskService.viewTasks(data);
      if (response) {
        const { per_page, current_page, total } = response.paginate;
        this.tasks = response.tasks;

        this.page = current_page;
        this.pages = Math.ceil(total / per_page);
      }
    },
    getList(object: any, list: object[], label: string) {
      if (object) {
        object.forEach((item: User) => {
          const option: Option = { value: item.id, label: item[label] };
          list.push(option);
        });
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
.task-list {
  .table {
    .column-id {
      width: 5%;
    }
    .column-title {
      width: 25%;
    }
    .column-status,
    .column-assignee,
    .column-backlog {
      width: 17%;
    }
  }
}
</style>
