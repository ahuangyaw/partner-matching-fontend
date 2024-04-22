<template >
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-cell center title="心动模式" >
      <template #right-icon>
        <van-switch v-model="isMode" />
      </template>
    </van-cell>
    <user-card-list :user-list="userList" :loading="pageLoading"></user-card-list>
    <van-empty v-if="!userList || userList.length < 1" description="找不到信息"/>
  </van-pull-refresh>
 </template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import Axios from "@/api/myAxios.ts";

import UserCardList from "@/components/UserCardList.vue";


const isMode = ref<boolean>(false);

const pageLoading = ref<boolean>(false);

const userList = ref([]);
const loadData = async () => {
  pageLoading.value = false;
  if (isMode.value){
    const num = 8;
    // 为给定 ID 的 user 创建请求
    const userListData = await Axios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response.data);
          return response.data?.data;
        })
        .catch(function (error) {
          console.log('/user/match error', error.data);
          showFailToast('请求失败');
        });
    if (userListData) {
      userListData.forEach((user) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData;
    }
  }else {
    const userListData = await Axios.get('/user/recommend', {
      params: {
        pageSize: 12,
        pageNum: 1
      },
    })
        .then(function (response) {
          return response.data?.data?.records;
        })
        .catch(function (error) {
          showFailToast('请求失败');
        });
    if (userListData) {
      userListData.forEach((user) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      })
      userList.value = userListData;
    }
  }
}

watchEffect(() => {
  loadData();
})

// 页面刷新
const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {

    loading.value = false;
    // 重新请求数据
    // 为给定 ID 的 user 创建请求
    loadData();
  }, 1500);
};

</script>
<style scoped></style>