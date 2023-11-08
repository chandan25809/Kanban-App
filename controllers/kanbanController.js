const KanbanBoard = require("../models/KanbanBoard");

// Create a new Kanban board
const createBoard = async (req, res) => {
  try {
    const { name, description, columns } = req.body;
    const newBoard = new KanbanBoard({
      name,
      description,
      columns,
    });
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ error: "Unable to create Kanban board" });
  }
};

// Get all Kanban boards
const getBoards = async (req, res) => {
  try {
    const boards = await KanbanBoard.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Kanban boards" });
  }
};

// Get a specific Kanban board by ID
const getBoardById = async (req, res) => {
  try {
    const board = await KanbanBoard.findById(req.params.boardId);
    if (!board) {
      res.status(404).json({ error: "Kanban board not found" });
    } else {
      res.status(200).json(board);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch Kanban board" });
  }
};

// Update a Kanban board by ID
const updateBoard = async (req, res) => {
  try {
    const { name, description, columns } = req.body;
    const updatedBoard = await KanbanBoard.findByIdAndUpdate(
      req.params.boardId,
      { name, description, columns },
      { new: true }
    );
    if (!updatedBoard) {
      res.status(404).json({ error: "Kanban board not found" });
    } else {
      res.status(200).json(updatedBoard);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update Kanban board" });
  }
};

// Delete a Kanban board by ID
const deleteBoard = async (req, res) => {
  try {
    const deletedBoard = await KanbanBoard.findByIdAndRemove(req.params.boardId);
    if (!deletedBoard) {
      res.status(404).json({ error: "Kanban board not found" });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete Kanban board" });
  }
};


// Create a new Kanban item within a column
const createItem = async (req, res) => {
    try {
      const { name, description, dueDate } = req.body;
      const board = await KanbanBoard.findById(req.params.boardId);
  
      if (!board) {
        return res.status(404).json({ error: "Kanban board not found" });
      }
  
      const column = board.columns.id(req.params.columnId);
  
      if (!column) {
        return res.status(404).json({ error: "Kanban column not found" });
      }
  
      column.items.push({ name, description, dueDate });
      await board.save();
      res.status(201).json(column.items[column.items.length - 1]);
    } catch (error) {
      res.status(500).json({ error: "Unable to create Kanban item" });
    }
  };
  
  // Get a specific Kanban item within a column by ID
  const getItemById = async (req, res) => {
    try {
      const board = await KanbanBoard.findById(req.params.boardId);
  
      if (!board) {
        return res.status(404).json({ error: "Kanban board not found" });
      }
  
      const column = board.columns.id(req.params.columnId);
  
      if (!column) {
        return res.status(404).json({ error: "Kanban column not found" });
      }
  
      const item = column.items.id(req.params.itemId);
  
      if (!item) {
        return res.status(404).json({ error: "Kanban item not found" });
      }
  
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch Kanban item" });
    }
  };
  
  // Update a Kanban item within a column by ID
  const updateItem = async (req, res) => {
    try {
      const { name, description, dueDate } = req.body;
      const board = await KanbanBoard.findById(req.params.boardId);
  
      if (!board) {
        return res.status(404).json({ error: "Kanban board not found" });
      }
  
      const column = board.columns.id(req.params.columnId);
  
      if (!column) {
        return res.status(404).json({ error: "Kanban column not found" });
      }
  
      const item = column.items.id(req.params.itemId);
  
      if (!item) {
        return res.status(404).json({ error: "Kanban item not found" });
      }
  
      item.name = name;
      item.description = description;
      item.dueDate = dueDate;
  
      await board.save();
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: "Unable to update Kanban item" });
    }
  };
  
  // Delete a Kanban item within a column by ID
  const deleteItem = async (req, res) => {
    try {
      const board = await KanbanBoard.findById(req.params.boardId);
  
      if (!board) {
        return res.status(404).json({ error: "Kanban board not found" });
      }
  
      const column = board.columns.id(req.params.columnId);
  
      if (!column) {
        return res.status(404).json({ error: "Kanban column not found" });
      }
  
      const item = column.items.id(req.params.itemId);
  
      if (!item) {
        return res.status(404).json({ error: "Kanban item not found" });
      }
  
      item.remove();
      await board.save();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Unable to delete Kanban item" });
    }
  };
  
  module.exports = {
    createBoard,
    getBoards,
    getBoardById,
    updateBoard,
    deleteBoard,
    createItem,
    getItemById,
    updateItem,
    deleteItem,
  };

