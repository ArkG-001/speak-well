export const columns: TableColumnList = [
  {
    label: "账号",
    prop: "mobile",
    align: "left"
  },
  {
    label: "姓名",
    prop: "username",
    align: "left"
  },
  {
    label: "部门",
    prop: "organ_name",
    align: "left"
  },
  {
    label: "启用状态",
    prop: "is_active",
    slot: "is_active"
  },
  {
    label: "操作",
    fixed: "right",
    minWidth: 160,
    slot: "operation"
  }
];

/** 撑满内容区自适应高度相关配置 */
export const adaptiveConfig = {
  /** 表格距离页面底部的偏移量，默认值为 `96` */
  offsetBottom: 86,
  /** 页面 `resize` 时的防抖时间，默认值为 `60` ms */
  timeout: 60
};
