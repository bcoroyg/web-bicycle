if(process.env.NODE_ENV !== 'production'){
    (await import('dotenv')).config();
};

const config = {
    port: process.env.PORT
};

export default config;