<script setup lang="ts">
import { onMounted, ref } from "vue";

onMounted(() => {
  loadMapScript(); // 加载百度地图资源
});
// 初始化地图

const init = () => {
  const BMap = window.BMap; // 注意要带window，不然会报错（注意官方api,会有改动，之前是Bmap,后面3.0版本改为了BMap,最好查文档或者打印一下window）
  const map = new BMap.Map("map"); // allmap必须和dom上的id一直
  map.centerAndZoom(new BMap.Point(104.04263635868074, 30.556100647961866), 11); // 初始化地图,设置中心点坐标和地图级别
  map.setCurrentCity("成都");
  map.enableScrollWheelZoom(true);
  // 获取定位
  const geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(res => {
    console.log(res, "res");
    const point = new BMap.Point(res.longitude, res.latitude);
    map.centerAndZoom(point, 17); // 初始化地图,设置中心点坐标和地图级别
    const marker = new BMap.Marker(point);
    const marker2 = new BMap.Marker(new BMap.Point(121.313307, 31.133756));
    map.addOverlay(marker);
    map.addOverlay(marker2);
  });
};
const loadMapScript = () => {
  // 此处在所需页面引入资源就是，不用再public/index.html中引入
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.className = "loadmap"; // 给script一个类名
  script.src =
    "https://api.map.baidu.com/getscript?v=3.0&ak=sfo3vk4lAtLo8w4qscWp418wOQIVVTb9";
  // 此处需要注意：申请ak时，一定要应用类别一定要选浏览器端，不能选服务端，不然地图会报ak无效
  script.onload = () => {
    // 使用script.onload，待资源加载完成，再初始化地图
    init();
  };
  const loadmap = document.getElementsByClassName("loadmap");
  if (loadmap) {
    // 每次append script之前判断一下，避免重复添加script资源标签
    for (let i = 0; i < loadmap.length; i++) {
      document.body.removeChild(loadmap[i]);
    }
  }

  document.body.appendChild(script);
};

const message = ref("");
// 发送消息
const handleSend = () => {
  console.log(message, "message");
};
</script>

<template>
  <div
    class="h-full overflow-auto flex flex-col"
    style="min-height: calc(100vh)"
    id="map"
  />
  <div
    class="w-1/6 h-5/6 bg-[#001529] fixed left-3 top-3 p-3 flex flex-col bg-opacity-40"
  >
    <!--  记录  -->
    <div class="h-[calc(100%-40px)] w-full bg-amber-700" />
    <!--  发送框  -->
    <el-input clearable v-model="message" @keyup.enter="handleSend" />
  </div>
</template>

<style lang="scss" scoped></style>
