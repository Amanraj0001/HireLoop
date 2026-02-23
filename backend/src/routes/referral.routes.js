import { Router } from "express";
import verifyToken from "../middlewares/auth.middlewares.js";
import { requestReferral } from "../controllers/referral.controllers.js";
import { updateReferralStatus } from "../controllers/referral.controllers.js";
import authMiddleware from "../middlewares/auth.middlewares.js"

const router=Router();

router.post("/request",verifyToken,requestReferral);
router.put("/:id/:status", authMiddleware, updateReferralStatus);

export default router;