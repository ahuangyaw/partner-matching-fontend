/**
 * 用户类别
 */
export type USerType = {
    id: number;
    username: string;
    user_account: string;
    avatarUrl?: string;
    gender: number;
    profile ?: string;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    tags:string[];
    createTime: Date;
}