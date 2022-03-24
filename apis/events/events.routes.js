const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  eventListFetch,
  eventCreate,
  fetchEvent,
  bookEvent,
  fetchMyEvents,
  fetchBookedEvents,
} = require("./events.controllers");
const router = express.Router();

router.param("eventId", async (req, res, next, eventId) => {
  const foundEvent = await fetchEvent(eventId, next);
  if (foundEvent) {
    req.event = foundEvent;
    next();
  } else next({ status: 404 });
});

router.get("/", eventListFetch);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  eventCreate
);

router.post(
  "/bookevent",
  passport.authenticate("jwt", { session: false }),
  bookEvent
);

router.get("/myevent", fetchMyEvents);

router.get("/bookedevents", fetchBookedEvents);

module.exports = router;
