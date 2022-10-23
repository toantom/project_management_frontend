<template>
  <div class="card" :class="infoClass">
    <div class="card-body">
      <div class="card-title">{{ infoTitle }}</div>
      <ul class="list-action">
        <li v-for="item in infoList" :key="item">
          <i class="bx bx-chevron-right"></i>
          <router-link :to="`/${item.href}`" class="ms-sm-4 ms-2 action-link">
            {{ item.title }}
          </router-link>
          <small v-if="item.created_at" class="created_at ms-1">
            ({{ item.created_at }})
          </small>
        </li>
      </ul>
      <button-base
        v-if="viewAll"
        :type="'button'"
        :label="'View all projects'"
        :classes="['btn-outline-primary', 'mt-5']"
        @click="$emit('view-all')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//components
import ButtonBase from "@/components/base/ButtonBase.vue";

export default defineComponent({
  name: "HomepageInfo",
  components: { ButtonBase },
  props: {
    infoTitle: String,
    infoClass: String,
    infoList: Object,
    viewAll: Boolean,
  },
});
</script>

<style lang="scss" scoped>
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
</style>
