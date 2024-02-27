<template>
    <van-nav-bar
        title="标题"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        >
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>

    <div id="content">
        <template v-if="active === 'index'">
            <IndexView/>
        </template>
        <template v-if="active === 'team'">
            <TeamView/>
        </template>
        <template v-if="active === 'partner'">
            <partnerView/>
        </template>
        <template v-if="active === 'my'">
            <MyView/>
        </template>
    </div>

    <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="index">首页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="partner">伙伴</van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';
import IndexView from '../../views/IndexView.vue';
import TeamView from '../../views/TeamView.vue';
import partnerView from '../../views/PartnerView.vue';
import MyView from '../../views/MyView.vue';


const onClickLeft = () => history.back();
const onClickRight = () => alert('搜索');

// 导航栏
const active = ref('index');//选择初始高亮
const onChange = () => showToast();
</script>

<style scoped>

</style>