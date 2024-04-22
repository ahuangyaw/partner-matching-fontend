<template>
    <div id="teamPage">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <van-tabs v-model:active="active" @change="onTabChange">
          <van-tab title="公开" name="public"></van-tab>
          <van-tab title="加密" name="private"></van-tab>
        </van-tabs>
        <van-button icon="plus" type="primary"  class="add-button"  @click="doAddTeam"></van-button>
        <team-card-list :teamList="teamList"></team-card-list>
        <van-empty v-if="!teamList || teamList.length < 1" description="找不到信息"/>
      </van-pull-refresh>
    </div>
</template>

<script setup lang="ts">
import  { useRouter } from 'vue-router';
const router = useRouter();
import TeamCardList from "@/components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import Axios from "@/api/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
// 搜索词
const searchText = ref('');
// 公开/加密
const active = ref('public');
// 切换公开/加密
const onTabChange = (name: string) => {
  if (name === 'public'){
    listTeam(searchText.value,0);
  }else {
    listTeam(searchText.value,2);
  }
}

// 页面刷新
const loading = ref(false);
const onRefresh = () => {
  setTimeout(async () => {
    loading.value = false;
    // 重新请求数据
    // 为给定 ID 的 user 创建请求
    onTabChange
    showSuccessToast('刷新成功');
  }, 1500);
};

//  添加队伍
const doAddTeam = () => {
  router.push({
    path: '/team/add'
  });
}

//  获取队伍列表
const teamList = ref([]);
console.log(teamList.value);

/**
 *  获取队伍列表
 * @param val
 * @param status
 */
const listTeam = async (val,status = 0) => {
  const res = await Axios.get('/team/list',{
    params:{
      searchText: val,
      pageNum:1,
      status
    }
  });
  if (res?.data.code === 0){
    teamList.value = res.data.data;
  }else if (res?.data.code === 50000){
    showFailToast("目前没有队伍")
  }
  else {
    showFailToast("获取队伍列表失败")
  }
}

onMounted( () => {
 listTeam('');
})


//  搜索队伍
const onSearch = (val) => {
  listTeam(val);
};
</script>

<style scoped>
.add-button {
  position: fixed;
  bottom: 60px;
  right: 12px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 1;
}
</style>