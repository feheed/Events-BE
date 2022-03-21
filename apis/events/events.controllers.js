const Event = require("../../db/models/Event");

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
    await newEvent.populate({
      path: "owner",
      select: "username",
    });
    return res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};
