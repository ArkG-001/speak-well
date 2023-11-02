<script setup lang="ts">
const emit = defineEmits(["handleClick"]);

defineProps({
  text: {
    type: String,
    default: "创建"
  }
});
const handleClick = () => {
  emit("handleClick");
};
</script>

<template>
  <el-button type="primary" class="!pl-11 !pr-11" round @click="handleClick">
    {{ text }}
  </el-button>
</template>

<style scoped lang="scss"></style>
