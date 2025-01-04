import { MongoClient, ServerApiVersion } from 'mongodb';

const mongoClient = (uri: string) => {
    if (!uri) {
        throw new Error("MongoDB URI must be provided");
    }

    return new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
};

export default mongoClient;
