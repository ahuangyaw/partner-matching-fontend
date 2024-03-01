import Axios from "@/api/myAxios";
import { getCurrentUserStates, setCurrentUserStates } from "@/states/user";

export const getCurrentUser = async () => {
    //用户量不大的话可以不用缓存，每次跳转页面从远程请求

    //缓存
    // const currentUser = getCurrentUserStates();
    // if (currentUser) {
    //     return currentUser;
    // }  
    //如果不存在则从远程获取
    const res = await Axios.get('/user/current');
    if (res.data.code === 0) {
        setCurrentUserStates(res.data.data);
        return res.data.data;
    }
    return null;   
    

}

