<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { storageLocal } from "@pureadmin/utils";
import { responsiveStorageNameSpace } from "@/config";
import { emitter } from "@/utils/mitt";

const showGuidance = ref(
  storageLocal().getItem<StorageConfigs>(
    `${responsiveStorageNameSpace()}configure`
  )?.showGuidance ?? true
);

onMounted(() => {
  emitter.on("guidanceChange", key => {
    showGuidance.value = key;
  });
});

onBeforeUnmount(() => {
  // 解绑`guidanceChange`公共事件，防止多次触发
  emitter.off("guidanceChange");
});
</script>

<template>
  <div v-if="showGuidance" :class="`mb-3 bg-teal-200 h-[109px]`">
    员工列表109
  </div>
</template>
