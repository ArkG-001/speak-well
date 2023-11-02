<script setup lang="ts">
import { ref, nextTick } from "vue";
import { reqGetRoleList } from "@/api/sys/role";
import RoleTable from "./components/RoleTable.vue";
import RoleDialog from "./components/RoleDialog.vue";

const roleList = ref([]);
const getRoleList = async () => {
  const { results, count } = await reqGetRoleList();
  roleList.value = results;
  pagination.value.total = count;
};
getRoleList();

// 新增角色
const handleClick = () => {
  dialogTitle.value = "新增角色";
  roleDialogVisible.value = true;
};

// 分页
const pagination = ref({
  pageSize: 10,
  currentPage: 1,
  pageSizes: [10, 15, 20],
  total: 0,
  align: "right",
  background: true,
  small: false
});

// 角色相关信息弹窗
const roleDialogRef = ref();
const roleDialogVisible = ref(false);
const dialogTitle = ref("");
const handleOpenEditDialog = row => {
  dialogTitle.value = "编辑角色";
  nextTick(() => {
    roleDialogRef.value.form = { ...row };
  });
  roleDialogVisible.value = true;
};
</script>

<template>
  <PageGuide>
    <template #header>
      <PaddingButton text="新增角色" @handleClick="handleClick" />
    </template>
    <RoleTable
      :data="roleList"
      :pagination="pagination"
      @handleOpenRoleDialog="handleOpenEditDialog"
    />

    <!-- 角色相关信息弹窗 -->
    <RoleDialog
      ref="roleDialogRef"
      :title="dialogTitle"
      v-model:visible="roleDialogVisible"
      @refresh="getRoleList"
    />
  </PageGuide>
</template>
