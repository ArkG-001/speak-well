<script setup lang="ts">
import { ref } from "vue";
import { columns } from "../hooks/useConfig.hook";
import { adaptiveConfig } from "@/hooks/useConfig.hook";
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
  "handleOpenRoleDialog"
]);
const handlePagination = (key: "page" | "size", val) => {
  emit("ChangePagination", { key, val });
};

const tableBtns = ref([
  {
    permission: "sys:staff:edit",
    key: "edit",
    text: "编辑"
  },
  {
    permission: "sys:staff:edit",
    key: "perm",
    text: "分配权限"
  },
  {
    permission: "sys:staff:edit",
    key: "del",
    text: "删除"
  }
]);

const handleOpenDialog = (key: string, row) => {
  switch (key) {
    case "edit":
      emit("handleOpenRoleDialog", row);
      break;
    case "perm":
      emit("handleOpenRoleDialog", { type: "perm", row });
      break;
  }
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
