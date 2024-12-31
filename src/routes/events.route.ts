import express from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import { verifyRoles } from "../middleware/verifyRole";
import {
  addEvents,
  deleteEvents,
  getEvents,
  updateEvents,
} from "../controller/programAndEvents/programandevent.controller";
import {
  subscribeEvent,
  unSubscribeEvent,
} from "../controller/programAndEvents/event.subscribe.contoller";
import { setEventsVisibility } from "../controller/programAndEvents/event.visibility.controller";

const router = express.Router();
router.get("/getevents", verifyJWT, getEvents);
router.post("/addevent", verifyJWT, verifyRoles("normal-user"), addEvents);
router.put(
  "/updateevent/:id",
  verifyJWT,
  verifyRoles("administrator"),
  updateEvents
);
router.delete(
  "/deleteevent/:id",
  verifyJWT,
  verifyRoles("administrator"),
  deleteEvents
);

//event subscriptions
router.patch("/subscribe", verifyJWT, subscribeEvent);
router.patch("/unsubscribe", verifyJWT, unSubscribeEvent);

//event visibility
router.patch(
  "/:id/visibility",
  verifyJWT,
  verifyRoles("administrator"),
  setEventsVisibility
);
export default router;
