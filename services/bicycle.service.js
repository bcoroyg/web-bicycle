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

    async find(option={}){
        const bicycles = await models.Bicycle.find(option);
        return bicycles;
    }

    async create({data}){
        const bicycle = await models.Bicycle.create(data);
        return bicycle;
    }

    async findById({id}){
        const bicycle = await models.Bicycle.findById(id);
        return bicycle;
    }

    async findByIdAndUpdate({id, data}){
        const bicycle = await models.Bicycle.findByIdAndUpdate(id, data, { new: true });
        return bicycle;
    }

    async findByIdAndDelete({id}){
        const bicycle = await models.Bicycle.findByIdAndDelete(id);
        return bicycle;
    }
};

export default BicycleService;