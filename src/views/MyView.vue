<template>
    <div>
      <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
        <img :src="user.avatarUrl" alt="" style="height: 48px; ">
      </van-cell>
      <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
      <van-cell title="账号" :value="user.user_account" />
      <van-cell title="性别" is-link :value="user.gender" />
      <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
      <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
      <van-cell title="星球编号"   :value="user.planetCode" />
    </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";

const user = {
    id: 1,
    username: 'huang',
    user_account: 'huang',
    avatarUrl: 'https://webstatic.mihoyo.com/upload/event/2022/07/29/c31dd1d732913e4ab5f3d4f03346a706_9097205533659112586.png',
    gender:'男',
    phone: "123",
    email: '3121@qq.com',
    planetCode: 4,
}
const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
    router.push({
      path:'/my/edit',
      query:{
        editKey,
        editName,
        currentValue,
      }
    })
}
</script>

<style scoped>

</style>