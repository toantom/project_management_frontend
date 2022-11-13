<template>
  <div class="backlog-detail px-2 px-sm-4">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2 class="m-0">{{ backlog.backlog_title }}</h2>
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
            <i class="bx bx-plus pe-1" /> Edit Backlog
          </template>
        </button>
      </div>
    </div>
    <div class="row mt-4" v-if="backlogTask">
      <div class="col-md-3 col-6 mb-4">
        <draggable-base
          :task-list="backlogTask.task_new"
          :title="'NEW'"
          @update="updateStatusTask(1, $event)"
        />
      </div>
      <div class="col-md-3 col-6 mb-4">
        <draggable-base
          :task-list="backlogTask.task_in_progress"
          :title="'IN PROGRESS'"
          @update="updateStatusTask(2, $event)"
        />
      </div>
      <div class="col-md-3 col-6 mb-4">
        <draggable-base
          :task-list="backlogTask.task_done"
          :title="'DONE'"
          @update="updateStatusTask(3, $event)"
        />
      </div>
      <div class="col-md-3 col-6 mb-4">
        <draggable-base
          :task-list="backlogTask.task_close"
          :title="'CLOSE'"
          @update="updateStatusTask(4, $event)"
        />
      </div>
    </div>
  </div>
  <project-backlog-create-modal
    v-if="isShowBacklogCreate"
    @close="isShowBacklogCreate = false"
    :backlog-detail="backlog"
    @updateBacklog="updateBacklogSuccess"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import ProjectBacklogCreateModal from "@/components/project/ProjectBacklogCreateModal.vue";
import DraggableBase from "@/components/base/DraggableBase.vue";
//services
import UserService from "@/common/user.service";
import BacklogService from "@/services/backlog.service";
//types and constants
import { mapGetters } from "vuex";
import { Backlog } from "@/views/projects/type";
import { SET_CANCEL_LOADING, SET_LOADING } from "@/store/mutations.types";
import { TASK_STATUS } from "@/common/constants";
import TaskService from "@/services/task.service";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "BacklogDetail",
  data() {
    return {
      project_id: "",
      backlog: {} as Backlog,
      backlogTask: {},
      isManager: false,
      isShowBacklogCreate: false,
      TASK_STATUS,
    };
  },
  components: {
    ProjectBacklogCreateModal,
    DraggableBase,
  },
  computed: {
    ...mapGetters(["project"]),
  },
  async mounted() {
    this.$store.commit(SET_LOADING, true);
    this.isManager = UserService.isManagerRole();
    this.project_id = this.$route.params.project_id.toString();
    await this.getBacklogDetail();
    if (this.backlog) {
      this.$store.commit(SET_CANCEL_LOADING, false);
    }
  },
  methods: {
    updateBacklogSuccess(data: any) {
      this.backlog.backlog_title = data.backlog_title;
      this.backlog.start_date = data.start_date;
      this.backlog.end_date = data.end_date;
    },
    async updateStatusTask(status: number, $event) {
      const item = $event.item._underlying_vm_;
      const data = {
        project_id: this.project.id,
        column: "status",
        value: status,
      };
      await TaskService.updateByField(data, item.id).then((res) => {
        const toast = useToast();
        if (res.result === "ok") {
          toast.success("Update Status Successful");
        } else {
          toast.error(res.errors);
        }
      });
    },
    async getBacklogDetail() {
      const backlog_id = this.$route.params.backlog_id.toString();
      const response = await BacklogService.viewBacklogDetail(
        backlog_id,
        this.project_id
      );
      if (response) {
        this.backlog = response.backlog;
        this.backlogTask = response.backlogTask;
      }
    },
  },
});
</script>
