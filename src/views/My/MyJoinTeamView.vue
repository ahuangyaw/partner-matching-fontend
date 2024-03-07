<template>
    <div id="teamPage">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
        <van-button type="primary" @click="doJoinTeam">添加队伍</van-button>
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

const searchText = ref('');


// 页面刷新
const loading = ref(false);
const onRefresh = () => {
  setTimeout(async () => {

    loading.value = false;
    // 重新请求数据
    // 为给定 ID 的 user 创建请求
    const res = await Axios.get('/team/list');
    if (res?.data.code === 0){
      teamList.value = res.data.data;
      showSuccessToast('刷新成功');
      console.log(res.data.data);
    }else {
      showFailToast('刷新失败')
    }
  }, 1500);
};

//  添加队伍
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  });
}

//  获取队伍列表
const teamList = ref([]);
console.log(teamList.value);

//  搜索队伍
const listTeam = async (val) => {
  const res = await Axios.get('/team/list',{
    params:{
      searchText: val,
      pageNum:1
    }
  });
  if (res?.data.code === 0){
    teamList.value = res.data.data;
  }else {
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
#teamPage {

}
</style>