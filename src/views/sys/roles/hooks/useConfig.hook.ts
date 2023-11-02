export const columns: TableColumnList = [
  {
    label: "角色名称",
    prop: "name",
    align: "left"
  },
  {
    label: "描述",
    prop: "comment",
    align: "left"
  },
  {
    label: "操作",
    fixed: "right",
    minWidth: 60,
    slot: "operation"
  }
];
