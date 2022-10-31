<template>
  <modal-base
    :title="'Create New Backlog'"
    :primary-label="'Create'"
    :second-label="'Cancel'"
    :close-button="true"
    :active="validate"
    :open="open"
    :classes="['backlog-create', 'modal-md']"
    @ok="save"
    @hidden="$emit('close')"
    @cancel="open = false"
  >
    <form class="row g-3">
      <div class="col-12">
        <label for="project-name" class="form-label">
          Specify you backlog name <span class="required-input">*</span>
        </label>
        <input
          type="text"
          class="form-control"
          id="project-name"
          v-model="backlog.backlog_title"
          :class="errors.errors?.backlog_title ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.errors?.backlog_title">
          {{ errors.errors.backlog_title[0] }}
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
          v-model="backlog.start_date"
          :class="errors.errors?.start_date ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.errors?.start_date">
          {{ errors.errors.start_date[0] }}
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
          :min="minEnd"
          :readonly="minEnd === ''"
          v-model="backlog.end_date"
          :class="errors.errors?.end_date ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback" v-if="errors.errors?.end_date">
          {{ errors.errors.end_date[0] }}
        </div>
      </div>
    </form>
  </modal-base>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import ModalBase from "@/components/base/ModalBase.vue";
// type
import { BacklogCreate } from "@/views/projects/type";
import { mapGetters } from "vuex";
import UserService from "@/common/user.service";
import { useToast } from "vue-toastification";
import { store } from "@/store";
import { SET_ERROR } from "@/store/mutations.types";
import BacklogService from "@/services/backlog.service";

export default defineComponent({
  name: "ProjectCreateModal",
  components: {
    ModalBase,
  },
  emits: ["save", "close", "createSuccess"],
  data() {
    const vn_datetime_str = new Date().toLocaleDateString("vn").split("/");
    const minStartDay = `${vn_datetime_str[2]}-${vn_datetime_str[1]}-${vn_datetime_str[0]}`;
    return {
      open: true,
      minStart: minStartDay,
      minEnd: "",
      backlog: {
        backlog_title: "",
        project_id: null,
        start_date: "",
        end_date: "",
        created_by: "",
      } as BacklogCreate,
    };
  },
  watch: {
    "backlog.start_date"(newVal) {
      this.minEnd = newVal;
      this.backlog.end_date = "";
    },
  },
  beforeUnmount() {
    if (this.errors) {
      store.commit(SET_ERROR, { response: { data: "" } });
    }
  },
  computed: {
    ...mapGetters(["user", "errors"]),
    validate(): boolean {
      const backlog = this.backlog;
      const errors = {} as { [key: string]: string | number };
      if (!backlog.backlog_title || backlog.backlog_title == "") {
        errors.title = "This is required";
      }
      if (!backlog.start_date || backlog.start_date == "") {
        errors.start_date = "This is required";
      }
      if (!backlog.end_date || backlog.end_date == "") {
        errors.end_date = "This is required";
      }
      return !Object.keys(errors).length;
    },
  },
  methods: {
    getPostData() {
      const user = UserService.getUser();
      const project_id = this.$route.params.project_id;
      const backlog = this.backlog;

      return {
        backlog_title: backlog.backlog_title,
        start_date: backlog.start_date,
        end_date: backlog.end_date,
        project_id: project_id,
        created_by: user.id,
        updated_by: user.id,
      };
    },
    async save() {
      const data = this.getPostData();
      await BacklogService.createBacklog(data).then((res) => {
        if (res.result === "ok") {
          store.commit(SET_ERROR, { response: { data: "" } });
          const toast = useToast();
          toast.success("Create Backlog Successful");
          this.open = false;
          this.$emit("createSuccess");
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
