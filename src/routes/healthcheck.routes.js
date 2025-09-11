import { Router } from "express";
import { healtCheck } from "../controllers/healthCheck.Controlleer.js";
const router=Router()
// we are passing the controller to the other api
router.route("/").get(healtCheck)
export default router