import { http } from "@/utils/http";
import { Result } from "../types";
import { RoleList, ParamsAdd } from "./role.d";

/** 获取角色下拉列表 */
export const reqGetRoleList = () => {
  return http.get<{}, Result<RoleList>>("/system/role/all_role/");
};

/** 新增角色 */
export const reqAddRole = (data: ParamsAdd) => {
  return http.post<ParamsAdd, Result<any>>("/system/role/", { data });
};

/** 编辑角色 TODO:接口存在问题 需要和后端协商处理 */
export const reqUpdateRole = (data: RoleList) => {
  return http.request<Result<any>>("put", `/system/role/${data.id}/`, { data });
};
