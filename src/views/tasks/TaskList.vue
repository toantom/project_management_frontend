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
  </div>
  <task-create-modal
    v-if="isShowTaskCreate"
    @close="isShowTaskCreate = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskCreateModal from "@/components/task/TaskCreateModal.vue";

export default defineComponent({
  name: "TaskList",
  data() {
    return {
      isShowTaskCreate: false,
    };
  },
  components: {
    TaskCreateModal,
  },
});
</script>
