class ReserveService {
    static _reserveServiceInstance = null;

    constructor() { };

    static getInstance() {
        if (!ReserveService._reserveServiceInstance) {
            ReserveService._reserveServiceInstance = new ReserveService();
        };
        return ReserveService._reserveServiceInstance;
    };
};

export default ReserveService;