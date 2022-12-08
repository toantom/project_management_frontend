<template>
  <a-list
    item-layout="horizontal"
    :data-source="dataComment"
    :loading="isLoading"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta>
          <template #title>
            <p>
              {{ item.created_by.name }}
              <span class="ms-2">Last updated at: {{ item.updated_at }}</span>
            </p>
          </template>
          <template #avatar>
            <a-avatar
              :src="`https://ui-avatars.com/api/?name=${item.created_by.name}&background=random&color=fff&rounded=true`"
            />
          </template>
          <template #description>
            <div v-html="item.comment"></div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <div class="editor">
    <CKEditorBase v-model="commentContent" id="taskComment" />
    <div :class="[commentContent ? '' : 'disabled', 'confirm']">
      <i class="bx bx-check" @click="addComment" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CKEditorBase from "@/components/base/CKEditorBase.vue";
import UserService from "@/common/user.service";
import TaskService from "@/services/task.service";
import { mapGetters } from "vuex";
import { SET_CANCEL_LOADING, SET_LOADING } from "@/store/mutations.types";
interface DataItem {
  id: string;
  task_id: string;
  created_by: object;
  created_at: string;
  updated_at: string;
  comment: string;
}

export default defineComponent({
  name: "TaskComment",
  components: {
    CKEditorBase,
  },
  data() {
    return {
      dataComment: [] as DataItem[],
      commentContent: "",
    };
  },
  props: {
    taskId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  watch: {
    taskId(newVal) {
      this.$store.commit(SET_LOADING, true);
      this.getListComment(newVal);
      this.$store.commit(SET_CANCEL_LOADING, false);
    },
  },
  methods: {
    async getListComment(task_id: string) {
      const res = await TaskService.getListComment(task_id);
      if (res) {
        console.log(res.comments);
        this.dataComment = res.comments;
      }
    },
    async addComment() {
      const data = {
        comment: this.commentContent,
        user_id: UserService.getUser().id,
      };
      const res = await TaskService.addComment(data, this.taskId);
      if (res.result === "ok") {
        await this.getListComment(this.taskId);
        this.commentContent = "";
      }
    },
  },
});
</script>
<style lang="scss">
.ant-list-items {
  height: 46vh;
  overflow: auto;
}
.ant-list-item-meta-description {
  color: #333333;
}
</style>

<style lang="scss" scoped>
.confirm {
  width: 40px;
  height: 40px;
  border: 1px solid #333333;
  background-color: #ffffff;
  float: right;
  cursor: pointer;
  .bx {
    width: 100%;
    height: 100%;
    font-size: 35px;
  }
  .bx:first-child {
    color: #75f572;
    &:hover {
      background-color: #75f572;
      color: #ffffff;
    }
  }
  &.disabled {
    cursor: default;
    background-color: #5f5f5f;
    .bx:first-child {
      color: #b2ada3;
      &:hover {
        background-color: #5f5f5f;
        color: #b2ada3;
      }
    }
  }
}
</style>
