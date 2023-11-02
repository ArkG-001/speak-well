<script setup lang="ts">
import high_risk from "@/assets/svg/high_risk.svg?component";
import medium_risk from "@/assets/svg/medium_risk.svg?component";
import low_risk from "@/assets/svg/low_risk.svg?component";
import alarm_info from "@/assets/svg/alarm_info.svg?component";
</script>

<template>
  <div class="h-[100px] w-full grid grid-cols-4 gap-4">
    <div class="bg-bg_color flex items-center justify-around">
      <high_risk class="w-[40px] h-[48px] cursor-pointer outline-none" />
      <div class="font-bold">高风险事件</div>
      <div class="text-[#9e0e0e]">0</div>
    </div>
    <div class="bg-bg_color flex items-center justify-around">
      <medium_risk class="w-[40px] h-[48px] cursor-pointer outline-none" />
      <div class="font-bold">中风险事件</div>
      <div class="text-[#e36c2]">0</div>
    </div>
    <div class="bg-bg_color flex items-center justify-around">
      <low_risk class="w-[40px] h-[48px] cursor-pointer outline-none" />
      <div class="font-bold">低风险事件</div>
      <div class="text-[#f0b60]">0</div>
    </div>
    <div class="bg-bg_color flex items-center justify-around">
      <alarm_info class="w-[40px] h-[48px] cursor-pointer outline-none" />
      <div class="font-bold">报警信息</div>
      <div>0</div>
    </div>
  </div>
</template>
