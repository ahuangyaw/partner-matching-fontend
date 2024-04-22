<template>
  <div id="addTeam">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="result"
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showPicker = true"
        />
        <van-popup
            v-model:show="showPicker"
            position="bottom">
          <van-date-picker
              @confirm="onConfirm"
              title="请选择过期时间(默认零点过期)"
              :min-date="minDate"
          />
        </van-popup>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast, Toast} from "vant";
import router from "@/router/route.ts";
import myAxios from "@/api/myAxios.ts";
import {useRoute} from "vue-router";

const initFormData = {
  "name": "",
  "description": "",
  "expireTime": "",
  "maxNum": 0,
  "password": "",
  "status": 0,
  "userId": 0
}
const addTeamData = ref(initFormData);


// 展示日期选择器
const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
const result = ref('');
const showPicker = ref(false);

const route = useRoute();
const id = route.query.id;


onMounted(async () =>{
  if (id <= 0 || id == null){
    showFailToast("加载队伍失败")
    return;
  }
  const res = await myAxios.get("/team/get",{
    params:{
      id:id,
    }
  });
  if (res.data.code === 0){
    addTeamData.value = res.data.data;
  }else {
    showFailToast("获取队伍列表失败")
  }
})



const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join('-');
  showPicker.value = false;
  addTeamData.value.expireTime =  result.value;
};

//提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  //todo 前端数据校验
  const res = await myAxios.post("/team/update",postData);
  if (res?.data.code === 0 && res.data){
    showSuccessToast("更新成功");
    await router.push({
      path: '/team',
      replace: true,
    });
  }else {
    showFailToast("更新失败")
  }
}



</script>

<style scoped>

</style>