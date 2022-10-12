<template>
  <div class="homepage">
    <div class="row w-100 pe-2 ps-4 pt-4 ps-sm-4 px-sm-4">
      <div class="tab-info col-lg-4 col-md-6 col-sm-12">
        <homepage-info
          :info-class="'project'"
          :info-title="'Projects'"
          :info-list="projects"
          :view-all-projects="true"
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
import { SET_LOADING } from "@/store/mutations.types";
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
        { title: "Change password", href: "change-password" },
      ],
    };
  },
  async mounted() {
    this.$store.commit(SET_LOADING, true);
    const response = await ProjectService.getListProjects(1, 5);
    this.projects = response.data.data;
    this.projects.forEach((project) => {
      project.href = "projects/" + project.id;
      const date = new Date(project.created_at);
      project.created_at =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    });
    this.$store.commit(SET_LOADING, false);
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
