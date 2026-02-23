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

const updateReferralStatus =async(req,res)=>{
    try{
            const {status}=req.params;
            const { responseMessage }=req.body;
            if(!["approved","rejected"].includes( status )){
                return res.status(400).json({ message:"invalid status "});
            }
            const referral= await Referral.findById(req.params.id);
            if(!referral){
                return res.status(404).json({ message:"referral not found"});
            }
            referral.status=status;
            referral.responseMessage=responseMessage;
            await referral.save();
            res.json(referral);

    }catch(err){
        res.status(500).json({
            message:err.message
        });

    }
}
export {requestReferral,updateReferralStatus};