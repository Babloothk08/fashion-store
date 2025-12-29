import { Address } from "../models/model.Address.js"

const addAddress = async(req, res) => {
    try {
        const userId = req.user._id
        const {name, phone, city, state, pincode, address} = req.body
        console.log("response", req.body);
        
        if(!name || !phone || !city || !state || !pincode || !address){
           return res.status(401).json({ message : "please fill all the details"})
        }
        const newAddress = await Address.create({
            userId,
            name,
            address,
            phone,
            pincode ,
            city,
            state
         })
    
         const userAddress = await Address.findById(newAddress._id).select("-__v")
         if(!userAddress){
            res.status(404).json({
                message : "user address not found"
            })
         }
    
         return res.status(201).json({message : "user address created successfully"})
        //  console.log("userAddress", userAddress);
         
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "something went wrong"})
    }

}

const getAddress = async(req, res) => {
    try {
        const userId = req.user._id
    
        if(!userId){
            return res.status(401).json({message : "User id not found"})
        }
    
        const addresses = await Address.find({userId}).select("-__v");
        console.log(addAddress)
    
        if(!addresses){
            return res.status(404).json({message : "No address found"})
        }

        console.log(addAddress)
        
         res.status(200).json({
            message : "address fetched successfully",
            data : addresses
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message : "server error"})
    }

}



const deleteAddress = async(req, res) => {
    try {
        const userId = req.user._id
        if(!userId){
            return res.status(401).json({message : "User not Logged In"})
        }
        const {addressId} = req.params;
    
        const deletedAddress = await Address.findOneAndDelete({
            _id : addressId,
            userId : userId,
        })
    
        if(!deletedAddress){
            res.status(404).json({message : "Address not found"})
        }
        
        if(deletedAddress){
            res.status(200).json({
                message : "Address deleted successfully",
            })
        }
    } catch (error) {
        console.log("server error")
        return res.status(500).json({message : "server error"})
    }
}

export {addAddress, getAddress, deleteAddress}