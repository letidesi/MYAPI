const controller = require("../controllers/toDoController");

const express = require("express");
const router = express.Router();

router.post("/novo", controller.createTask);
router.get("/all", controller.getAll);
router.delete("/del/:id", controller.deletarTask);
router.put("/update/:id", controller.updateAll);
router.patch("/update/:id", controller.updateTudo);

module.exports = router;
