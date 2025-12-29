import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`mongoDb connected`);
    } catch (error) {
        console.error("MongoDb connection Failed", error);
        process.exit(1);
    };
    
};
export default connectDB