<template>
  <div class="homepage px-2 px-sm-4">
    <h1 class="mb-2">Home Page</h1>
    <div class="row w-100 ms-0">
      <div class="tab-info col-lg-4 col-md-6 col-sm-12">
        <homepage-info
          :info-class="'project'"
          :info-title="'Top five projects'"
          :info-list="projects"
          :view-all="true"
          @view-all="$router.push({ path: '/project' })"
        >
        </homepage-info>
      </div>
      <div class="tab-info col-lg-4 col-md-6 col-sm-12">
        <homepage-info
          :info-class="'my-account'"
          :info-title="'My Account'"
          :info-list="accountList"
        >
        </homepage-info>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
//components
import HomepageInfo from "@/components/home/HomepageInfo";
//service
import ProjectService from "@/services/project.service";

export default defineComponent({
  name: "HomePage",
  components: {
    HomepageInfo,
  },
  data() {
    return {
      projects: [],
      accountList: [
        { title: "Profile", href: "account" },
        { title: "My page", href: "my-page" },
      ],
    };
  },
  async mounted() {
    await this.getProjects();
  },
  methods: {
    async getProjects() {
      const response = await ProjectService.getListProjects(1, 5);
      this.projects = response.data.data;
      this.projects.forEach((project) => {
        project.href = "projects/" + project.id;
        const date = new Date(project.created_at);
        project.created_at =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.homepage {
  .list-action {
    list-style-type: none;
    padding-left: 0;
  }

  .tab-info {
    margin-bottom: 1.5rem;
  }
}
</style>
