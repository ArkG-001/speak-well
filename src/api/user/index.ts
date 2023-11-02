import { http } from "@/utils/http";
import { UserResult } from "@/api/user/index.d";

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/system/login/", { data });
};

/** 获取权限 */
export const getAsyncRoutes = () => {
  return http.request("get", "/system/menu/");
};
