import mongoose from 'mongoose';
import config from '../config/index.js';

const connectionDB = async () => {
    try {
        mongoose.connect(config.mongoUri);
        console.log("Connect DB Success");
    } catch (error) {
        console.log("Error DB Connect", error);
    };
};

export default connectionDB