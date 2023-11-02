<script setup lang="ts">
import { ref } from "vue";
import { reqAddRole, reqUpdateRole } from "@/api/sys/role";
import { ElMessage, FormInstance } from "element-plus";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["update:visible", "refresh"]);
const handleClose = () => {
  resetForm(formRef.value);
  emit("update:visible", false);
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 表单
const formRef = ref();
const form = ref({
  name: "",
  comment: ""
});
defineExpose({
  form
});
const rules = ref({
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
});
const onSubmit = async (formEl: FormInstance | undefined) => {
  await formEl.validate(async valid => {
    if (!valid) return;
    if (props.title === "新增角色") {
      await reqAddRole(form.value);
      ElMessage.success("新增角色成功");
    } else {
      await reqUpdateRole(form.value);
      ElMessage.success("编辑角色成功");
    }
    emit("refresh");
    handleClose();
  });
};
</script>

<template>
  <el-dialog
    draggable
    width="26%"
    :model-value="visible"
    :title="title"
    @close="handleClose"
  >
    <el-form label-width="80px" :model="form" :rules="rules" ref="formRef">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="描述" prop="comment">
        <el-input
          type="textarea"
          v-model="form.comment"
          placeholder="请输入角色描述"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <div class="flex justify-end">
        <el-button type="primary" @click="onSubmit(formRef)"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
