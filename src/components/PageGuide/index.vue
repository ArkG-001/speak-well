<script setup lang="ts">
import GuideContent from "@/components/GuideContent/index.vue";
defineProps({
  header: {
    type: Boolean,
    default: true
  },
  baseTemp: {
    type: Boolean,
    default: true
  },
  guid: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div class="main">
    <!--  指引  -->
    <GuideContent v-if="guid" />
    <!--  page头部  -->
    <div v-if="header">
      <div class="header flex items-center justify-end">
        <slot name="header" />
      </div>
    </div>

    <!--  页面基本样式模版  -->
    <div v-if="baseTemp" class="bg-bg_color flex flex-col rounded pl-2 pr-2">
      <slot />
    </div>
    <!--  无样式  -->
    <div v-else>
      <slot />
    </div>
  </div>
</template>
