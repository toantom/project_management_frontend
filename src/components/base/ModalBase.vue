<template>
  <teleport to="body">
    <div
      class="modal fade"
      tabindex="-1"
      :id="id"
      ref="element"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-scrollable" :class="classes">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title fs-4 fw-bold"
              :style="{ fontSize: titleSize }"
            >
              {{ title }}
            </h5>
            <button
              v-if="closeButton"
              type="button"
              class="btn-close"
              :data-bs-dismiss="isCancel ? 'modal' : ''"
              @click="$emit('close')"
            />
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              v-if="secondLabel"
              type="button"
              class="btn border fw-bold btn-focus-out"
              @click="$emit('cancel')"
            >
              {{ secondLabel }}
            </button>
            <button
              v-if="primaryLabel"
              type="button"
              :class="[active ? 'btn-primary' : 'btn-secondary', 'btn fw-bold']"
              :disabled="!active"
              @click="$emit('ok')"
            >
              {{ primaryLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { Modal } from "bootstrap";
import useEventListener from "@/common/useEventListener";

export default defineComponent({
  name: "ModalBase",
  data() {
    return {};
  },
  props: {
    id: { type: String },
    title: { type: String },
    primaryLabel: { type: String },
    secondLabel: { type: String },
    closeButton: { type: Boolean, default: false },
    classes: { type: [Array, String] },
    active: { type: Boolean, default: true },
    open: { type: Boolean, default: false },
    titleSize: { type: String, default: "" },
    isCancel: { type: Boolean, default: true },
  },
  emits: [
    "update:open",
    "show",
    "shown",
    "hide",
    "hidden",
    "hide-prevented",
    "ok",
    "cancel",
    "close",
  ],
  setup(props, { emit }) {
    const element = ref<HTMLElement>();
    const instance = ref<Modal>();

    useEventListener(element, "shown.bs.modal", () => emit("shown"));
    useEventListener(element, "hidden.bs.modal", () => emit("hidden"));
    useEventListener(element, "hidePrevented.bs.modal", () =>
      emit("hide-prevented")
    );

    useEventListener(element, "show.bs.modal", () => {
      emit("show");
      emit("update:open", true);
    });

    useEventListener(element, "hide.bs.modal", () => {
      emit("hide");
      emit("update:open", false);
    });

    onMounted(() => {
      instance.value = new Modal(element.value as HTMLElement);

      if (props.open) {
        instance.value?.show();
      }
    });

    onUnmounted(() => {
      instance.value?.hide();
    });

    watch(
      () => props.open,
      (value) => {
        if (value) {
          instance.value?.show();
        } else {
          instance.value?.hide();
        }
      }
    );

    return { element };
  },
});
</script>
<style lang="scss" scoped>
.modal {
  .modal-body {
    min-height: 150px;
  }
  .modal-footer .btn {
    min-width: 140px;
  }
  .btn-focus-out {
    outline: none;
    box-shadow: none;
  }
}
.project-create {
  .modal-body {
    min-height: 450px;
    overflow: auto;
  }
}
</style>
