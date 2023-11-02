<script setup lang="ts">
import { ref } from "vue";
import { columns } from "../hooks/useConfig.hook";
import { adaptiveConfig } from "@/hooks/useConfig.hook";
import { reqDelMenuList, reqGetMenuList } from "@/api/sys/menu";
import { MenuList } from "@/api/sys/menu.d";
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

const emit = defineEmits([
  "refresh",
  "ChangePagination",
  "handleOpenStaffDialog",
  "handleOpenMenuDialog",
  "handleCreate",
  "handleOpenRoleDialog"
]);

// 获取菜单列表
const menuList = ref(null);
const getList = async () => {
  const res = await reqGetMenuList();
  menuList.value = res as MenuList;
};
getList();

const handleOpenDialog = (key: string, row: any) => {
  switch (key) {
    case "del":
      handleDel(row);
      break;
    case "edit":
      emit("handleOpenMenuDialog", row);
      break;
    case "add":
      emit("handleCreate", row);
      break;
  }
};
const handleDel = row => {
  ElMessageBox.confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      await reqDelMenuList(row.id);
      ElMessage.success("删除成功");
      emit("refresh");
    })
    .catch(() => {
      console.log("取消删除");
    });
};

// 添加 按钮文字
const addBtnText = (type: number) => {
  switch (type) {
    case 0:
      return "添加菜单";
    case 1:
      return "添加按钮";
  }
};
</script>

<template>
  <PureTable
    ref="tableRef"
    table-layout="fixed"
    adaptive
    border
    :adaptiveConfig="adaptiveConfig"
    align-whole="center"
    row-key="id"
    showOverflowTooltip
    size="large"
    :data="data"
    :columns="columns"
    :header-cell-style="{
      color: '#79879c'
    }"
  >
    <template #operation="{ row }">
      <el-button
        type="primary"
        link
        size="small"
        v-if="row.type !== 2"
        @click="handleOpenDialog('add', row)"
      >
        {{ addBtnText(row.type) }}
      </el-button>
      <el-button
        type="primary"
        link
        size="small"
        @click="handleOpenDialog('edit', row)"
      >
        编辑
      </el-button>
      <el-button
        type="danger"
        link
        size="small"
        @click="handleOpenDialog('del', row)"
      >
        删除
      </el-button>
    </template>
  </PureTable>
</template>
