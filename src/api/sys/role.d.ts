


export class RoleList {
    /** 角色id */
    id: number;
    /** 角色名称 */
    name: string;
    /** 备注 */
    comment: string | null;
    /** 修改时间 */
    update_time: string | null;
    /** 创建时间 */
    create_time: string | null;
    /** 是否删除 */
    is_delete: boolean;
    /** 状态 */
    status: boolean;
    /** 关联组织 */
    organ: Array<number>;
    /** 关联菜单 */
    menu: Array<number>;
}

export interface ParamsAdd {
    /** 角色名称 */
    name: string;
    /** 备注 */
    comment: string;
    /** 角色状态 */
    status?: boolean;
    /** 关联部门 */
    organ?: Array<number>;
    /** 权限菜单 */
    menu?: Array<number>;
}

