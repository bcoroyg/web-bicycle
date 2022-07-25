class BicycleService {
    static _bicycleServiceInstance = null;

    constructor() { };

    static getInstance() {
        if (!BicycleService._bicycleServiceInstance) {
            BicycleService._bicycleServiceInstance = new BicycleService();
        };
        return BicycleService._bicycleServiceInstance;
    };
};

export default BicycleService;