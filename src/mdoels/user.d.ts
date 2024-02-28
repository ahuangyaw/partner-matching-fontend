/**
 * 用户类别
 */
export type CurrentUser = {
    id: number;
    username: string;
    user_account: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    tags:string[];
    createTime: Date;
}