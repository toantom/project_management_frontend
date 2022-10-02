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
            <slot name="zoomAvatar"></slot>
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
              :class="[
                active ? 'btn-primary' : 'btn-secondary',
                'btn fw-bold',
                isDeleteJob ? 'btn-danger' : 'btn-primary',
              ]"
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
    isDeleteJob: { type: Boolean, default: false },
    isCancel: { type: Boolean, default: true },
    isRecommendCompany: { type: Boolean, default: false },
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
    let root = document.documentElement;

    useEventListener(element, "shown.bs.modal", () => emit("shown"));
    useEventListener(element, "hidden.bs.modal", () => emit("hidden"));
    useEventListener(element, "hidePrevented.bs.modal", () =>
      emit("hide-prevented")
    );

    useEventListener(element, "show.bs.modal", () => {
      root.classList.add("app-scrollbar");
      emit("show");
      emit("update:open", true);
    });

    useEventListener(element, "hide.bs.modal", () => {
      root.classList.remove("app-scrollbar");
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
      root.classList.remove("app-scrollbar");
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
.modal-delete-success {
  .modal-header {
    border-bottom: none !important;
  }
  .modal-body {
    padding-top: 0;
  }
}
.crop-modal-zoom {
  .modal-footer {
    flex-wrap: unset;
  }
}
@media (min-width: 320px) and (max-width: 768px) {
  .modal-delete-confirm {
    .modal-footer {
      justify-content: center;
    }
  }
  .crop-modal-zoom {
    .modal-footer {
      flex-wrap: wrap;
    }
  }
}
.content-h100 {
  .modal-content {
    height: 100%;
  }
  .modal-header {
    border-bottom: none;
    padding-bottom: 0;
  }
  .modal-footer {
    display: none;
  }
}
.circle {
  border-style: solid;
  border-width: 1px;
  border-color: #343a40;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  display: inline;
  padding: 3px 6px 4px;
  font-size: 14px;
  line-height: 12px;
  margin-top: 7px;
}
@media (max-width: 768px) {
  .modal-template-list-mb {
    .modal-body {
      padding: 0;
    }
    .modal-content .modal-header .modal-title {
      font-size: 18px !important;
    }
  }
}
.modal-confirm-link-message {
  .modal-title {
    font-size: 18px !important;
  }
  .modal-body {
    font-size: 14px;
  }
}
</style>
