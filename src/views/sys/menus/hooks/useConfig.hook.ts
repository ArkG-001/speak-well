export const columns: TableColumnList = [
  {
    label: "菜单名称",
    prop: "name",
    align: "left"
  },
  {
    label: "菜单类型",
    prop: "type_name",
    align: "left"
  },
  {
    label: "菜单路径",
    prop: "web_path",
    align: "left"
  },
  {
    label: "唯一标识",
    prop: "permission",
    align: "left"
  },
  {
    label: "图标icon",
    prop: "icon",
    align: "left"
  },
  {
    label: "操作",
    fixed: "right",
    minWidth: 60,
    slot: "operation"
  }
];
