import models from "../db/models/index.js";
class ReserveService {
    static _reserveServiceInstance = null;

    constructor() { };

    static getInstance() {
        if (!ReserveService._reserveServiceInstance) {
            ReserveService._reserveServiceInstance = new ReserveService();
        };
        return ReserveService._reserveServiceInstance;
    };

    async find(option = {}) {
        const reserves = await models.Reserve.find(option);
        return reserves;
    }

    async findPopulate({ option = {}, pupulate }) {
        const reserves = await models.Reserve.find(option).populate(pupulate)
        return reserves;
    }

    async create({ data }) {
        const reserve = await models.Reserve.create(data);
        return reserve;
    }

    async findById({ id }) {
        const reserve = await models.Reserve.findById(id).populate('user bicycle');
        return reserve;
    }

    async findByIdAndUpdate({ id, data }) {
        const reserve = await models.Reserve.findByIdAndUpdate(id, data, { new: true });
        return reserve;
    }

    async findByIdAndDelete({ id }) {
        const reserve = await models.Reserve.findByIdAndDelete(id);
        return reserve;
    }
};

export default ReserveService;