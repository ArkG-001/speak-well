<script setup lang="ts">
import { columns } from "../hooks/useConfig.hook";
import { adaptiveConfig } from "@/hooks/useConfig.hook";

import { ref } from "vue";
import { reqUpdateStaffStatus, reqDeleteStaff } from "@/api/sys/staff";
import { ElMessage, ElMessageBox } from "element-plus";

defineProps({
  data: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({})
  }
});

// TODO: 后面添加权限 用于控制按钮显示 字段permission
const tableBtns = ref([
  {
    permission: "sys:staff:edit",
    key: "edit",
    text: "编辑"
  },
  {
    permission: "sys:staff:edit",
    key: "reset",
    text: "重置密码"
  },
  {
    permission: "sys:staff:edit",
    key: "role",
    text: "分配角色"
  },
  {
    permission: "sys:staff:edit",
    key: "detail",
    text: "查看"
  },
  {
    permission: "sys:staff:edit",
    key: "del",
    text: "删除"
  }
]);

const emit = defineEmits([
  "refresh",
  "ChangePagination",
  "handleOpenStaffDialog",
  "handleOpenRoleDialog"
]);
// 分页 事件
const handlePagination = (key: "page" | "size", val) => {
  emit("ChangePagination", { key, val });
};

// 更改启用状态
const onActiveChange = async (id: number) => {
  await reqUpdateStaffStatus(id);
  emit("refresh");
  ElMessage.success("更改成功");
};

// 操作按钮事件
const handleOpenDialog = (key: string, row) => {
  switch (key) {
    case "reset":
      ElMessageBox.confirm("此操作将重置该员工密码, 是否继续？", "警告", {
        type: "warning"
      }).then(() => {
        handleReset(row.id);
      });
      break;
    case "role":
      emit("handleOpenRoleDialog", { key, row });
      break;
    case "del":
      ElMessageBox.confirm("请确认是否删除该员工？", "警告", {
        type: "warning"
      }).then(() => {
        handleDel(row.id);
      });
      break;
    default:
      emit("handleOpenStaffDialog", { key, row });
      break;
  }
};
const handleDel = async (id: number) => {
  const data = [];
  data.push(id);
  await reqDeleteStaff({ id: data });
  emit("refresh", "del");
  ElMessage.success("删除成功");
};

const handleReset = async (id: number) => {
  await reqUpdateStaffStatus(id);
  emit("refresh");
  ElMessage.success("重置成功");
};
</script>

<template>
  <PureTable
    ref="tableRef"
    table-layout="fixed"
    adaptive
    :adaptiveConfig="adaptiveConfig"
    align-whole="center"
    row-key="id"
    showOverflowTooltip
    default-expand-all
    size="large"
    :data="data"
    :columns="columns"
    :header-cell-style="{
      color: '#79879c'
    }"
    :pagination="pagination"
    @page-size-change="handlePagination('size', $event)"
    @page-current-change="handlePagination('page', $event)"
  >
    <template #is_active="{ row }">
      <el-switch
        :model-value="row.is_active"
        @change="onActiveChange(row.id)"
        class="ml-2"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      />
    </template>
    <template #operation="{ row }">
      <el-button
        v-for="(item, index) in tableBtns"
        :key="index"
        link
        :type="item.key === 'del' ? 'danger' : 'primary'"
        size="small"
        @click="handleOpenDialog(item.key, row)"
      >
        {{ item.text }}
      </el-button>
    </template>
  </PureTable>
</template>
