<template>
  <van-form @submit="onSubmit">
    <van-field
        v-if="editMy.editName != '性别'"
        v-model="editMy.currentValue"
        :name="editMy.editKey as string"
        :label="editMy.editName as string"
        :placeholder="'请输入${editUser.editName}'"
    />
    <van-field name="radio" label="性别" v-if="editMy.editName === '性别'">
      <template #input>
        <van-radio-group v-model="editMy.currentValue" direction="horizontal">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import Axios from "@/api/myAxios";
import router from "@/router/route.ts";
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
  if (editMy.value.currentValue === "男"){
    editMy.value.currentValue = '0';
  }
  if (editMy.value.currentValue === "女"){
    editMy.value.currentValue = '1';
  }

  const res = Axios.post("/user/update", {
    "id": currentUser.id,
    [editMy.value.editKey as string]: editMy.value.currentValue,
  })
  if ((await res).data.code === 0 && (await res).data.data > 0) {
    showSuccessToast("修改成功")
    router.replace("/my/update");
  } else {
    showFailToast("修改失败");
  }
}
</script>

<style scoped></style>