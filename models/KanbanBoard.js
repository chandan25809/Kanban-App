const mongoose = require("mongoose");

const kanbanBoardSchema = new mongoose.Schema({
  name: String,
  description: String,
  columns: [
    {
      name: String,
      items: [
        {
          name: String,
          description: String,
          dueDate: Date,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("KanbanBoard", kanbanBoardSchema);
