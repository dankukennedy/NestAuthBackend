export interface Config {
    database: {
        connectionString: string;
    };
    jwt: {
        secret: string;
    };
}

const configFactory = () => ({
    database: {
        connectionString: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/AuthExampleDB'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret_key'
    }
} satisfies Config);

export default configFactory;