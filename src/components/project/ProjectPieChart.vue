<template>
  <div id="pie-chart" v-if="total">
    <h5>Total Task: {{ total }}</h5>
    <apexchart
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
    />
  </div>
  <div v-else>
    <a-empty />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProjectService from "@/services/project.service";

export default defineComponent({
  name: "ProjectPieChart",
  data() {
    return {
      total: 0,
      series: [] as any,
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["New", "In Progress", "Done", "Close"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  props: {
    projectId: String,
  },
  async mounted() {
    const response = await ProjectService.getProjectPieChart(this.projectId);
    if (response) {
      this.series = response.count.tasks_count;
      this.total = response.count.total_tasks;
    }
  },
});
</script>
