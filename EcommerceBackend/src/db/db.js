import mongoose from "mongoose";

mongoose.set('strictQuery', false);
const connectToMongodb = async () => {
    try {
        const mongondbInstanceConnection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connection successfully! DB HOST! : ${mongondbInstanceConnection.connection.host}`);
    } catch (error) {
        console.log("Mongodb Error...", error);
    }
};

export { connectToMongodb };