<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Toast } from "vant";

import Axios from "@/api/myAxios.ts";

import qs from 'qs'

const route = useRoute();
const { tags } = route.query;

const userList = ref([]);


onMounted(async () => {
  // 为给定 ID 的 user 创建请求
  const userListData = await Axios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    //序列化
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
    .then(function (response) {
      console.log('/user/search/tags succeed', response);
      Toast.success('请求成功');
      return response.data?.data;
    })
    .catch(function (error) {
      console.log('/user/search/tags error', error);
      Toast.fail('请求失败');
    });
  if (userListData) {
    userListData.forEach((user: { tags: string; }) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

</script>

<style scoped></style>