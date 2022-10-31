<template>
  <div class="card p-3 mb-md-4 mb-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-row align-items-center">
        <div class="icon"><i class="bx bxl-mailchimp"></i></div>
        <div class="ms-2 c-details">
          <h6 class="mb-0">{{ backlog.backlog_title }}</h6>
          <span>{{ backlog.start_date }} - {{ backlog.end_date }}</span>
        </div>
      </div>
      <div class="badge"><span>Backlog</span></div>
    </div>
    <div class="mt-5">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 50%"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="mt-3">
        <span class="text1">
          32 tasks Done <span class="text2">of 50 total tasks</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectBacklogCard",
  props: {
    backlog: Object,
  },
});
</script>

<style lang="scss">
.card {
  border: none;
  border-radius: 10px;
  .c-details span {
    font-weight: 300;
    font-size: 13px;
  }

  .icon {
    width: 50px;
    height: 50px;
    background-color: #eee;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 39px;
  }

  .badge span {
    background-color: #fffbec;
    width: 60px;
    height: 25px;
    padding-bottom: 3px;
    border-radius: 5px;
    display: flex;
    color: #fed85d;
    justify-content: center;
    align-items: center;
  }

  .progress {
    height: 10px;
    border-radius: 10px;
  }

  .progress div {
    background-color: red;
  }

  .text1 {
    font-size: 14px;
    font-weight: 600;
  }

  .text2 {
    color: #a5aec0;
  }
}
</style>
