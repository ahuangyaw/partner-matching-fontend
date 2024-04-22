<template>
  <van-skeleton title avatar :row="3" :loading="pros.loading" v-for="user in pros.userList">
    <van-card
              :desc="user.profile as string"
              :title="`${user.username} (${user.planetCode})`"
              :thumb="user.avatarUrl as string"
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
  </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "@/mdoels/user";

interface UserCardListProps {
  loading:boolean;
  userList: UserType[];
}

const pros = withDefaults(defineProps<UserCardListProps>(), {
  loading:true,
  userList: [] as UserType
});


</script>

<style scoped>

</style>