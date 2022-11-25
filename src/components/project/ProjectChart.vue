<template>
  <select
    class="form-select mb-2"
    aria-label="Select Chart Type"
    v-model="chartType"
  >
    <option value="type">Ticket Type</option>
    <option value="assignee">Assignee</option>
  </select>

  <div id="chart" v-if="isShowChart">
    <apexchart
      type="bar"
      height="250"
      :options="chartOptions"
      :series="series"
    />
  </div>
  <div class="chart-loading" v-else>
    <a-spin size="large"></a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TASK_STATUS, TASK_TYPE } from "@/common/constants";
import ProjectService from "@/services/project.service";

export default defineComponent({
  name: "ProjectChart",
  data() {
    return {
      series: [
        {
          name: "Open",
          data: [44, 55, 41, 37],
        },
        {
          name: "Close",
          data: [53, 32, 33, 52],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 250,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: "13px",
                  fontWeight: 600,
                },
              },
            },
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: [] as any,
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 40,
        },
      },
      chartType: "type",
      isShowChart: false,
    };
  },
  props: {
    projectId: String,
    employees: Array,
  },
  watch: {
    chartType(newVal) {
      this.getChart(newVal);
    },
  },
  mounted() {
    this.getChart(this.chartType);
  },
  methods: {
    async getChart(chartType) {
      this.isShowChart = false;
      this.chartOptions.xaxis.categories = [];
      if (chartType === "type") {
        TASK_TYPE.forEach((item: any) => {
          this.chartOptions.xaxis.categories.push(item.label);
        });
      }
      if (chartType === "assignee") {
        if (this.employees) {
          this.employees.forEach((item: any) => {
            this.chartOptions.xaxis.categories.push(item.label);
          });
        }
      }
      const data = {
        chart_type: chartType,
      };
      const response = await ProjectService.getProjectChartOverView(
        this.projectId,
        data
      );
      if (response) {
        console.log(response);
      }
      setTimeout(() => {
        this.isShowChart = true;
      }, 1000);
    },
  },
});
</script>

<style lang="scss" scoped>
.chart-loading {
  text-align: center;
  border-radius: 4px;
  padding: 100px 0;
}
</style>
