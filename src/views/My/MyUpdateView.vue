<template>
  <template v-if="user">
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl', '头像', user.avatarUrl)">
      <img :src="user.avatarUrl" alt="" style="height: 48px; ">
    </van-cell>
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
      @click="toEdit('username', '昵称', user.username)" />
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="自我介绍" is-link to="/user/edit" :value="user.profile"  @click="toEdit('profile', '自我介绍', user.profile)"/>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender', '性别', user.gender)" />
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)" />
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)" />
    <van-cell title="编号" :value="user.planetCode" />
  </template>
  <div>
    <van-button type="danger" size="large" @click="loginOut" >推出登录</van-button>
  </div>
</template>

<script setup lang="ts">
import { getCurrentUser } from "@/service/user";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Axios from "@/api/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";


const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
  console.log(user.value);
  user.value.gender = user.value.gender === 0 ? '男' : '女';
})

const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/my/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const loginOut = async () => {
  const res = await Axios.post('user/logout');
  if (res.data.code === 0){
    showSuccessToast('退出登录成功')
    await router.push('/my')
  }else {
    showFailToast('退出登录失败')
  }

}
</script>

<style scoped></style>