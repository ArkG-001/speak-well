export const columns: TableColumnList = [
  {
    label: "姓名",
    prop: "username",
    align: "left"
  },
  {
    label: "手机号",
    prop: "mobile",
    align: "left"
  },
  {
    label: "登录账号",
    prop: "web_path",
    align: "left"
  },
  {
    label: "所属部门",
    prop: "organ_name",
    align: "left"
  },
  {
    label: "状态",
    prop: "is_active",
    align: "left",
    slot: "status"
  }
];
