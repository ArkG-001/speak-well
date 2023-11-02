<script setup lang="ts">
import { ref, computed } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { reqCreateMenuList, reqEditMenuList } from "@/api/sys/menu";

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

// 表单
const formRef = ref<FormInstance>();
const form = ref({
  name: "",
  sign: "",
  sort: 1,
  is_catalog: true,
  type: 0,
  parent: null
});
defineExpose({
  form
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const nameLabel = computed(() => {
  if (props.title === "添加菜单") {
    return "菜单名称";
  } else if (props.title === "添加按钮") {
    return "操作名称";
  } else {
    return "目录名称";
  }
});

// 表单规则
const rules = ref({
  name: [
    { required: true, message: "请输入目录名称", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
  ],
  sign: [{ required: true, message: "请输入唯一标识", trigger: "blur" }]
});

// 提交表单
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (!valid) return false;
    console.log("提交表单", props.title, form.value);
    if (props.title.includes("编辑")) {
      console.log("编辑员工");
      await reqEditMenuList(form.value);
      ElMessage.success("编辑成功");
    } else {
      await reqCreateMenuList(form.value);
      ElMessage.success("新增成功");
    }
    emit("refresh");
    handleClose();
  });
};
</script>

<template>
  <el-dialog
    draggable
    :model-value="visible"
    :title="title"
    @close="handleClose"
    width="30%"
  >
    <el-form
      ref="formRef"
      class="w-full"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <el-form-item label="组织全称" prop="name">
        <el-input v-model="form.name" placeholder="请输入组织名称" />
      </el-form-item>

      <el-form-item label="组织logo" prop="sign">
        <el-input v-model="form.sign" placeholder="请设置组织logo" />
      </el-form-item>

      <el-form-item label="部门名称" prop="sign">
        <el-input v-model="form.sign" placeholder="请输入部门名称" />
      </el-form-item>

      <el-form-item label="组织类别" prop="sign">
        <el-radio-group v-model="form.sign">
          <el-radio :label="3">部门级别</el-radio>
          <el-radio :label="9">公司级别</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="描述" prop="sign">
        <el-input
          type="textarea"
          v-model="form.sign"
          placeholder="请输入描述"
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
