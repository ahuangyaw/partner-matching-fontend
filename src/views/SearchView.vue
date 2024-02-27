<template>
    <form action="/">
        <van-search
            v-model="SearchText"
            show-action
            placeholder="请输入搜索标签"
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>
    <van-row gutter="20" >
        <van-col v-for="tag in activeIds" style="padding: 5px;">
            <van-tag  :show="show" closeable size="medium" type="primary" @close="close">
            {{ tag }}
            </van-tag>
        </van-col>
    </van-row>
    <van-divider content-position="left">选择标签</van-divider>
    <van-tree-select
    v-model:active-id="activeIds"
    v-model:main-active-index="activeIndex"
    :items="tagList"
    />
    

</template>

<script setup lang="ts">
import { ref } from 'vue';

//标签列表
const originTagList = [
    {
        text: '性别',
        children: [
            { text: '男', id: '男' },
            { text: '女', id: '女' },
        ],
    },
    {
        text: '年级',
        children: [
            { text: '大一', id: '大一' },
            { text: '大二', id: '大二' },
            { text: '大三', id: '大三' },
            { text: '大一', id: '大4' },
            { text: '大二', id: '大5' },
            { text: '大三', id: '大6' },
            { text: '大一', id: '大7' },
            { text: '大二', id: '大8' },
            { text: '大三', id: '大9' },
        ],
    }
];

const SearchText = ref('');
//标签列表
let tagList = ref(originTagList);
const onSearch = () => {
    tagList.value = originTagList.map(parentTag =>{
    const tempChildren =  [...parentTag.children];
    const tempParentTag =  {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(SearchText.value))
    return tempParentTag;
    })
    
};
// 清空
const onCancel = () => {
    SearchText.value = '';
    tagList.value = originTagList;
    
}

const show = ref(true);
// 默认选中
const activeIds = ref([]);
const activeIndex = ref(0);
const close = (tag: never) => {
    activeIds.value.splice(activeIds.value.indexOf(tag), 1);
}

</script>

<style scoped>

</style>