import {USerType} from "../mdoels/user"

let currentUser: USerType;

const setCurrentUserStates = (user : USerType) => {
    currentUser = user;
}

const getCurrentUserStates = () : USerType => {
    return currentUser;
}

export {
    setCurrentUserStates,
    getCurrentUserStates
}