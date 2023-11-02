export interface MenuList {
    /** 菜单id */
    id: number;
    /** 菜单名称 */
    name: string;
    /** 菜单标题 */
    title: string;
    /**
     * @description 菜单类型
     * @description 0=目录 1=菜单 2=按钮
     * */
    type: number;
    /** 类型名称 */
    type_name: string;
    /** 修改时间 */
    update_time: string;
    /** 创建时间 */
    create_time: string;
    /** 父菜单名称 */
    parent: string;
    /** 是否是目录 */
    is_catalog: boolean;
    /** web路径 */
    web_path: string;
    /** 组件名称 */
    component: string;
    /** 状态 */
    status: boolean;
    /** 是否显示 */
    visible: boolean;
    /** 子菜单列表 */
    children: MenuList[];
    /** 权限标识 */
    permission: string;
}

export interface Menu {
    /** 菜单名称 */
    name: string;
    /** 菜单标题 */
    title: string;
    /**
     * @description 菜单类型
     * @description 0=目录 1=菜单 2=按钮
     * */
    type: number;
    /** 是否是目录 */
    is_catalog: boolean;
    /** web路径 */
    web_path?: string;
    /** 组件名称 */
    component?: string;
    /** 状态 */
    status?: boolean;
    /** 是否显示 */
    visible?: boolean;
    /** 子菜单列表 */
    menu_ids?: number[];
}
