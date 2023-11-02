export interface ParamsOrg {
  /**
   * 部门名称搜索
   */
  name?: string;
}

export interface ParamsAddOrg {
  /**
   * 部门名，unique不可重复
   */
  name: string;
  /**
   * 负责人
   */
  owner?: string;
  /**
   * 父部门
   */
  parent?: number;
  /**
   * 电话
   */
  phone?: string;
  /**
   * 状态
   */
  status?: boolean;
}
