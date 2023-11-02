<script lang="ts" setup>
import { ref } from "vue";
import { reqGetOrganList } from "@/api/sys/staff";

const props = defineProps({
  organ: {
    type: Number,
    default: null
  },
  type: {
    type: String,
    default: "staff"
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["handleSearch", "update:organ"]);
const departments = ref([]);
const getDept = async () => {
  const { results } = await reqGetOrganList();
  departments.value = results;
};

const handleChange = val => {
  if (props.type === "staff") return;
  emit("update:organ", val);
  emit("handleSearch");
};
getDept();
</script>

<template>
  <el-cascader
    style="width: 500px"
    filterable
    :options="departments"
    :props="{
      checkStrictly: true,
      value: 'id'
    }"
    clearable
    :model-value="organ"
    @change="handleChange"
    :disabled="disabled"
  />
</template>
