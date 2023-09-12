const personSchema = require("../model/personSchema");
const { badRequest, notFoundError } = require("../errors/index");

const getPerson = async (req, res) => {
  const { user_id } = req.params;
  try {
    // const regexx = new RegExp(`^${name.trim()}$`, "i");
    const user = await personSchema.findOne({ _id: user_id }, { __v: 0 });
    if (!user) {
      throw new notFoundError(
        `couldn't find user with provided user_id ${user_id}`
      );
    }
    return res.status(200).json(user);
  } catch (error) {
    throw error;
  }
};
const addPerson = async (req, res) => {
  const personObj = req.body;
  const { name } = req.body;
  if (!name || name.toString().trim() === "") {
    throw new badRequest(
      `request body must include "name" field and it's value`
    );
  }
  if (typeof name !== "string") {
    throw new badRequest(`only string values are allowed on "name" field`);
  }
  try {
    const regexx = new RegExp(`^${name.trim()}$`, "i");
    const checkExisting = await personSchema.findOne({ name: regexx });
    if (checkExisting) {
      throw new badRequest(
        `user with name pattern /${name}/ already exist, please provide a unique "name" property`
      );
    }
    const newUser = await personSchema.create(personObj);
    if (!newUser) {
      return res
        .status(500)
        .json({ message: "couldn't create user try again" });
    }
    return res.status(200).json(newUser);
  } catch (error) {
    throw error;
  }
};
const updatePerson = async (req, res) => {
  const { user_id } = req.params;
  const { newName } = req.body;
  if (!newName || newName.toString().trim() === "") {
    throw new badRequest(
      `request body must include "newName" field and it's value`
    );
  }
  if (typeof newName !== "string") {
    throw new badRequest(`only string values are allowed for provided fields`);
  }
  try {
    const updatedUser = await personSchema.findOneAndUpdate(
      { _id: user_id },
      { name: newName },
      { new: true }
    );
    if (!updatedUser) {
      throw new notFoundError(
        "couldn't update user details, might be non-existent"
      );
    }
    return res
      .status(200)
      .json({ message: "name changed successfully", data: updatedUser });
  } catch (error) {
    throw error;
  }
};
const deletePerson = async (req, res) => {
  const { user_id } = req.params;
  if (typeof user_id !== "string") {
    throw new badRequest(`only string values are allowed for user_id field`);
  }
  try {
    // const regexx = new RegExp(`^${name.trim()}$`, "i");
    const deletedUser = await personSchema.findOneAndDelete({ _id: user_id });
    if (!deletedUser) {
      return res
        .status(500)
        .json({ message: "couldn't delete user, could be non-existent" });
    }
    return res
      .status(200)
      .json({ message: "user successfully deleted", data: deletedUser });
  } catch (error) {
    throw error;
  }
};

module.exports = { addPerson, getPerson, updatePerson, deletePerson };
