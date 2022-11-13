<template>
  <tr class="task-item">
    <td>
      <router-link
        :to="{ name: 'TaskDetail', params: { task_id: task.id } }"
        class="task-link"
      >
        {{ task.id }}
      </router-link>
    </td>
    <td>
      <p :style="indent">
        <span v-if="tasks.length" @click="toggleChildren">
          <i class="bx bx-chevron-up" v-if="showChildren"></i>
          <i class="bx bx-chevron-down" v-else></i>
        </span>
        {{ task.task_title }}
      </p>
    </td>
    <td class="text-center">
      <div class="spinner-border text-primary" role="status" v-if="edit.status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <dropdown-base
        :options="TASK_STATUS"
        :placeholder="'Choose Status'"
        v-model="taskEdit.status"
        @change="changeInfo('status')"
        v-else
      />
    </td>
    <td class="text-center">
      <div
        class="spinner-border text-primary"
        role="status"
        v-if="edit.assignee_id"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <dropdown-base
        :options="listEmployee"
        :placeholder="'Choose Assignee'"
        v-model="taskEdit.assignee_id"
        @change="changeInfo('assignee_id')"
        v-else
      />
    </td>
    <td class="text-center">
      <div
        class="spinner-border text-primary"
        role="status"
        v-if="edit.backlog_id"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <dropdown-base
        :options="listBacklog"
        :placeholder="'Choose Backlog'"
        v-model="taskEdit.backlog_id"
        @change="changeInfo('backlog_id')"
        v-else
      />
    </td>
    <td>{{ task.start_date }}</td>
    <td>{{ task.end_date }}</td>
  </tr>
  <template v-if="showChildren">
    <task-list-item
      v-for="(task, index) in tasks"
      :key="index"
      :tasks="task.children"
      :task="task"
      :depth="task.depth"
      :list-employee="listEmployee"
      :list-backlog="listBacklog"
    >
    </task-list-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DropdownBase from "@/components/base/DropdownBase.vue";
import { TASK_STATUS } from "@/common/constants";
import TaskService from "@/services/task.service";
import { useToast } from "vue-toastification";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "TaskListItem",
  data() {
    return {
      showChildren: true,
      TASK_STATUS,
      taskEdit: {
        status: null,
        assignee_id: null,
        backlog_id: null,
      } as any,
      edit: {
        status: false,
        assignee_id: false,
        backlog_id: false,
      },
    };
  },
  components: {
    DropdownBase,
  },
  props: {
    tasks: Object,
    depth: {
      type: Number,
      default: 0,
    },
    task: Object,
    listEmployee: Array,
    listBacklog: Array,
  },
  computed: {
    ...mapGetters(["project"]),
    indent() {
      return { transform: `translate(${this.depth * 20}px)` };
    },
  },
  mounted() {
    this.cleanData();
  },
  watch: {
    listEmployee: {
      handler(newVal) {
        if (newVal) {
          this.cleanData();
        }
      },
      deep: true,
    },
    listBacklog: {
      handler(newVal) {
        if (newVal) {
          this.cleanData();
        }
      },
      deep: true,
    },
  },
  methods: {
    async changeInfo(column: string) {
      this.edit[column] = true;
      const data = {
        project_id: this.project.id,
        column: column,
        value: this.taskEdit[column].value,
      };
      await TaskService.updateByField(data, this.task?.id.toString()).then(
        (res) => {
          const toast = useToast();
          this.edit[column] = false;
          if (res.result === "ok") {
            toast.success("Update Task Successful");
          } else {
            toast.error(res.errors);
          }
        }
      );
    },
    cleanData() {
      this.taskEdit.status = TASK_STATUS.find(
        (item: any) => item.value === this.task?.status
      );
      this.taskEdit.backlog_id = this.listBacklog?.find(
        (item: any) => item.value === this.task?.backlog_id
      );
      this.taskEdit.assignee_id = this.listEmployee?.find(
        (item: any) => item.value === this.task?.assignee_id
      );
    },
    toggleChildren() {
      this.showChildren = !this.showChildren;
    },
  },
});
</script>
<style lang="scss" scoped>
.task-item {
  .bx {
    transform: scale(1.5);
  }
  td {
    vertical-align: middle;
    p {
      margin: 0;
    }
  }
  ::v-deep .dropdown-input {
    .vs__clear {
      display: none;
    }
  }
  .task-link:hover {
    text-decoration: underline !important;
  }
}
</style>
