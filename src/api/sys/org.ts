import { http } from "@/utils/http";
import { Result } from "../types";
import { ParamsOrg, ParamsAddOrg } from "./org.d";

/** 获取所以部门列表 */
export const reqGetOrgList = (data?: ParamsOrg) => {
  return http.request<any>(
    "get",
    data?.name
      ? `/system/organ/user_dept_list/?name=${data?.name}`
      : `/system/organ/user_dept_list/`
  );
};

/** 新增部门 */
export const reqCreateOrg = (data: ParamsAddOrg) => {
  return http.request<any>("post", `/system/organ/`, { data });
};
