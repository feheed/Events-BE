const req = require("express/lib/request");
const Category = require("../../db/models/Category");
const Event = require("../../db/models/Event");

exports.fetchEvent = async (eventId, next) => {
  try {
    const event = await Event.findById(eventId);
    return event;
  } catch (error) {
    next(error);
  }
};

exports.eventListFetch = async (req, res, next) => {
  try {
    const events = await Event.find();
    return res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.eventCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    req.body.owner = req.user._id;
    const newEvent = await Event.create(req.body);
    await Category.findByIdAndUpdate(
      { id: req.body.category._id },
      { $push: { events: newEvent._id } }
    );
    await newEvent.populate({
      path: "owner",
      select: "username",
    });
    return res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

//this function to book the event once you press on bookevent in event page:
exports.bookEvent = async () => {
  try {
    const bookedevent = await Event.findOne({ id: req.body._id });
  } catch (error) {
    next(error);
  }
};
