// export type Result = {
//     success: boolean;
//     data?: Array<any>;
// };

class Staff {
  /** 用户名 */
  username: string;
  /** 手机号 */
  mobile?: string;
  /** 关联部门 */
  organ?: number;
  /** 关联岗位id集合 */
  post?: Array<number>;
  /** 关联角色 */
  role?: Array<any>;
}

export class StaffList extends Staff {
  // export type StaffList = {
  /** 头像 */
  avatar: string | null;
  /** 备注 */
  comment: string | null;
  /** 创建日期 */
  date_joined: string;
  /** 邮箱 */
  email: string | null;
  /** id */
  id: number;
  /** 是否启用 */
  is_active: boolean;
  /** 是否登录 */
  is_login: boolean;
  /** 关联部门名称 */
  organ_name: string;
  /** 关联角色信息 */
  role_list: Array<any>;
  /**
   @description  用户类型
   @description 0: 内部用户 1: 客户用户
   * */
  user_type: 0 | 1;
}

export type ParamsData = {
  /** 列表数据 */
  page: number;
  /** 总条目数 */
  size: number;
  /** 搜索查询 */
  search?: string;
  /** 部门搜索带id搜索 */
  organ?: number;
};

type PostChildren = {
  id: number;
  name: string;
  status: boolean;
};

export type OrganList = {
  id: number;
  label: string;
  post_list: Array<PostChildren>;
  children?: Array<OrganChildren>;
};

export type ParamsDel = {
  id: number[];
};
export class ParamsAdd extends Staff {
  /** 密码 */
  password?: string;
  /** 邮箱 */
  email?: string;
  /** 备注 */
  comment?: string;
  /** 超级管理员 */
  is_superuser?: boolean;
  /** 组织管理员 */
  is_admin?: boolean;
  /**
   @description  用户类型
   @description 0: 内部用户 1: 客户用户
   * */
  user_type?: number;
  /** 员工编号 */
  employee_no?: string;
}

export class ParamsEdit extends Staff {
  /** id */
  id?: number;
  /** 密码 */
  password?: string;
}

export type ParamsRole = {
  /** 角色id */
  id: number;
  role: Array<number>;
};
