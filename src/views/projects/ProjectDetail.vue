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
    <div class="row w-100 mt-4">
      <div class="tab-info col-lg-4 col-md-6 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Project Description</div>
            {{ projectDetail.project_description }}
          </div>
        </div>
      </div>
      <div class="tab-info col-lg-4 col-md-6 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Project Status</div>
            {{ PROJECT_STATUS[projectDetail.status] }}
          </div>
        </div>
      </div>
      <div class="tab-info col-lg-4 col-md-6 col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Projects members</div>
            <div class="members">
              <div class="role">Project Manager</div>
              <div class="member">
                <project-member-span :members="projectMembers.PM" />
              </div>
              <div class="role">Members</div>
              <div class="member">
                <project-member-span :members="projectMembers.members" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-info col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Work packages overview</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <project-create-modal
    v-if="isShowEditProject"
    @close="isShowEditProject = false"
    :project_id="projectDetail.id.toString()"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import ProjectMemberSpan from "@/components/project/ProjectMemberSpan.vue";
import ProjectCreateModal from "@/components/project/ProjectCreateModal.vue";
//services
import ProjectService from "@/services/project.service";
import UserService from "@/common/user.service";
//type and constants
import { ProjectCreate } from "@/views/projects/type";
import { PROJECT_STATUS, USER_ROLE_EMPLOYEE } from "@/common/constants";
export default defineComponent({
  name: "ProjectDetail",
  data() {
    return {
      projectDetail: {} as ProjectCreate,
      projectMembers: { PM: [] as string[], members: [] as string[] },
      PROJECT_STATUS,
      isManager: false,
      isShowEditProject: false,
    };
  },
  components: {
    ProjectMemberSpan,
    ProjectCreateModal,
  },
  async mounted() {
    await this.getProjectDetail();
    this.isManager = UserService.isManagerRole();
  },
  methods: {
    async getProjectDetail() {
      const projectId = this.$route.params.project_id.toString();
      const response = await ProjectService.getProjectDetail(projectId);
      if (response) {
        this.projectDetail = response.project;
        response.members.forEach((member) => {
          if (member.role === USER_ROLE_EMPLOYEE) {
            this.projectMembers.members.push(member);
          } else {
            this.projectMembers.PM.push(member);
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
