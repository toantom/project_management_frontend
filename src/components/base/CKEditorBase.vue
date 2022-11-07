<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
    tag-name="textarea"
  ></ckeditor>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
  name: "CKEditorBase",
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  props: {
    id: String,
  },
});
</script>

<style lang="scss">
.ck {
  .ck-toolbar {
    border-radius: 0.375rem;
  }
  .ck-editor__editable_inline {
    min-height: 250px;
    @media screen and (max-width: 768px) {
      min-height: 150px;
    }
  }
}
</style>
