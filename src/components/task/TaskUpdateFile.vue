<template>
  <div class="mb-2">
    <b>Only files in doc, docx, pdf, csv, png, jpg formats are accepted.</b>
  </div>
  <a-upload
    :file-list="fileList"
    :before-upload="beforeUpload"
    :multiple="true"
    @remove="handleRemove"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Select File
    </a-button>
  </a-upload>
</template>
<script lang="ts">
import { UploadOutlined } from "@ant-design/icons-vue";
import { Upload, UploadFile } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import type { UploadProps } from "ant-design-vue";
import { useToast } from "vue-toastification";
export default defineComponent({
  name: "TaskUpdateFile",
  components: {
    UploadOutlined,
  },
  setup() {
    const fileList = ref<UploadProps["fileList"]>([]);

    const beforeUpload: UploadProps["beforeUpload"] = (file) => {
      const validFilePath = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/csv",
        "image/png",
        "image/jpg",
      ];
      const isValidType = validFilePath.includes(file.type);
      if (!isValidType) {
        const toast = useToast();
        toast.error(`${file.name} is not a correct file type`);
        return Upload.LIST_IGNORE;
      }
      fileList.value = [...(fileList.value as []), file];
      return false;
    };
    const handleRemove: UploadProps["onRemove"] = (file) => {
      const index = [...(fileList.value as UploadFile[])].indexOf(file);
      const newFileList = [...(fileList.value as UploadFile[])].slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };
    return {
      handleRemove,
      beforeUpload,
      fileList,
    };
  },
});
</script>
