<template>
  <nav class="pagination-container d-flex justify-content-center">
    <ul class="pagination mt-3">
      <li :class="['page-item', firstPageSelected() ? 'disabled' : '']">
        <a
          @click="prevPage()"
          @keyup.enter="prevPage()"
          class="page-link btn"
          :tabindex="firstPageSelected() ? -1 : 0"
        >
          &lt;
        </a>
      </li>

      <li
        v-for="(page, index) in pages"
        :key="index"
        :class="[
          'page-item',
          page.selected && 'active',
          page.disabled && 'disabled',
        ]"
      >
        <a v-if="page.breakView" :class="['page-link btn']" tabindex="0">…</a>
        <a v-else-if="page.disabled" :class="'page-link btn'" tabindex="0">
          {{ page.content }}
        </a>
        <a
          v-else
          @click="handlePageSelected(page.index + 1)"
          @keyup.enter="handlePageSelected(page.index + 1)"
          class="page-link btn"
          tabindex="0"
        >
          {{ page.content }}
        </a>
      </li>

      <li :class="['page-item', lastPageSelected() ? 'disabled' : '']">
        <a
          @click="nextPage()"
          @keyup.enter="nextPage()"
          class="page-link btn"
          :tabindex="lastPageSelected() ? -1 : 0"
        >
          &gt;
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaginationBase",
  props: {
    value: {
      type: Number,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    pageRange: {
      type: Number,
      default: 3,
    },
    marginPages: {
      type: Number,
      default: 1,
    },
    hidePrevNext: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selected: {
      get: function (): number {
        return this.value || this.innerValue;
      },
      set: function (newValue: number) {
        this.innerValue = newValue;
      },
    },
    pages: function () {
      let items = {} as {
        [n: number]: {
          index?: number;
          content?: number;
          selected?: boolean;
          disabled?: boolean;
          breakView?: boolean;
        };
      };

      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          items[index] = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1,
          };
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2);

        let setPageItem = (index: number) => {
          items[index] = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1,
          };
        };

        let setBreakView = (index: number) => {
          items[index] = {
            disabled: true,
            breakView: true,
          };
        };

        // 1st - loop through low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }

        // 2nd - loop through selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }

        for (
          let i = selectedRangeLow;
          i <= selectedRangeHigh && i <= this.pageCount - 1;
          i++
        ) {
          setPageItem(i);
        }

        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        }

        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        }

        // 3rd - loop through high end of margin pages
        for (
          let i = this.pageCount - 1;
          i >= this.pageCount - this.marginPages;
          i--
        ) {
          setPageItem(i);
        }
      }

      return items;
    },
  },
  data() {
    return {
      innerValue: 1,
    };
  },
  methods: {
    handlePageSelected(selected: number) {
      if (this.selected === selected) return;

      this.innerValue = selected;
      this.$emit("input", selected);
    },
    prevPage() {
      if (this.selected <= 1) return;

      this.handlePageSelected(this.selected - 1);
    },
    nextPage() {
      if (this.selected >= this.pageCount) return;

      this.handlePageSelected(this.selected + 1);
    },
    firstPageSelected() {
      return this.selected === 1;
    },
    lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0;
    },
  },
});
</script>

<style lang="scss" scoped>
.pagination-container {
  width: 100%;
  a {
    cursor: pointer;
  }
}
</style>
