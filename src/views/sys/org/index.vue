<script setup lang="ts">
import { ref } from "vue";
import StaffList from "./StaffList.vue";
import OrgTree from "./OrgTree.vue";
import { reqGetOrgList } from "@/api/sys/org";
import { reqGetUserList } from "@/api/sys/staff";
import OrgDialog from "./components/OrgDialog.vue";

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

// 组织机构列表
const orgList = ref([]);
const getOrgList = async () => {
  const { results, count } = await reqGetOrgList();
  orgList.value = results;
  pagination.value.total = count;
};
getOrgList();

// 员工列表
const staffList = ref([]);
const size = 10;
const page = 1;
let organId = null;

const handleChangeOrg = async (data: any) => {
  console.log(data, "99990000");
  organId = data.id;
  const { results } = await reqGetUserList({ page, size, organ: data.id });
  staffList.value = results;
  console.log(staffList.value, "staffList");
};

// 搜索 员工列表
const handleSearch = async (val: string) => {
  const { results } = await reqGetUserList({
    page,
    size,
    search: val,
    organ: organId
  });
  staffList.value = results;
  console.log(staffList.value, "staffList");
};

// 搜索 组织架构
const handleSearchOrg = async (val: string) => {
  const { results } = await reqGetOrgList({ name: val });
  orgList.value = results;
  console.log(orgList.value, "orgList");
};

// 组织架构弹窗
const orgVisible = ref(false);
const orgDialogTitle = ref("");
const handleAdd = () => {
  orgVisible.value = true;
  orgDialogTitle.value = "添加部门";
};
</script>

<template>
  <div class="flex justify-between">
    <OrgTree
      class="min-w-[300px] mr-2"
      :data="orgList"
      @handleChangeOrg="handleChangeOrg"
      @handleSearchOrg="handleSearchOrg"
      @handleAdd="handleAdd"
    />
    <StaffList
      class="w-[calc(100%-300px)]"
      :data="staffList"
      :pagination="pagination"
      @handleSearch="handleSearch"
    />
    <OrgDialog v-model:visible="orgVisible" :title="orgDialogTitle" />
  </div>
</template>
