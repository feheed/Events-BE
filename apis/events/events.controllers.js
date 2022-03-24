const req = require("express/lib/request");
const res = require("express/lib/response");
const Category = require("../../db/models/Category");
const Event = require("../../db/models/Event");
const { events } = require("../../db/models/User");
const User = require("../../db/models/User");

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
    await Event.updateOne({
      _id: newEvent._id,
      $inc: { joinedparticipants: 1 },
    });

    return res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

//this function to book the event once you press on bookevent in event page:
exports.bookEvent = async (res, req, next) => {
  try {
    const bookedevent = await User.findByIdAndUpdate(
      { id: owner._id },
      { $push: { booked: bookedevent._id } } // should use user schema to book
    );
    await Event.updateOne({
      _id: newEvent._id,
      $inc: { joinedparticipants: 1 },
    });
    res.json(bookedevent);
  } catch (error) {
    next(error);
  }
};

//fetchMyEvents
exports.fetchMyEvents = async (res, req, next) => {
  try {
    const myevent = await Event.find({ owner: req.body });
    res.json(myevent);
  } catch (error) {
    next(error);
  }
};

//fetchBookedEvents
exports.fetchBookedEvents = async (bookedevent, next) => {
  try {
    const bookedevents = await User.findById({ booked: bookedevent._id });
    return bookedevents;
  } catch (error) {
    next(error);
  }
};
