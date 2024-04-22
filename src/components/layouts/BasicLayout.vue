<template>
  <van-nav-bar

      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route>
    <van-tabbar-item to="/" icon="home-o" name="index">首页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/partner" icon="friends-o" name="partner">伙伴</van-tabbar-item>
    <van-tabbar-item to="/my" icon="setting-o" name="my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import router from '@/router/route.ts';

const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push('/search')
}


</script>

<style scoped>
#content {
  padding-bottom: 60px;
}
</style>