function selectUserList(state) {
    return state.users;
}

export { selectUserList };
export default {
    list: selectUserList
};