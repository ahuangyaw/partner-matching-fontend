import {UserType} from "@/mdoels/user";

/**
 * 用户类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: string;
    maxNum: number;
    password: string;
    createUser?:UserType;
    status: number;
    createTime: Date;
    updateTime: Date;
    hasJoin:boolean
    joinNum:number
}