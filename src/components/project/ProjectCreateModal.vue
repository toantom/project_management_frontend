<template>
  <modal-base
    :title="projectDetail ? 'Edit Project' : 'Create New project'"
    :primary-label="'Submit'"
    :second-label="'Cancel'"
    :close-button="true"
    :active="validate"
    :open="open"
    :classes="['project-create', 'modal-xl']"
    @ok="save"
    @hidden="$emit('close')"
    @cancel="open = false"
  >
    <form class="row g-3">
      <div class="col-lg-4 col-md-6">
        <label for="project-name" class="form-label">
          Specify you project name <span class="required-input">*</span>
        </label>
        <input
          type="text"
          class="form-control"
          id="project-name"
          v-model="project.title"
          :class="errors.message?.title ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.message?.title">
          {{ errors.message.title[0] }}
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <label for="project-name-short" class="form-label">
          Short name of your project <span class="required-input">*</span>
        </label>
        <input
          type="text"
          class="form-control"
          id="project-name-short"
          v-model="project.short_name"
          :class="errors.message?.short_name ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.message?.short_name">
          {{ errors.message.short_name[0] }}
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <label for="priority" class="form-label">
          Choose Priority <span class="required-input">*</span>
        </label>
        <dropdown-base
          :id="'priority'"
          :options="PRIORITY"
          :placeholder="'Choose priority'"
          v-model="project.priority"
          :class="errors.message?.priority ? 'is-invalid' : ''"
          :value="project.priority"
        />
        <div class="invalid-feedback" v-if="errors.message?.priority">
          {{ errors.message.priority[0] }}
        </div>
      </div>
      <div class="col-12">
        <label for="description" class="form-label">
          Project Description
        </label>
        <c-k-editor-base
          id="description"
          v-model="project.project_description"
        />
      </div>
      <div class="col-lg-4 col-md-6" v-if="!projectDetail">
        <label for="project-manager" class="form-label">
          Project Manager <span class="required-input">*</span>
        </label>
        <dropdown-base
          :id="'project-manager'"
          :options="listManager"
          :placeholder="'Choose Project Manager'"
          v-model="project.project_manager"
          :class="errors.message?.project_manager ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.message?.project_manager">
          {{ errors.message.project_manager[0] }}
        </div>
      </div>
      <div class="col-md-6" :class="projectDetail ? '' : 'col-lg-4'">
        <label for="type" class="form-label">
          Choose Project's type <span class="required-input">*</span>
        </label>
        <dropdown-base
          :id="'type'"
          :options="PROJECT_TYPE"
          :placeholder="`Choose Project's type`"
          v-model="project.project_type"
          :class="errors.message?.project_type ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.message?.project_type">
          {{ errors.message.project_type[0] }}
        </div>
      </div>
      <div class="col-md-6" :class="projectDetail ? '' : 'col-lg-4'">
        <label for="public" class="form-label">
          Public <span class="required-input">*</span>
        </label>
        <dropdown-base
          :id="'public'"
          :options="PROJECT_PUBLIC"
          :placeholder="'Choose Confidentiality'"
          v-model="project.public"
          :class="errors.message?.public ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.message?.public">
          {{ errors.message.public[0] }}
        </div>
      </div>
      <div class="w-100 d-none d-md-block m-0"></div>
      <div class="col-md-6">
        <label for="start-date" class="form-label">
          Start date <span class="required-input">*</span>
        </label>
        <input
          type="date"
          class="form-control"
          id="start-date"
          :min="minStart"
          v-model="project.start_date"
          :class="errors.message?.start_date ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.message?.start_date">
          {{ errors.message.start_date[0] }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="end-date" class="form-label">
          End date <span class="required-input">*</span>
        </label>
        <input
          type="date"
          class="form-control"
          id="end-date"
          :min="project.start_date"
          :readonly="project.start_date === ''"
          v-model="project.end_date"
          :class="errors.message?.end_date ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.message?.end_date">
          {{ errors.message.end_date[0] }}
        </div>
      </div>
      <div class="col-12">
        <label for="employee" class="form-label"> Employee </label>
        <dropdown-base
          :id="'employee'"
          :options="listEmployee"
          :placeholer="'Choose employee'"
          v-model="project.employees"
          :placeholder="'Choose Employee'"
          :closeOnSelect="false"
          multiple
        >
        </dropdown-base>
      </div>
    </form>
  </modal-base>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import ModalBase from "@/components/base/ModalBase.vue";
import DropdownBase from "@/components/base/DropdownBase.vue";
import CKEditorBase from "@/components/base/CKEditorBase.vue";
// type
import { Option } from "@/views/projects/type";
import ProjectService from "@/services/project.service";
import { User } from "@/components/account/type";
import { mapGetters } from "vuex";
import UserService from "@/common/user.service";
import { useToast } from "vue-toastification";
import { store } from "@/store";
import { SET_ERROR } from "@/store/mutations.types";
import { PRIORITY, PROJECT_TYPE, PROJECT_PUBLIC } from "@/common/constants";
export default defineComponent({
  name: "ProjectCreateModal",
  components: {
    ModalBase,
    DropdownBase,
    CKEditorBase,
  },
  emits: ["close"],
  data() {
    const vn_datetime_str = new Date().toLocaleDateString("vn").split("/");
    const minStartDay = `${vn_datetime_str[2]}-${vn_datetime_str[1]}-${
      vn_datetime_str[0].length === 1
        ? "0" + vn_datetime_str[0]
        : vn_datetime_str[0]
    }`;
    return {
      open: true,
      PRIORITY,
      PROJECT_TYPE,
      PROJECT_PUBLIC,
      minStart: minStartDay,
      loadingSearchEmployee: false,
      project: {
        title: "",
        short_name: "",
        priority: null,
        project_description: "",
        project_type: null,
        start_date: "",
        end_date: "",
        project_manager: null,
        status: null,
        public: null,
        created_by_id: "",
        employees: [],
      } as any,
      listEmployee: [] as object[],
      listManager: [] as object[],
    };
  },
  props: {
    projectDetail: Object,
  },
  async mounted() {
    // eslint-disable-next-line
    const employees: any = await ProjectService.getEmployeeList();
    this.getListMember(employees, this.listEmployee);
    // eslint-disable-next-line
    const managers: any = await ProjectService.getManagerList();
    this.getListMember(managers, this.listManager);
    if (this.projectDetail) {
      this.project = this.projectDetail;
    }
  },
  beforeUnmount() {
    if (this.errors) {
      store.commit(SET_ERROR, { response: { data: "" } });
    }
  },
  computed: {
    ...mapGetters(["user", "errors"]),
    validate(): boolean {
      const project = this.project;
      const errors = {} as { [key: string]: string | number };
      if (!project.title || project.title == "") {
        errors.title = "This is required";
      }
      if (!project.short_name || project.short_name == "") {
        errors.short_name = "This is required";
      }
      if (!project.priority) {
        errors.priority = "This is required";
      }
      if (!project.project_type) {
        errors.project_type = "This is required";
      }
      if (!project.start_date || project.start_date == "") {
        errors.start_date = "This is required";
      }
      if (!project.end_date || project.end_date == "") {
        errors.end_date = "This is required";
      }
      if (!project.project_manager) {
        errors.project_manager = "This is required";
      }
      if (!project.public) {
        errors.public = "This is required";
      }
      return !Object.keys(errors).length;
    },
  },
  methods: {
    getPostData() {
      const user = UserService.getUser();
      const project = this.project;
      const employeeIds: object[] = [];
      // eslint-disable-next-line
      project.employees?.forEach((item: any) => {
        return employeeIds.push(item.value);
      });

      return {
        title: project.title,
        short_name: project.short_name,
        priority: project.priority?.value,
        project_description: project.project_description,
        project_type: project.project_type?.value,
        start_date: project.start_date,
        end_date: project.end_date,
        project_manager: project.project_manager?.value,
        status: 1,
        public: project.public?.value,
        created_by: user.id,
        updated_by: user.id,
        employees: employeeIds,
      };
    },
    async save() {
      const data = this.getPostData();
      this.projectDetail
        ? await ProjectService.editProject(this.projectDetail.id, data).then(
            (res) => {
              if (this.errors === "" && res.result === "ok") {
                const toast = useToast();
                toast.success("Update Project Successful");
                this.open = false;
              }
            }
          )
        : await ProjectService.createProject(data).then((res) => {
            if (res.result === "ok") {
              const toast = useToast();
              toast.success("Create Project Successful");
              this.open = false;
            }
          });
    },
    // eslint-disable-next-line
    getListMember(object: any, list: object[]) {
      if (object) {
        object.forEach((item: User) => {
          const option: Option = { value: item.id, label: item.name };
          list.push(option);
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
