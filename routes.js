const express = require("express");
const router = express.Router();
const kanbanController = require("./controllers/kanbanController");

// Routes for Kanban boards
router.post("/boards", kanbanController.createBoard);
router.get("/boards", kanbanController.getBoards);
router.get("/boards/:boardId", kanbanController.getBoardById);
router.put("/boards/:boardId", kanbanController.updateBoard);
router.delete("/boards/:boardId", kanbanController.deleteBoard);

// Routes for Kanban board items
router.post("/boards/:boardId/columns/:columnId/items", kanbanController.createItem);
router.get("/boards/:boardId/columns/:columnId/items/:itemId", kanbanController.getItemById);
router.put("/boards/:boardId/columns/:columnId/items/:itemId", kanbanController.updateItem);
router.delete("/boards/:boardId/columns/:columnId/items/:itemId", kanbanController.deleteItem);

module.exports = router;
