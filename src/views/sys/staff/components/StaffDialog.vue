<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import { reqAddStaff, reqEditStaff } from "@/api/sys/staff";
import { ElMessage } from "element-plus";
import DeptSelect from "./DeptSelect.vue";

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
  username: "",
  organ: null,
  mobile: "",
  password: "",
  comment: ""
});
defineExpose({
  form
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 表单规则
const rules = ref({
  username: [
    { required: true, message: "请输入员工姓名", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
  ],
  organ: [{ required: true, message: "请选择部门", trigger: "blur" }],
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "手机号格式不正确",
      trigger: "blur"
    }
  ],
  password: [{ required: true, message: "请设置初始密码", trigger: "blur" }]
});

// 提交表单
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (!valid) return false;
    form.value.organ = form.value.organ[form.value.organ.length - 1];
    if (props.title === "创建员工") {
      await reqAddStaff(form.value);
      ElMessage.success("创建成功");
      emit("refresh", "create");
    } else {
      console.log("编辑员工");
      await reqEditStaff(form.value);
      ElMessage.success("编辑成功");
      emit("refresh");
    }
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
  >
    <el-form
      ref="formRef"
      class="w-full"
      :rules="rules"
      :inline="true"
      :model="form"
      label-width="100px"
    >
      <el-form-item class="w-1/2 !mr-0" label="员工姓名" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入员工姓名"
          :disabled="title === '查看员工信息'"
        />
      </el-form-item>
      <el-form-item class="w-1/2 !mr-0" label="所属部门" prop="organ">
        <DeptSelect
          type="seearch"
          v-model:organ="form.organ"
          :disabled="title === '查看员工信息'"
        />
        <!--        <el-input v-model="form.organ" placeholder="请选择部门" />-->
      </el-form-item>

      <el-form-item class="w-1/2 !mr-0" label="手机号" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号"
          :disabled="title === '查看员工信息'"
        />
      </el-form-item>
      <!-- 仅在创建时显示 -->
      <el-form-item
        v-if="title === '创建员工'"
        class="w-1/2 !mr-0"
        label="初始密码"
        prop="password"
      >
        <el-input v-model="form.password" placeholder="请设置初始密码" />
      </el-form-item>

      <el-form-item class="w-full !mr-0" label="备注" prop="comment">
        <el-input
          v-model="form.comment"
          type="textarea"
          class="w-full"
          placeholder="请输入备注"
          :disabled="title === '查看员工信息'"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <div class="flex justify-end">
        <el-button
          v-if="title !== '查看员工信息'"
          type="primary"
          @click="onSubmit(formRef)"
        >
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
