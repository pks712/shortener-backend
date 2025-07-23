import mongoose  from "mongoose";



const connectDB =async(req,res)=>{

try {
    const MONGO_URL = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected")
    
} catch (error) {
    console.log('ERROR: mongodb not connected' + error)
}

}
export default connectDB