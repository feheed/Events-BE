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
    req.body.joinedparticipants = 1;
    const newEvent = await Event.create(req.body);
    await Category.findByIdAndUpdate(
      { _id: req.body.category },
      { $push: { events: newEvent._id } }
    );
    // await newEvent.populate({
    //   path: "owner",
    //   select: "email",
    // });

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
    const myevent = await Event.find({ owner: myevent._id });
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
