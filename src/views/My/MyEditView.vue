<template>
  <van-form @submit="onSubmit">
    <van-field v-model="(editMy.currentValue as string)" :name="(editMy.editKey as string)"
      :label="(editMy.editKey as string)" :placeholder="`请填写${editMy.editName as string}`"
      :rules="[{ required: true, message: `请输入${editMy.editKey as string}` }]" />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import Axios from "@/api/myAxios";
import router from "@/router";
import { getCurrentUser } from "@/service/user";
import { showFailToast, showSuccessToast } from "vant";
import { ref } from "vue";
import { useRoute } from "vue-router";

// 当前用户信息
const route = useRoute();
const editMy = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})


//登录事件
const onSubmit = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    showFailToast("请先登录")
    return;
  }
  const res = Axios.post("/user/update", {
    "id": currentUser.id,
    [editMy.value.editKey as string]: editMy.value.currentValue,
  })
  if ((await res).data.code === 0 && (await res).data.data > 0) {
    showSuccessToast("修改成功")
    router.replace("/my");
  } else {
    showFailToast("修改失败");
  }
}
</script>

<style scoped></style>