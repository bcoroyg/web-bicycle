import models from "../db/models/index.js";

class UserService {
    static _userServiceInstance = null;

    constructor() { };

    static getInstance() {
        if (!UserService._userServiceInstance) {
            UserService._userServiceInstance = new UserService();
        };
        return UserService._userServiceInstance;
    };

    async create({data}){
        const user = await models.User.create(data);
        return user;
    }


    async findOne(options){
        const user = await models.User.findOne(options);
        return user;
    }
};

export default UserService;