<template>
  <div class="task-detail px-2 px-sm-4">
    <div class="mb-4 d-flex align-items-center">
      <div class="back-button w-10 me-2">
        <router-link :to="{ name: 'ProjectActivities' }">
          <i class="bx bx-arrow-back" />
        </router-link>
      </div>
      <div class="task-type w-10"></div>
      <div class="title w-80">
        <input
          class="input-title"
          type="text"
          v-model="task.task_title"
          v-if="taskEdit.task_title"
          @keyup.enter="changeAttribute('task_title')"
        />
        <h3 v-else class="task-label mb-0" @click="taskEdit.task_title = true">
          {{ task.task_title }}
        </h3>
      </div>
    </div>
    <div class="task-body row">
      <div class="task-info col-12 col-md-8">
        <div class="task-part status">
          <div class="change-status me-2">
            <div class="btn-group">
              <button
                :class="[
                  statusColor(task.status?.value),
                  'btn btn-sm dropdown-toggle',
                ]"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ task.status?.label }}
              </button>
              <ul class="dropdown-menu" ref="statusDropdown">
                <li
                  v-for="status in TASK_STATUS"
                  :key="status"
                  class="dropdown-item"
                  @click="changeAttribute('status', status.value)"
                >
                  {{ status.label }}
                </li>
              </ul>
            </div>
          </div>
          <div class="id-info m">
            <span class="fs-12">
              #{{ task?.id }}: Created by {{ task.created_by?.name }}. Last
              updated on {{ task?.updated_at }}
            </span>
          </div>
        </div>
        <div class="task-part description">
          <h4
            class="title"
            data-bs-toggle="collapse"
            data-bs-target="#collapseDescription"
            aria-expanded="true"
            aria-controls="collapseDescription"
          >
            Description
            <i class="bx bxs-chevron-down"></i>
          </h4>
          <hr class="separator" />
          <div class="collapse show" id="collapseDescription">
            <template v-if="task.task_content">
              <div class="editor" v-if="taskEdit.task_content">
                <CKEditorBase
                  id="taskDescription"
                  v-model="task.task_content"
                  :focus="true"
                />
                <div class="confirm">
                  <i
                    class="bx bx-check"
                    @click="changeAttribute('task_content')"
                  />
                  <i class="bx bx-undo" @click="closeEditor" />
                </div>
              </div>
              <div
                v-else
                class="task-label"
                v-html="task.task_content"
                @click="taskEdit.task_content = true"
              />
            </template>
            <template v-else>
              <div class="editor" v-if="taskEdit.task_content">
                <CKEditorBase
                  id="taskDescription"
                  v-model="task.task_content"
                  :focus="true"
                />
                <div class="confirm">
                  <i
                    class="bx bx-check"
                    @click="changeAttribute('task_content')"
                  />
                  <i class="bx bx-undo" @click="closeEditor" />
                </div>
              </div>
              <div
                v-else
                class="task-label"
                @click="taskEdit.task_content = true"
              >
                <i> Description: Click to edit... </i>
              </div>
            </template>
          </div>
        </div>
        <div class="task-part people">
          <h4
            class="title"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePeople"
            aria-expanded="true"
            aria-controls="collapsePeople"
          >
            People
            <i class="bx bxs-chevron-down"></i>
          </h4>
          <hr class="separator" />
          <div class="collapse show" id="collapsePeople">
            <div class="row">
              <div class="col-md-6 col-12">
                <div class="attribute">
                  <div class="key">Assignee</div>
                  <div class="value">
                    <dropdown-base
                      v-if="taskEdit.assignee_id"
                      :id="'employee'"
                      :options="listEmployee"
                      :placeholder="'Choose Employee'"
                      v-model="task.assignee_id"
                      @change="changeAttribute('assignee_id')"
                    />
                    <span
                      v-else
                      class="task-label"
                      @click="openDropdown('assignee_id')"
                      :class="task.assignee_id ? '' : 'empty-span'"
                    >
                      {{ task.assignee_id?.label }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="attribute">
                  <div class="key">Reviewer</div>
                  <div class="value">
                    <dropdown-base
                      v-if="taskEdit.accountable_id"
                      :id="'accountable'"
                      :options="listEmployee"
                      :placeholder="'Choose Reviewer'"
                      v-model="task.accountable_id"
                      @change="changeAttribute('accountable_id')"
                    />
                    <span
                      v-else
                      class="task-label"
                      @click="openDropdown('accountable_id')"
                      :class="task.accountable_id ? '' : 'empty-span'"
                    >
                      {{ task.accountable_id?.label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="task-part estimate">
          <h4
            class="title"
            data-bs-toggle="collapse"
            data-bs-target="#collapseEstimate"
            aria-expanded="true"
            aria-controls="collapseEstimate"
          >
            Estimate and Time
            <i class="bx bxs-chevron-down"></i>
          </h4>
          <hr class="separator" />
          <div class="collapse show" id="collapseEstimate">
            <div class="row">
              <div class="col-md-6 col-12">
                <div class="attribute">
                  <div class="key">Estimate</div>
                  <div class="value">
                    <input
                      type="number"
                      v-model="task.estimate_time"
                      v-if="taskEdit.estimate_time"
                      @keyup.enter="changeAttribute('estimate_time')"
                    />
                    <span
                      v-else
                      class="task-label"
                      @click="taskEdit.estimate_time = true"
                      :class="
                        task.estimate_time ? 'estimate-hour' : 'empty-span'
                      "
                    >
                      {{ task.estimate_time }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="attribute">
                  <div class="key">Date</div>
                  <div class="value">
                    <input
                      type="date"
                      v-model="task.start_date"
                      v-if="taskEdit.start_date"
                      @keyup.enter="changeAttribute('start_date')"
                      @blur="changeAttribute('start_date')"
                    />
                    <span
                      v-else
                      class="task-label"
                      @click="taskEdit.start_date = true"
                      :class="task.start_date ? '' : 'empty-span'"
                    >
                      {{ task.start_date }}
                    </span>
                    <span v-if="task.start_date && task.end_date"> - </span>
                    <input
                      type="date"
                      v-model="task.end_date"
                      v-if="taskEdit.end_date"
                      @keyup.enter="changeAttribute('end_date')"
                      @blur="changeAttribute('end_date')"
                    />
                    <span
                      v-else
                      class="task-label"
                      @click="taskEdit.end_date = true"
                      :class="task.end_date ? '' : 'empty-span'"
                    >
                      {{ task.end_date }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="attribute">
                  <div class="key">Spend</div>
                  <div class="value">
                    <input
                      type="number"
                      v-model="task.spend_time"
                      v-if="taskEdit.spend_time"
                      @keyup.enter="changeAttribute('spend_time')"
                    />
                    <span
                      v-else
                      class="task-label"
                      @click="taskEdit.spend_time = true"
                      :class="task.spend_time ? 'estimate-hour' : 'empty-span'"
                    >
                      {{ task.spend_time }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="task-part detail">
          <h4
            class="title"
            data-bs-toggle="collapse"
            data-bs-target="#collapseDetail"
            aria-expanded="true"
            aria-controls="collapseDetail"
          >
            Detail
            <i class="bx bxs-chevron-down"></i>
          </h4>
          <hr class="separator" />
          <div class="collapse show" id="collapseDetail">
            <div class="row">
              <div class="col-md-6 col-12">
                <div class="attribute">
                  <div class="key">Backlog</div>
                  <div class="value">
                    <dropdown-base
                      v-if="taskEdit.backlog_id"
                      :id="'backlog'"
                      :options="listBacklog"
                      :placeholder="'Choose Backlog'"
                      v-model="task.backlog_id"
                      @change="changeAttribute('backlog_id')"
                    />
                    <span
                      v-else
                      class="task-label"
                      @click="openDropdown('backlog_id')"
                      :class="task.backlog_id ? '' : 'empty-span'"
                    >
                      {{ task.backlog_id?.label }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="attribute">
                  <div class="key">Priority</div>
                  <div class="value">
                    <dropdown-base
                      v-if="taskEdit.priority"
                      :id="'priority'"
                      :options="PRIORITY"
                      :placeholder="'Choose Priority'"
                      v-model="task.priority"
                      @change="changeAttribute('priority')"
                    />
                    <span
                      v-else
                      class="task-label"
                      @click="taskEdit.priority = true"
                      :class="task.priority ? '' : 'empty-span'"
                    >
                      {{ task.priority?.label }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="task-part file">
          <h4
            class="title"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFiles"
            aria-expanded="true"
            aria-controls="collapseFiles"
          >
            Files
            <i class="bx bxs-chevron-down"></i>
          </h4>
          <hr class="separator" />

          <div class="collapse show" id="collapseFiles">
            <div v-for="file in taskFile" :key="file" class="mb-1 file-link">
              <a :href="customURL(file.file_path)" target="_blank">
                {{ file.file_name }}
              </a>
              <i class="bx bx-trash-alt" @click="removeFile(file)"></i>
            </div>
            <task-update-file
              ref="uploadFile"
              :is-update="true"
              @uploadFile="uploadFile"
            />
          </div>
        </div>
      </div>
      <div class="task-activity col-12 col-md-4">
        <TaskComment :task-id="taskId" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DropdownBase from "@/components/base/DropdownBase.vue";
import CKEditorBase from "@/components/base/CKEditorBase.vue";
import TaskUpdateFile from "@/components/task/TaskUpdateFile.vue";
import TaskComment from "@/components/task/TaskComment.vue";
import { SET_CANCEL_LOADING, SET_LOADING } from "@/store/mutations.types";
import TaskService from "@/services/task.service";
import {
  API_URL_FILE,
  DEFAULT_PAGE,
  PRIORITY,
  TASK_STATUS,
} from "@/common/constants";
import ProjectService from "@/services/project.service";
import { User } from "@/components/account/type";
import { Option } from "@/views/projects/type";
import BacklogService from "@/services/backlog.service";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "TaskDetail",
  components: {
    CKEditorBase,
    DropdownBase,
    TaskUpdateFile,
    TaskComment,
  },
  data() {
    return {
      taskEdit: {
        task_title: false,
        task_content: false,
        assignee_id: false,
        accountable_id: false,
        estimate_time: false,
        start_date: false,
        end_date: false,
        progress: false,
        priority: false,
        backlog_id: false,
        spend_time: false,
      },
      // eslint-disable-next-line
      task: {} as any,
      taskFile: {} as any,
      origin: {} as any,
      projectId: "",
      taskId: "",
      listEmployee: [] as object[],
      listBacklog: [] as object[],
      PRIORITY,
      TASK_STATUS,
    };
  },

  async mounted() {
    this.$store.commit(SET_LOADING, true);
    this.projectId = this.$route.params.project_id.toString();
    this.taskId = this.$route.params.task_id.toString();
    setTimeout(async () => {
      await this.getTaskDetail();
    }, 100);
    this.$store.commit(SET_CANCEL_LOADING, false);
  },
  computed: {
    ...mapGetters(["project"]),
  },
  watch: {
    "task.status"() {
      this.statusColor(this.task.status?.value);
    },
  },
  methods: {
    async uploadFile() {
      const files = this.$refs.uploadFile as any;
      if (!files.fileList) return;
      let formData = new FormData();

      files.fileList.forEach((file, index) => {
        formData.append("files[" + index + "]", file);
      });
      const res = await TaskService.uploadTaskFileDetail(
        formData,
        this.task.id
      );
      if (res.result === "ok") {
        const toast = useToast();
        toast.success("Upload File Successful");
        await this.getTaskDetail();
        files.fileList = [];
      }
    },
    async removeFile(file: any) {
      if (!confirm("Are you sure want to remove this file ?")) {
        return;
      }
      const data = {
        id: file.id,
      };
      const res = await TaskService.removeFile(data, this.task.id);
      if (res.result === "ok") {
        const toast = useToast();
        toast.success("Remove File Successful");
        this.taskFile = this.taskFile.filter((item) => item.id !== file.id);
      }
    },
    customURL(file_path: string) {
      return API_URL_FILE + file_path;
    },
    statusColor(status: number) {
      switch (status) {
        case 2:
          return "btn-primary";
        case 3:
          return "btn-success";
        case 4:
          return "btn-secondary";
        default:
          return "btn-info";
      }
    },
    closeEditor() {
      this.task.task_content = this.origin.task_content;
      this.taskEdit.task_content = false;
    },
    async getTaskDetail() {
      const data = {
        project_id: this.projectId,
      };
      const response = await TaskService.viewTaskDetail(data, this.taskId);
      if (response) {
        this.task = response.task;
        this.taskFile = response.task_file;
        this.task.priority = PRIORITY.find(
          // eslint-disable-next-line
          (item: any) => item.value === this.task.priority
        );
        this.task.status = TASK_STATUS.find(
          // eslint-disable-next-line
          (item: any) => item.value === this.task.status
        );
        this.task.backlog_id = this.task.backlog
          ? {
              value: this.task.backlog?.id,
              label: this.task.backlog?.backlog_title,
            }
          : null;
        this.task.assignee_id = this.task.assignee_id
          ? {
              value: this.task.assignee_id?.id,
              label: this.task.assignee_id?.name,
            }
          : null;
        this.task.accountable_id = this.task.accountable_id
          ? {
              value: this.task.accountable_id?.id,
              label: this.task.accountable_id?.name,
            }
          : null;
        this.origin = { ...this.task };
      }
    },
    async changeAttribute(column: string, columnValue = null) {
      if (column === "status") {
        this.task[column] = TASK_STATUS.find(
          // eslint-disable-next-line
          (item: any) => item.value === columnValue
        );
        const statusDropdown = this.$refs.statusDropdown as HTMLElement;
        statusDropdown.classList.remove("show");
      }
      if (this.task[column] === this.origin[column]) {
        this.taskEdit[column] = false;
        return;
      }
      const value =
        typeof this.task[column] === "object"
          ? this.task[column].value
          : this.task[column];
      const data = {
        project_id: this.project.id,
        column: column,
        value: value,
      };
      await TaskService.updateByField(data, this.task?.id.toString()).then(
        (res) => {
          const toast = useToast();
          this.taskEdit[column] = false;
          if (res.result === "ok") {
            toast.success("Update Task Successful");
            this.getTaskDetail();
          } else {
            toast.error(res.errors);
          }
        }
      );
    },
    async openDropdown(dropdown: string) {
      this.taskEdit[dropdown] = true;
      const arr = ["assignee_id", "accountable_id"];
      if (arr.includes(dropdown) && this.listEmployee.length === 0) {
        const employees = await ProjectService.getProjectEmployee(
          this.task.project_id
        );
        this.getList(employees, this.listEmployee, "name");
      }
      if (dropdown === "backlog_id") {
        const backlogs = await BacklogService.getListBacklog(
          DEFAULT_PAGE,
          0,
          this.task.project_id
        );
        this.getList(backlogs.backlogs.data, this.listBacklog, "backlog_title");
      }
    },
    // eslint-disable-next-line
    getList(object: any, list: object[], label: string) {
      if (object) {
        object.forEach((item: User) => {
          const option: Option = { value: item.id, label: item[label] };
          list.push(option);
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.task-detail {
  .task-body {
    padding-top: 0.5rem;
    border-top: 1px solid #333333;
  }
  .task-info {
    height: 78vh;
    overflow: auto;
  }
  .task-activity {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .back-button {
    padding: 5px 20px;
    background: #f8f8f8;
    color: #222222;
    border: 1px solid #dddddd;
  }
  input {
    background-color: rgb(237, 237, 237);
    border: 1px solid #b2b0b0;
  }
  .input-title {
    width: 100%;
    height: 43px;
    font-size: 1.75rem;
    font-weight: 500;
  }
  .task-part {
    margin-bottom: 1rem;
    .attribute {
      display: flex;
      .key {
        width: 25%;
        font-size: 1rem;
        font-weight: 500;
      }
      .value {
        width: 75%;
      }
    }
  }
  .task-part.file {
    .file-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover {
        background-color: #f5f5f5;
      }
      .bx {
        cursor: pointer;
      }
    }
  }
  .separator {
    margin: 0 0 0.5rem;
    border-bottom: 1px solid #dddddd;
    background: none;
  }
  .title {
    .bx {
      transition: 0.3s linear;
      transform: translate(0, 3px);
    }
  }
  .title[aria-expanded="true"] {
    .bx {
      transform: rotate(180deg) translate(0, -3px);
    }
  }
  .task-label {
    cursor: pointer;
    border: 1px solid transparent;
    &:hover {
      border-color: #b2b0b0;
    }
  }
  .estimate-hour:after {
    content: " h";
  }
  .empty-span {
    min-width: 80px;
    min-height: 15px;
    display: inline-block;
    &:after {
      content: "-";
    }
  }
  :deep(.ck-editor__editable_inline) {
    min-height: 150px;
  }
  :deep(.dropdown-input) {
    .vs__dropdown-toggle {
      padding: 0;
    }
  }
  :deep(.vs--open .vs__dropdown-toggle) {
    box-shadow: unset;
    border-color: rgba(60, 60, 60, 0.26);
  }
  .editor {
    position: relative;
    .confirm {
      width: 80px;
      height: 40px;
      position: absolute;
      bottom: -40px;
      right: 0;
      border: 1px solid #333333;
      background-color: #ffffff;
      display: flex;
      .bx {
        width: 50%;
        font-size: 35px;
        padding: 1px;
      }
      .bx:first-child {
        color: #75f572;
        &:hover {
          background-color: #75f572;
          color: #ffffff;
        }
      }
      .bx:nth-child(2) {
        color: #ff4e4e;
        &:hover {
          background-color: #ff4e4e;
          color: #ffffff;
        }
      }
    }
  }
  .status {
    display: flex;
  }
}
</style>
