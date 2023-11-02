import { http } from "@/utils/http";
import {
  StaffList,
  ParamsData,
  OrganList,
  ParamsDel,
  ParamsAdd,
  ParamsEdit,
  ParamsRole
} from "./staff.d";
import { Result } from "../types";

/** 获取员工列表 */
export const reqGetUserList = (params: ParamsData) => {
  return http.get<ParamsData, Result<StaffList>>("/system/user/all_user/", {
    params
  });
};

/** 删除员工 */
export const reqDeleteStaff = (data: ParamsDel) => {
  return http.post<ParamsDel, Result<any>>(`/system/user/batch_delete/`, {
    data
  });
};

/** 新增员工 */
export const reqAddStaff = (data: ParamsAdd) => {
  return http.post<ParamsAdd, Result<any>>(`/system/user/`, { data });
};

/** 编辑员工 */
export const reqEditStaff = (data: ParamsEdit) => {
  return http.request<any>("put", `/system/user/${data.id}/`, {
    data
  });
};

/** 重置员工密码 */
// export const reqResetStaffPwd = (id?: number) => {};

/** 更改账号启用状态 */
export const reqUpdateStaffStatus = (id?: number) => {
  return http.request<any>("post", `/system/user/${id}/set_status/`);
};

/** 获取部门下拉列表 */
export const reqGetOrganList = () => {
  return http.get<object, Result<OrganList>>("/system/organ/user_dept_list/");
};

/** update员工角色 */
export const reqUpdateStaffRole = (data: ParamsRole) => {
  return http.post<ParamsRole, Result<any>>(`/system/user/${data.id}/role/`, {
    data
  });
};
