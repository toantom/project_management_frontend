<template>
  <modal-base
    :title="'Create New Task'"
    :primary-label="'Create'"
    :second-label="'Cancel'"
    :close-button="true"
    :active="validate"
    :open="open"
    :classes="['task-create', 'modal-xl']"
    @ok="save"
    @hidden="$emit('close')"
    @cancel="open = false"
  >
    <form class="row g-3 task-create">
      <div class="col-12">
        <div class="row">
          <div class="col-md-7 col-12">
            <label for="taskTitle" class="form-label">
              Task Title<span class="required-input">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="taskTitle"
              autocomplete="off"
              v-model="task.task_title"
              :class="errors.errors?.task_title ? 'is-invalid' : ''"
            />
            <div class="invalid-feedback" v-if="errors.errors?.task_title">
              {{ errors.errors.task_title[0] }}
            </div>
          </div>
          <div class="col-md-5 col-12">
            <label for="type" class="form-label">
              Type<span class="required-input">*</span>
            </label>
            <dropdown-base
              :id="'type'"
              :options="TASK_TYPE"
              :placeholder="'Choose Type'"
              v-model="task.type"
              :class="errors.errors?.type ? 'is-invalid' : ''"
            />
            <div class="invalid-feedback" v-if="errors.errors?.type">
              {{ errors.errors.type[0] }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <label for="taskContent" class="form-label">Task Content</label>
        <c-k-editor-base id="taskContent" v-model="task.task_content" />
        <div class="invalid-feedback" v-if="errors.errors?.task_title">
          {{ errors.errors.task_title[0] }}
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-md-6 col-12">
            <label for="assignee" class="form-label"> Assignee </label>
            <dropdown-base
              :id="'assignee'"
              :options="listEmployee"
              :placeholder="'Choose Assignee'"
              v-model="task.assignee_id"
              :class="errors.errors?.assignee_id ? 'is-invalid' : ''"
            />
            <div class="invalid-feedback" v-if="errors.errors?.assignee_id">
              {{ errors.errors.assignee_id[0] }}
            </div>
          </div>
          <div class="col-md-6 col-12">
            <label for="accountable" class="form-label"> Reviewer </label>
            <dropdown-base
              :id="'accountable'"
              :options="listEmployee"
              :placeholder="'Choose Reviewer'"
              v-model="task.accountable_id"
              :class="errors.errors?.accountable_id ? 'is-invalid' : ''"
            />
            <div class="invalid-feedback" v-if="errors.errors?.accountable_id">
              {{ errors.errors.accountable_id[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <label class="form-label"> ESTIMATES TIME AND DATE </label>
        <hr class="form--separator" />
        <div class="row">
          <div class="col-md-5 col-12">
            <label for="estimateTime" class="form-label"> Estimate Time </label>
            <input
              type="number"
              class="form-control"
              id="estimateTime"
              v-model="task.estimate_time"
              :class="errors.errors?.estimate_time ? 'is-invalid' : ''"
            />
            <div class="invalid-feedback" v-if="errors.errors?.estimate_time">
              {{ errors.errors.estimate_time[0] }}
            </div>
          </div>
          <div class="col-md-7 col-12">
            <label for="startDate" class="form-label"> Date </label>
            <div class="row flex-nowrap">
              <div class="start-date">
                <input
                  type="date"
                  class="form-control"
                  id="startDate"
                  v-model="task.start_date"
                  :class="errors.errors?.start_date ? 'is-invalid' : ''"
                />
                <div class="invalid-feedback" v-if="errors.errors?.start_date">
                  {{ errors.errors.start_date[0] }}
                </div>
              </div>
              <span class="text-center between-date"> - </span>
              <div class="end-date">
                <input
                  type="date"
                  class="form-control"
                  id="endDate"
                  :min="task.start_date"
                  :readonly="task.start_date === ''"
                  v-model="task.end_date"
                  :class="errors.errors?.end_date ? 'is-invalid' : ''"
                />
                <div class="invalid-feedback" v-if="errors.errors?.end_date">
                  {{ errors.errors.end_date[0] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <label class="form-label"> DETAIL </label>
        <hr class="form--separator" />
        <div class="row">
          <div class="col-md-6 col-12">
            <label for="backlog" class="form-label"> Backlog </label>
            <dropdown-base
              :id="'backlog'"
              :options="listBacklog"
              :placeholder="'Choose Backlog'"
              v-model="task.backlog_id"
              :class="errors.errors?.backlog_id ? 'is-invalid' : ''"
            />
            <div class="invalid-feedback" v-if="errors.errors?.backlog_id">
              {{ errors.errors.backlog_id[0] }}
            </div>
          </div>
          <div class="col-md-6 col-12">
            <label for="priority" class="form-label"> Priority </label>
            <dropdown-base
              :id="'priority'"
              :options="PRIORITY"
              :placeholder="'Choose Priority'"
              v-model="task.priority"
              :class="errors.errors?.priority ? 'is-invalid' : ''"
            />
            <div class="invalid-feedback" v-if="errors.errors?.priority">
              {{ errors.errors.priority[0] }}
            </div>
          </div>
          <div class="col-md-6 col-12">
            <label for="progress" class="form-label"> Progress (%) </label>
            <input
              type="number"
              class="form-control"
              id="progress"
              max="100"
              min="0"
              v-model="task.progress"
              :class="errors.errors?.progress ? 'is-invalid' : ''"
            />
            <div class="invalid-feedback" v-if="errors.errors?.progress">
              {{ errors.errors.progress[0] }}
            </div>
          </div>
        </div>
      </div>
    </form>
  </modal-base>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalBase from "@/components/base/ModalBase.vue";
import DropdownBase from "@/components/base/DropdownBase.vue";
import CKEditorBase from "@/components/base/CKEditorBase.vue";
import { TASK_TYPE, PRIORITY, DEFAULT_PAGE } from "@/common/constants";
import { mapGetters } from "vuex";
import ProjectService from "@/services/project.service";
import { User } from "@/components/account/type";
import { Option } from "@/views/projects/type";
import BacklogService from "@/services/backlog.service";
import { store } from "@/store";
import { SET_ERROR } from "@/store/mutations.types";
import { TaskCreate } from "@/views/tasks/type";
import { useToast } from "vue-toastification";
import TaskService from "@/services/task.service";

export default defineComponent({
  name: "TaskCreateModal",
  data() {
    return {
      open: true,
      task: {
        task_title: "",
        task_content: "",
        assignee_id: null,
        accountable_id: null,
        estimate_time: null,
        start_date: "",
        end_date: "",
        type: null,
        created_by: "",
        updated_by: "",
        parent_id: null,
        backlog_id: null,
        priority: null,
        progress: 0,
        project_id: "",
      } as TaskCreate,
      TASK_TYPE,
      PRIORITY,
      listEmployee: [] as object[],
      listBacklog: [] as object[],
    };
  },
  components: {
    ModalBase,
    CKEditorBase,
    DropdownBase,
  },
  emits: ["close", "createTask"],
  computed: {
    ...mapGetters(["user", "errors"]),
    validate(): boolean {
      const task = this.task;
      const errors = {} as { [key: string]: string | number };
      if (!task.task_title || task.task_title == "") {
        errors.task_title = "This is required";
      }
      if (!task.type) {
        errors.type = "This is required";
      }
      return !Object.keys(errors).length;
    },
  },
  async mounted() {
    // eslint-disable-next-line
    this.task.project_id = this.$route.params.project_id.toString();
    const employees = await ProjectService.getProjectEmployee(
      this.task.project_id
    );
    this.getList(employees, this.listEmployee, "name");
    const backlogs = await BacklogService.getListBacklog(
      DEFAULT_PAGE,
      0,
      this.task.project_id
    );
    this.getList(backlogs.backlogs.data, this.listBacklog, "backlog_title");
  },
  beforeUnmount() {
    if (this.errors) {
      store.commit(SET_ERROR, { response: { data: "" } });
    }
  },
  methods: {
    getPostData() {
      const task = this.task;

      return {
        task_title: task.task_title,
        task_content: task.task_content,
        assignee_id: task.assignee_id?.value || null,
        accountable_id: task.accountable_id?.value || null,
        estimate_time: task.estimate_time,
        start_date: task.start_date,
        end_date: task.end_date,
        type: task.type?.value || null,
        created_by: this.user.id,
        updated_by: this.user.id,
        parent_id: task.parent_id,
        backlog_id: task.backlog_id?.value || null,
        priority: task.priority?.value || null,
        progress: task.progress || 0,
        project_id: task.project_id,
        status: 1,
        spend_time: null,
      };
    },
    async save() {
      const data = this.getPostData();
      await TaskService.createTask(data).then((res) => {
        if (res.result === "ok") {
          const toast = useToast();
          toast.success("Create Task Successful");
          this.open = false;
          this.$emit("createTask");
        }
      });
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
.task-create {
  .form--separator {
    margin-bottom: 15px;
  }
  .start-date,
  .end-date {
    width: calc(50% - 3px);
  }
  .between-date {
    width: fit-content;
    padding: 0;
  }
}
</style>
