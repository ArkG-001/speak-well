import { $t } from "@/plugins/i18n";

export default {
  path: "/sys",
  redirect: "/sys/staff",
  meta: {
    icon: "informationLine",
    title: $t("menus.systemMgt"),
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/sys/staff",
      name: "staff",
      component: () => import("@/views/sys/staff/index.vue"),
      meta: {
        title: $t("menus.staff")
      }
    },
    {
      path: "/sys/org",
      name: "org",
      component: () => import("@/views/sys/org/index.vue"),
      meta: {
        title: $t("menus.org")
      }
    },
    {
      path: "/sys/roles",
      name: "roles",
      component: () => import("@/views/sys/roles/index.vue"),
      meta: {
        title: $t("menus.rolesMgt")
      }
    },
    {
      path: "/sys/menus",
      name: "menus",
      component: () => import("@/views/sys/menus/index.vue"),
      meta: {
        title: $t("menus.menusMgt")
      }
    }
  ]
} as RouteConfigsTable;
