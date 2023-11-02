<script setup lang="ts">
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

const treeIndent = 30;
const defaultProps = {
  children: "children",
  label: "label"
};

const emit = defineEmits([
  "refresh",
  "handleChangeOrg",
  "handleSearchOrg",
  "handleAdd"
]);

const handleClick = (data: any) => {
  console.log(data);
  emit("handleChangeOrg", data);
};

const handleSearch = (val: string) => {
  emit("handleSearchOrg", val);
};

const handleAdd = () => {
  console.log("add");
  emit("handleAdd");
};
</script>

<template>
  <PageGuide
    :guid="false"
    class="h-full bg-bg_color overflow-auto"
    :style="{ minHeight: `calc(100vh - 118px)` }"
  >
    <template #header>
      <RoundSearch
        placeholder="请输入关键字进行过滤"
        @handleSearch="handleSearch"
      />
    </template>
    <el-tree
      :data="data"
      node-key="id"
      draggable
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps"
      :indent="treeIndent"
      @node-click="handleClick"
    >
      <template v-slot:default="{ node }">
        <element-tree-line
          :node="node"
          :showLabelLine="true"
          :indent="treeIndent"
        >
          <template v-slot:after-node-label>
            <span style="padding-right: 10px">
              <el-icon @click.stop="handleAdd" class="ml-2">
                <CirclePlus />
              </el-icon>
              <el-icon class="ml-2"><EditPen /></el-icon>
              <el-icon class="ml-2" color="red"><Delete /></el-icon>
            </span>
          </template>
        </element-tree-line>
      </template>
    </el-tree>
  </PageGuide>
</template>
