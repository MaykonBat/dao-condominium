import { MongoClient, Db } from 'mongodb';

let singleton: Db; //só uma conexão e todo mundo usa só essa cópia.

export default async (): Promise<Db> => {

    if (singleton) return singleton;

    const client = new MongoClient(`${process.env.MONGO_HOST}`);
    await client.connect();
    singleton = client.db(process.env.MONGO_DATABASE);

    return singleton;
}