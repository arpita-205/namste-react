import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

const AddNewTask = ({
  open,
  onClose = () => {},
  onAddTask = () => {},
  onTaskName = () => {},
  taskName = "",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          height: "260px",
          width: "500px",
        },
      }}
    >
      <DialogTitle>Add New task</DialogTitle>
      <DialogContent className="flex flex-col gap-3 mt-5 p-3 justify-between">
        <Box className="pt-4 w-full">
          <TextField
            type="text"
            placeholder="Task name"
            onChange={onTaskName}
            value={taskName}
            fullWidth
          />
        </Box>

        <DialogActions className="items-end">
          <Button onClick={onAddTask}>Add</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTask;
