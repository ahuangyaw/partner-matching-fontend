<template>
  <van-card
      v-for="team in pros.teamList"
      :desc="team.description as string"
      :title="team.name"
      thumb="https://tse4-mm.cn.bing.net/th/id/OIP-C.5P4aFnf3IUNDLeQtROhfnwHaHa?w=198&h=198&c=7&r=0&o=5&pid=1.7"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{ '已加入人数:' + team.joinNum + '/' + team.maxNum }}
      </div>
      <div>
        {{ '创建时间 : ' + team.createTime }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间 : ' + team.expireTime }}
      </div>
    </template>

    <template #footer>
      <van-button size="mini" type="success" plain @click="preJoinTeam(team)" v-if=" !team.hasJoin">加入队伍
      </van-button>
      <van-button size="mini" type="primary" v-if="team.createUser?.id === currentUserStates?.id " plain
                  @click="doUpdateTeam(team.id)">更新队伍信息
      </van-button>
      <van-button size="mini" plain @click="doQuitTeam(team.id)" v-if="team.hasJoin">退出队伍</van-button>
      <van-button size="mini" type="danger" v-if="team.createUser?.id === currentUserStates?.id " plain
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doClear">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
</template>

<script setup lang="ts">
import {TeamType} from "@/mdoels/team";
import {teamStatusEnum} from "../constants/teamConstent.ts";
import Axios from "@/api/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUserStates} from "@/states/user.ts";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "@/service/user.ts";
import router from "@/router/route.ts";
import number = CSS.number;

// 密码
const password = ref('');
// 密码弹出框
const showPasswordDialog = ref(false);
const joinTeamId = ref();
//  当前用户状态
const currentUserStates = ref('')
onMounted(async () => {
  currentUserStates.value = await getCurrentUser();
})

interface TeamCardListProps {
  teamList: TeamType[]
}

const pros = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType
})
const doClear = () => {
  password.value = ''
  joinTeamId.value = ''
}
const preJoinTeam = (team:TeamType) => {
  joinTeamId.value = team.id;
    if(team.status === 0){
      doJoinTeam()

    }else{
      showPasswordDialog.value = true;
    }

}

//  加入队伍
const doJoinTeam = async () => {
  if(!joinTeamId){
    return;
  }
  const res = await Axios.post("team/join", {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res.data?.code == 0) {
    showSuccessToast("加入成功");
    location.reload();
  } else {
    showFailToast("加入失败" + res.data.description ? `${res.data.description}` : '');
  }
  doClear();
}

/**
 *  退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await Axios.post("team/quit", {
    teamId: id
  });
  if (res.data?.code == 0) {
    showSuccessToast("退出成功");
    location.reload();
  } else {
    showFailToast("退出失败" + res.data.description ? `${res.data.description}` : '');
  }
}

/**
 *   解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await Axios.post("team/delete", {
    id
  });
  if (res.data?.code == 0) {
    showSuccessToast("解散成功");
  } else {
    showFailToast("解散失败" + res.data.description ? `${res.data.description}` : '');
  }
}
/**
 *  跳转到更新队伍信息页面
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id
    }
  })
}


</script>

<style scoped>

</style>