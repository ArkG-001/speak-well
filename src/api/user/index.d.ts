
export type UserResult = {
    /** 用户名 */
    username: string;
    /** token */
    token: string;
    /** `token` */
    msg: string;
    /** 头像 */
    avatar: string;
    /** 状态码 */
    code: number;
};

export type RefreshTokenResult = {
    success: boolean;
    data: {
        /** `token` */
        token: string;
        /** 用于调用刷新`accessToken`的接口时所需的`token` */
        refreshToken: string;
        /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
        expires: Date;
    };
};
