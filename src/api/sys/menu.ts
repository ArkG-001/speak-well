import { http } from "@/utils/http";
import { Result } from "../types";
import { MenuList, Menu } from "./menu.d";

/** 获取菜单列表 */
export const reqGetMenuList = () => {
  return http.get<{}, Result<MenuList[]>>("/system/menu/all/");
};

/** 新增菜单 */
export const reqCreateMenuList = data => {
  return http.post<{}, Result<Menu>>("/system/menu/", { data });
};

/** 编辑菜单 */
export const reqEditMenuList = data => {
  return http.request<Result<Menu>>("put", `/system/menu/${data.id}/`, {
    data
  });
};

/** 删除菜单 */
export const reqDelMenuList = id => {
  return http.request<Result<any>>("delete", `/system/menu/${id}/`);
};
