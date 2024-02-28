<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="(editMy.currentValue as string)"
      :name="(editMy.editKey as string)"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const editMy = ref({
  editKey: route.query.editKey,
  editName: route.query.editname,
  currentValue: route.query.currentValue
})

const onSubmit = (values: string) => {
  //todo 将editKey,editName,roucurrentValue提交到后台
  console.log('submit', values);
  
}
</script>

<style scoped>

</style>