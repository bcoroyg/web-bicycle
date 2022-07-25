class UserService {
    static _userServiceInstance = null;

    constructor() { };

    static getInstance() {
        if (!UserService._userServiceInstance) {
            UserService._userServiceInstance = new UserService();
        };
        return UserService._userServiceInstance;
    };
};

export default UserService;