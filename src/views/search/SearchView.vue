<template>
  <form action="/">
    <van-search
        v-model="newTagSearch"
        show-action placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"/>
  </form>
  <div id="tage" :class="{ 'has-border': existedTagSearchList.length > 0 }">
    <div v-if="existedTagSearchList.length<=0">
      <van-empty :image-size="[35, 20]" description="未选择标签"/>
    </div>
    <div v-else class="span_tag">
      <span v-for="tage in existedTagSearchList">
    <van-tag :show="show" class="van_tag" closeable size="large" type="primary"
             @close="close(tage)">{{ tage }}</van-tag>
    </span>
    </div>
  </div>
  <van-tree-select
      v-model:active-id="existedTagSearchList"
      v-model:main-active-index="activeIndex"
      :items="userTagsList"
  />
  <van-divider/>
  <van-space direction="vertical" fill>
    <van-button v-if="userId" block type="primary" @click="updateTag">修改
    </van-button>
    <van-button block v-else type="primary" @click="toSearchResult">搜索</van-button>
  </van-space>
</template>

<script setup lang="ts">
import {onMounted, ref, watch,} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {showFailToast, showSuccessToast, showToast} from "vant";
import Axios from "@/api/myAxios.ts";
import {getCurrentUser} from "@/service/user.ts";
import userTagsList from "@/constants/UserTagsList.ts";

const newTagSearch = ref('');
const existedTagSearchList = ref([]);
const activeIndex = ref(0);
const show = ref(true);
const router = useRouter()
const route = useRoute()
const userId = ref();
const userTags = ref([]);

const ids = userTagsList.flatMap(item => item.children.map(child => child.id));
const toUpperCaseTags = ids.map(id => id.charAt(0).toUpperCase() + id.slice(1));

/**
 *  搜索过滤
 */
const onSearch = () => {
  const newTagUpperCase = newTagSearch.value.charAt(0).toUpperCase() + newTagSearch.value.slice(1)
  const existedTagSearchListUpperCase = existedTagSearchList.value.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1));
  if (toUpperCaseTags.includes(newTagUpperCase) && !existedTagSearchListUpperCase.includes(newTagUpperCase)) {
    existedTagSearchList.value.push(newTagUpperCase)
  } else if (existedTagSearchListUpperCase.includes(newTagUpperCase)) {
    showSuccessToast("该标签已选择")
  } else {
    showSuccessToast("不存在该标签")
  }
};

// 清空数据
const onCancel = () => {
  existedTagSearchList.value = []
}

//关闭标签
const close = (tag: never) => {
  existedTagSearchList.value = existedTagSearchList.value.filter((tage) => tage !== tag);
}

const updateTag = async () => {
  const update = await Axios.post("/user/update/tags", {
    id: userId.value,
    tagList: existedTagSearchList.value
  })
  if (update && update >= 1) {
    await router.push("/user")
  }
}

onMounted(() => {
  const {id, tags} = route.query
  if (id && tags) {
    userId.value = id;
    userTags.value = tags
    existedTagSearchList.value = tags
  }
  getCurrentUser()
})
watch(existedTagSearchList, (newList) => {
  if (newList.length > 12) {
    showFailToast("最多只能选择12个标签")
    existedTagSearchList.value = existedTagSearchList.value.slice(0, 12)
  }
});
/**
 * 搜索
 */
const toSearchResult = () => {
  if (existedTagSearchList.value.length > 0) {
    router.push({
      path: "/search/list/",
      query: {
        tags: existedTagSearchList.value
      }
    })
  } else {
    showFailToast("未选择标签")
  }
}

</script>

<style scoped>
:deep(.van-search__field) {
  flex: 1;
  align-items: center;
  padding: 0 var(--van-padding-xs) 0 0;
  height: var(--van-search-input-height);
  background-color: transparent;
}
</style>