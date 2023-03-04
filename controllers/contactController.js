const Contact = require("../models/contactModel");
const catchAsync = require("../utils/catchAsync");

exports.createContact = catchAsync(async (req, res, next) => {
  const { name, phone, email, type } = req.body;
  const contact = await Contact.create({
    name,
    phone,
    email,
    type,
    user: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: contact,
  });
});

exports.getContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find({ user: req.user._id });
  res.status(200).json({
    status: "success",
    data: contacts,
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  res.status(200).json({
    status: "success",
    data: contact,
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const contact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(203).json({
    status: "success",
    data: contact,
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await Contact.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
