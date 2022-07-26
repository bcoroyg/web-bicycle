import models from "../db/models/index.js";
class BicycleService {
    static _bicycleServiceInstance = null;

    constructor() { };

    static getInstance() {
        if (!BicycleService._bicycleServiceInstance) {
            BicycleService._bicycleServiceInstance = new BicycleService();
        };
        return BicycleService._bicycleServiceInstance;
    };

    async find(){
        const bicycles = await models.Bicycle.find({});
        return bicycles;
    }

    async create({data}){
        const bicycle = await models.Bicycle.create(data);
        return bicycle;
    }
};

export default BicycleService;