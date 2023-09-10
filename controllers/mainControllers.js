const personSchema = require("../model/personSchema");

const getPerson = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    const user = await personSchema.find({});
    return res.status(200).json({ allUsers: user });
  }
  try {
    const regexx = new RegExp(`^${name.trim()}$`, "i");
    const user = await personSchema.findOne({ name: regexx });
    if (!user) {
      return res.status(500).json({ message: "couldn't find user" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const addPerson = async (req, res) => {
  const personObj = req.body;
  const { name } = req.body;
  try {
    const regexx = new RegExp(`^${name.trim()}$`, "i");
    const checkExisting = await personSchema.findOne({ name: regexx });
    if (checkExisting) {
      return res
        .status(400)
        .json({ message: "user already exist, please use another name" });
    }
    const newUser = await personSchema.create(personObj);
    if (!newUser) {
      return res.status(500).json({ message: "couldn't create user" });
    }
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const updatePerson = async (req, res) => {
  const { oldName, newName } = req.body;
  if (!oldName || !newName) {
    return res.status(404).json({ message: "provide name field" });
  }
  try {
    const regexx = new RegExp(`^${oldName.trim()}$`, "i");
    const updatedUser = await personSchema.findOneAndUpdate(
      { name: regexx },
      { name: newName },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(500).json({ message: "couldn't create user" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deletePerson = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(404).json({ message: "provide name field" });
  }
  try {
    const regexx = new RegExp(`^${name.trim()}$`, "i");
    const deletedUser = await personSchema.findOneAndDelete({ name: regexx });
    if (!deletedUser) {
      return res
        .status(500)
        .json({ message: "couldn't delete user, could be non-existent" });
    }
    return res.status(200).json({ message: "User Deleted", data: deletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { addPerson, getPerson, updatePerson, deletePerson };
