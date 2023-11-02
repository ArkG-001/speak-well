<script setup lang="ts">
import StaffTable from "@/views/sys/org/components/StaffTable.vue";

defineProps({
  pagination: {
    type: Object,
    default: () => ({})
  },
  data: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["handleSearch"]);

const handleSearch = val => {
  emit("handleSearch", val);
};
</script>

<template>
  <PageGuide>
    <template #header>
      <RoundSearch
        placeholder="请输入编号/姓名/手机号码"
        @handleSearch="handleSearch"
      />
    </template>
    <!--  content  -->
    <div class="bg-bg_color flex flex-col rounded pl-2 pr-2">
      <!--   table   -->
      <StaffTable :data="data" :pagination="pagination" />
      <!--          @refresh="handleSearch"-->
      <!--          @ChangePagination="ChangePagination"-->
      <!--          @handleOpenStaffDialog="handleOpenStaffDialog"-->
      <!--          @handleOpenRoleDialog="handleOpenRoleDialog"-->
    </div>
  </PageGuide>
</template>
