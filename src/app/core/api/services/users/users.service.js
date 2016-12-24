UserService.$inject = ['ApiFactory'];
function UserService(ApiFactory) {
    return ApiFactory.create('users');
}

export default UserService;