<template>
  <template v-if="user">
    <van-cell title="当前用户"  :value="user?.username"/>
    <van-cell title="个人中心" is-link to="/my/update" />
    <van-cell title="我创建的队伍" is-link to="my/team/create" />
    <van-cell title="我加入的队伍" is-link to="my/team/join" />
  </template>
  <template v-else>
    <van-card title="点击登录" @click="toLogin"/>
  </template>
</template>

<script setup lang="ts">
import { getCurrentUser } from "@/service/user";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";


const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
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

const toLogin = () => {
  router.push('/my/login')
}
</script>

<style scoped></style>