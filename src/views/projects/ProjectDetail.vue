<template>
  <div class="project-overview px-2 px-sm-4">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2 class="m-0">Overview</h2>
      <div v-if="isManager">
        <button
          type="button"
          class="btn btn-primary d-flex align-items-center"
          @click="isShowEditProject = true"
        >
          <template class="d-block d-sm-none">
            <i class="bx bx-plus" />
          </template>
          <template class="d-none d-sm-block">
            <i class="bx bx-plus pe-1" /> Edit Project
          </template>
        </button>
      </div>
    </div>
    <div class="row w-100 mt-4 mx-0">
      <div class="tab-info col-md-6 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Project Description</div>
            <p v-html="projectDetail.project_description"></p>
          </div>
        </div>
      </div>
      <div class="tab-info col-md-6 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Project Status</div>
            {{ PROJECT_STATUS[projectDetail.status] }}
          </div>
        </div>
      </div>
      <div class="tab-info col-md-6 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Projects members</div>
            <div class="members">
              <div class="role">Project Manager</div>
              <div class="member">
                <project-member-span :members="projectPM" />
              </div>
              <div class="role">Members</div>
              <div class="member">
                <project-member-span :members="projectDetail.employees" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-info col-md-6 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">task overview</div>
            <project-pie-chart :project-id="projectId" />
          </div>
        </div>
      </div>
      <div class="tab-info col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Activity overview</div>
            <project-chart
              :project-id="projectId"
              :employees="projectDetail.employees"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <project-create-modal
    v-if="isShowEditProject"
    @close="isShowEditProject = false"
    :project-detail="projectDetail"
    :project-id="project?.id.toString()"
    @updateProject="updateProjectInfo"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import ProjectMemberSpan from "@/components/project/ProjectMemberSpan.vue";
import ProjectCreateModal from "@/components/project/ProjectCreateModal.vue";
import ProjectChart from "@/components/project/ProjectChart.vue";
import ProjectPieChart from "@/components/project/ProjectPieChart.vue";
//services
import ProjectService from "@/services/project.service";
import UserService from "@/common/user.service";
//type and constants
import { PROJECT_STATUS, USER_ROLE_EMPLOYEE } from "@/common/constants";
import { SET_CANCEL_LOADING, SET_LOADING } from "@/store/mutations.types";
import { mapGetters } from "vuex";
import { Option } from "@/views/projects/type";
export default defineComponent({
  name: "ProjectDetail",
  data() {
    return {
      projectDetail: {} as any,
      projectPM: [] as Option[],
      PROJECT_STATUS,
      isManager: false,
      isShowEditProject: false,
      projectId: "",
    };
  },
  components: {
    ProjectMemberSpan,
    ProjectCreateModal,
    ProjectChart,
    ProjectPieChart,
  },
  computed: {
    ...mapGetters(["project"]),
  },
  created() {
    this.projectId = this.$route.params.project_id.toString();
  },
  async mounted() {
    this.$store.commit(SET_LOADING, true);
    await this.getProjectDetail();
    this.isManager = UserService.isManagerRole();
    this.$store.commit(SET_CANCEL_LOADING, false);
  },
  methods: {
    updateProjectInfo() {
      this.getProjectDetail();
      this.isShowEditProject = false;
    },
    async getProjectDetail() {
      const projectId = this.$route.params.project_id.toString();
      const response = await ProjectService.getProjectDetail(projectId);
      if (response) {
        this.projectDetail = response.project;
        this.projectDetail.employees = [];
        this.projectPM = [];
        response.members.forEach((member) => {
          const option: Option = {
            value: member.id,
            label: member.name,
          };
          if (member.role === USER_ROLE_EMPLOYEE) {
            this.projectDetail.employees.push(option);
          } else {
            this.projectPM.push(option);
            this.projectDetail.project_manager = option;
          }
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.project-overview {
  .card {
    height: 100%;
    .card-title {
      color: #5f5f5f;
      font-size: 16px;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    .list-action {
      list-style-type: none;
      padding-left: 0;
    }
    .created_at {
      font-size: 60%;
      color: #6f6f6f;
      line-height: inherit;
    }
    .action-link:hover {
      text-decoration: underline !important;
    }
  }
  .tab-info {
    margin-bottom: 1.5rem;
  }
  .members {
    display: grid;
    grid-template-columns: max-content 2fr;
    grid-auto-rows: auto;
    grid-gap: 1rem;
    .role {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
      line-height: 27px;
    }
    .member {
      zoom: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
