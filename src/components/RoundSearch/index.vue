<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { debounce } from "lodash";

const emit = defineEmits(["handleSearch"]);
const searchVal = ref("");
defineExpose({
  searchVal
});

defineProps({
  placeholder: {
    type: String,
    default: "请输入员工姓名 / 手机号"
  }
});
const handleSearch = debounce(() => {
  emit("handleSearch", searchVal.value);
}, 500);
</script>

<template>
  <el-input
    v-model="searchVal"
    @keyup.enter="handleSearch"
    @input="handleSearch"
    class="w-50 m-2"
    clearable
    :placeholder="placeholder"
    :prefix-icon="Search"
  />
</template>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
  border-radius: 15px;
  background-color: #e6edf4;
}
</style>
