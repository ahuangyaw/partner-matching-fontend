<template>
  <van-card v-for="user in userList"
            :desc="user.profile"
            :title="`${user.username} (${user.planetCode})`"
            :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { showFailToast, showSuccessToast } from "vant";

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
      console.log('/user/search/tags succeed', response.data);
      showSuccessToast('请求成功');
      return response.data?.data;
    })
    .catch(function (error) {
      console.log('/user/search/tags error', error.data);
      showFailToast('请求失败');
    });
  if (userListData) {

    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
        console.log('user.tags', user.tags)

      }
    })
    console.log('userListData', userListData)
    userList.value = userListData;
    console.log('userList3333333', userList.value);

  }
})

</script>

<style scoped></style>