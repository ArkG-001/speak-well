<script setup lang="ts">
import { ref, nextTick } from "vue";
import { reqGetUserList } from "@/api/sys/staff";
import StaffDialog from "./components/StaffDialog.vue";
import StaffTable from "./components/StaffTable.vue";
import DeptSelect from "./components/DeptSelect.vue";
import RoleDialog from "./components/RoleDialog.vue";

// 搜索
let search = "";
const organ = ref(null);
const searchRef = ref();
const handleSearch = (type?: string) => {
  if (type === "del" && page !== 1 && staffList.value.length === 1) {
    page--;
    pagination.value.currentPage = page;
  }
  if (type === "create" && staffList.value.length === size) {
    page++;
    pagination.value.currentPage = page;
  }
  search = searchRef.value.searchVal;
  getList();
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
const ChangePagination = ({ key, val }) => {
  pagination.value[key] = val;
  switch (key) {
    case "page":
      page = val;
      break;
    case "size":
      size = val;
      break;
  }
  getList();
};

// 获取员工列表
const staffList = ref([]);
let size = 10;
let page = 1;
const getList = async () => {
  const { results, count } = await reqGetUserList({
    page,
    size,
    search,
    organ: organ.value?.[organ.value.length - 1]
  });
  staffList.value = results;
  pagination.value.total = count;
};
getList();

// 弹窗
const dialogRef = ref();
const dialogVisible = ref(false);
const dialogTitle = ref("");
const handleCreate = () => {
  dialogTitle.value = "创建员工";
  dialogVisible.value = true;
};
const handleOpenStaffDialog = ({ key, row }) => {
  switch (key) {
    case "edit":
      dialogTitle.value = "编辑员工";
      nextTick(() => {
        dialogRef.value.form = { ...row };
      });
      break;
    case "detail":
      dialogTitle.value = "查看员工信息";
      nextTick(() => {
        dialogRef.value.form = { ...row };
      });
      break;
  }
  dialogVisible.value = true;
};

// 分配角色弹窗
const roleDialogRef = ref();
const roleDialogVisible = ref(false);
const handleOpenRoleDialog = ({ row }) => {
  roleDialogVisible.value = true;
  nextTick(() => {
    roleDialogRef.value.id = row.id;
    roleDialogRef.value.role = row.role;
  });
};
</script>

<template>
  <PageGuide>
    <template #header>
      <DeptSelect
        type="search"
        v-model:organ="organ"
        @handleSearch="handleSearch"
      />
      <RoundSearch ref="searchRef" @handleSearch="handleSearch" />
      <PaddingButton text="创建" @handleClick="handleCreate" />
    </template>
    <!--  content  -->
    <div class="bg-bg_color flex flex-col rounded pl-2 pr-2">
      <!--   table   -->
      <StaffTable
        :data="staffList"
        :pagination="pagination"
        @refresh="handleSearch"
        @ChangePagination="ChangePagination"
        @handleOpenStaffDialog="handleOpenStaffDialog"
        @handleOpenRoleDialog="handleOpenRoleDialog"
      />
    </div>
    <!-- 员工信息弹窗 -->
    <StaffDialog
      ref="dialogRef"
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      @refresh="handleSearch"
    />
    <!-- 分配角色弹窗 -->
    <RoleDialog
      ref="roleDialogRef"
      v-model:visible="roleDialogVisible"
      @refresh="handleSearch"
    />
  </PageGuide>
</template>
