import { Router } from "express";
import verifyToken from "../middlewares/auth.middlewares.js";
import { requestReferral } from "../controllers/referral.controllers.js";

const router=Router();

router.post("/request",verifyToken,requestReferral);

export default router;