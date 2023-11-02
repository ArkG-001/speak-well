<script setup lang="ts">
import { nextTick, ref } from "vue";
import MenuTable from "./components/MenuTable.vue";
import MenuDialog from "./components/MenuDialog.vue";
import { reqGetMenuList } from "@/api/sys/menu";
import { MenuList } from "@/api/sys/menu.d";

// 获取员工列表
const menuList = ref([]);
const getList = async () => {
  menuList.value = (await reqGetMenuList()) as MenuList[];
};
getList();

// 新增目录
const dialogRef = ref();
const dialogTitle = ref("");
const dialogVisible = ref(false);
const handleCreate = row => {
  if (row?.type !== undefined) {
    dialogRef.value.form.type = row.type + 1;
    dialogRef.value.form.parent = row.id;
    switch (row.type) {
      case 0:
        dialogTitle.value = "添加菜单";
        break;
      case 1:
        dialogTitle.value = "添加按钮";
        break;
    }
  } else {
    dialogTitle.value = "新增目录";
  }
  dialogVisible.value = true;
};

const handleOpenMenuDialog = (row: any) => {
  dialogTitle.value = "编辑目录";
  nextTick(() => {
    dialogRef.value.form = { ...row };
  });
  dialogVisible.value = true;
};
</script>

<template>
  <PageGuide>
    <template #header>
      <PaddingButton text="新增目录" @handleClick="handleCreate" />
    </template>
    <!--  content  -->
    <div class="bg-bg_color flex flex-col rounded pl-2 pr-2">
      <!--   table   -->
      <MenuTable
        :data="menuList"
        @refresh="getList"
        @handleOpenMenuDialog="handleOpenMenuDialog"
        @handleCreate="handleCreate"
      />
    </div>
    <div class="h-8" />

    <!-- 菜单信息弹窗 -->
    <MenuDialog
      ref="dialogRef"
      v-model:visible="dialogVisible"
      :title="dialogTitle"
      @refresh="getList"
    />
  </PageGuide>
</template>
