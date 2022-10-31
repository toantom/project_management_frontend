<template>
  <div class="homepage px-2 px-sm-4">
    <h1 class="mb-2">Admin Page</h1>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee, index) in employees" :key="index">
            <td>{{ employee.name }}</td>
            <td>{{ employee.email }}</td>
            <td>
              <select
                class="form-select"
                id="role"
                data-placeholder="Select a Role"
                @change="(e) => changeEmployeeInfo(e, employee.id)"
              >
                <option value="0" :disabled="employee.role">----</option>
                <option
                  value="role-1"
                  :selected="employee.role === USER_ROLE_EMPLOYEE"
                >
                  Employee
                </option>
                <option
                  value="role-2"
                  :selected="employee.role === USER_ROLE_MANAGER"
                >
                  Manager
                </option>
              </select>
            </td>
            <td>
              <select
                class="form-select"
                id="status"
                data-placeholder="Select a Status"
                @change="(e) => changeEmployeeInfo(e, employee.id)"
              >
                <option
                  value="status-1"
                  :selected="employee.status === USER_STATUS_ACTIVE"
                >
                  Active
                </option>
                <option
                  value="status-0"
                  :selected="employee.status === USER_STATUS_INACTIVE"
                >
                  Inactive
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination-base :value="page" :pageCount="pages" @input="toPage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdminService from "@/services/admin.service";
import { User } from "@/components/account/type";
import PaginationBase from "@/components/base/PaginationBase.vue";
import {
  USER_ROLE_EMPLOYEE,
  USER_ROLE_MANAGER,
  USER_STATUS_ACTIVE,
  USER_STATUS_INACTIVE,
} from "@/common/constants";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "AdminPage",
  components: {
    PaginationBase,
  },
  data() {
    return {
      employees: [] as User[],
      page: 1,
      pages: 0,
      total: 0,
      USER_ROLE_EMPLOYEE,
      USER_ROLE_MANAGER,
      USER_STATUS_ACTIVE,
      USER_STATUS_INACTIVE,
    };
  },
  async mounted() {
    await this.getListEmployee(this.page);
  },
  watch: {
    $route(to) {
      if (to.name === "AdminPage") {
        this.page = Number(this.$route.query.page || 1);
        this.getListEmployee(this.page);
      }
    },
  },
  methods: {
    async changeEmployeeInfo(e: { target: HTMLInputElement }, user_id: string) {
      if (e.target.value === "0") {
        return;
      }
      const value = e.target.value.split("-");
      const data = {
        field: value[0],
        value: value[1],
      };
      // eslint-disable-next-line
      await AdminService.updateEmployeeInfo(data, user_id).then((res: any) => {
        if (res.result === "ok") {
          const toast = useToast();
          toast.success("Update Successful");
          if (value[0] === "role") {
            const firstE = e.target.firstElementChild as HTMLElement;
            firstE.setAttribute("disabled", "");
          }
        }
      });
    },
    async toPage(page: number) {
      this.$router.push({
        name: this.$route.name || "",
        query: { page: page },
      });
    },
    async getListEmployee(page: number) {
      // eslint-disable-next-line
      const response: any = await AdminService.getAdminListEmployees(page);
      if (response) {
        const { per_page, current_page, total } = response.data;
        this.employees = response.data.data;

        this.page = current_page;
        this.pages = Math.ceil(total / per_page);
      }
    },
  },
});
</script>

<style lang="scss"></style>
