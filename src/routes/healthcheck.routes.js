import { Router } from "express";
import { healtCheck } from "../controllers/healthCheck.Controlleer.js";
const router=Router()
router.route("/").get(healtCheck)
export default router