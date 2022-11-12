<template>
  <tr class="task-item">
    <td>{{ task.id }}</td>
    <td>
      <p :style="indent">
        <span v-if="tasks.length" @click="toggleChildren">
          <i class="bx bx-chevron-up" v-if="showChildren"></i>
          <i class="bx bx-chevron-down" v-else></i>
        </span>
        {{ task.task_title }}
      </p>
    </td>
    <td>
      <dropdown-base
        :options="TASK_STATUS"
        :placeholder="'Choose Status'"
        v-model="taskEdit.status"
      />
    </td>
    <td>
      <dropdown-base
        :options="listEmployee"
        :placeholder="'Choose Assignee'"
        v-model="taskEdit.assignee_id"
      />
    </td>
    <td>
      <dropdown-base
        :options="listBacklog"
        :placeholder="'Choose Backlog'"
        v-model="taskEdit.backlog_id"
      />
    </td>
    <td>{{ task.start_date }}</td>
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
}
</style>
