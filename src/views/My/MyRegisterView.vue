<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="userAccount" name="账号" label="账号" placeholder="用户名"
                :rules="[{ required: true, message: '请填写账号' }]" />
            <van-field v-model="userPassword" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import myAxios from '@/api/myAxios';
import router from '@/router';
import { showFailToast, showSuccessToast } from 'vant';
import { ref } from 'vue';

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
    const res = await myAxios.post('/user/login', {
        userAccount: userAccount.value,
        userPassword: userPassword.value,
    })
    console.log(res, "用户登录");
    showSuccessToast('登录成功');
    if (res.data.code === 0 && res.data) {
        showSuccessToast('登录成功');
        router.replace('/')
    } else {
        showFailToast('登录失败');
    }


};
</script>

<style scoped></style>