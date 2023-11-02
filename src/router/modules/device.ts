import { $t } from "@/plugins/i18n";

export default {
  path: "/device",
  redirect: "/device/staff",
  meta: {
    icon: "informationLine",
    title: $t("menus.deviceMgt"),
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/device/list",
      name: "list",
      component: () => import("@/views/device/list/index.vue"),
      meta: {
        title: $t("menus.deviceList")
      }
    },
    {
      path: "/device/customize",
      name: "customize",
      component: () => import("@/views/device/customize/index.vue"),
      meta: {
        title: $t("menus.customize")
      }
    }
  ]
} as RouteConfigsTable;
