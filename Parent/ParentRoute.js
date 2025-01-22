const express = require("express");
const { getAllParents, deleteParent, updateParent } = require("./ParentController");

const route = express.Router();

route.get("/parents", getAllParents);
route.delete("/parents/:firebaseUid", deleteParent);
route.put("/parents/:id", updateParent);

module.exports = route;