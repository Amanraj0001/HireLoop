import { Referral } from "../models/referral.model";

 
const requestReferral = async(req,res)=>{
    try{
        const {seniorId, companyname,jobRole,message}=req.body;
        const studentId=req.user.id;

        if(studentId==seniorId){
            return res.status(400).json({message:"you're a senior so u can't request a referral"})
        }
        const existingRequest = await Referral.findOne({
            studentId,
            seniorId,
            companyname,
            jobRole,
            status:"pending"
        });
        if(existingRequest){
            return res.status(400).json({message:"already created a request earlier"});
        }
        const referral = new Referral({
            studentId,
            seniorId,
            companyname,
            jobRole,
            message
        });
        await referral.save();
        res.status(201).json({
            success:true,
            message:"referral req created successfully ",
            data:referral
        }); 
    }catch(err){
        console.error("referral error",err);
        res.status(500).json({error:"server error while proccessing referral"});

    }
}
export {requestReferral};