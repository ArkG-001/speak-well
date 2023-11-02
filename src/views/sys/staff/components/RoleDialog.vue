<script setup lang="ts">
import { ref } from "vue";
import { reqUpdateStaffRole } from "@/api/sys/staff";
import { reqGetRoleList } from "@/api/sys/role";
import { ElMessage } from "element-plus";
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:visible", "refresh"]);
const handleClose = () => {
  emit("update:visible", false);
};

const id = ref(null);
const role = ref(null);
defineExpose({
  role,
  id
});

const roleOptions = ref([]);
const getRoleOptions = async () => {
  const { results } = await reqGetRoleList();
  roleOptions.value = results.map(item => ({
    label: item.name,
    value: item.id
  }));
};
getRoleOptions();
const onSubmit = async () => {
  console.log(role.value, "role");
  await reqUpdateStaffRole({
    role: role.value,
    id: id.value
  });
  emit("refresh");
  ElMessage.success("分配角色成功");
  handleClose();
};
</script>

<template>
  <el-dialog
    draggable
    width="26%"
    :model-value="visible"
    title="分配角色"
    @close="handleClose"
  >
    <div class="flex-c">
      <el-select
        v-model="role"
        class="!w-full"
        multiple
        filterable
        clearable
        value-key="id"
        placeholder="请选择角色"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <template v-slot:footer>
      <div class="flex justify-end">
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
