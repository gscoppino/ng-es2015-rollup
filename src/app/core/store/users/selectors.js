function selectUserList(state) {
    return state.users.list;
}

export { selectUserList };
export default {
    list: selectUserList
};
