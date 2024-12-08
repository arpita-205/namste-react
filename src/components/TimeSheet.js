import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Button,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import StatusTimeline from "./StatusTimeline";
import { useNavigate } from "react-router-dom";
import useTimesheetStore from "../store/useTimesheetStore";
import AddNewTask from "./AddNewTask";

export const columns = [
  { name: "Sr No" },
  { name: "Task", alignment: "left" },
  { name: "Status", alignment: "center" },
  { name: "Time complexity", alignment: "right" },
  { name: "Actions", alignment: "right" },
];

const TimeSheet = () => {
  const [isAddNewTask, setIsAddNewTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const { setReactData, reactData, nodeData, setNodeData } =
    useTimesheetStore();
  const navigate = useNavigate();
  const [searchTask, setSearchTask] = useState("");
  const [course, setCourse] = useState("react");
  // const [reactData, setReactData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const marks = [
    {
      value: 0,
      label: "Not Started",
    },
    {
      value: 50,
      label: "In Progress",
    },
    {
      value: 100,
      label: "Completed",
    },
  ];

  const handleChange = (event) => {
    setCourse(event.target.value);
  };
  const handleAddTask = async () => {
    const res = await fetch(
      course === "react"
        ? "http://localhost:5000/api/react-data"
        : "http://localhost:5000/api/node-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskName,
          status: "Not Started",
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to add task");
    }

    const data = await res.json();
    setIsAddNewTask(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTask || searchTask === "") {
      if (course === "react") {
        setFilteredData(reactData);
      } else if (course === "node") {
        setFilteredData(nodeData);
      } else if (course === "cloud") {
        setFilteredData([]);
      } else if (course === "") {
        setFilteredData([]);
      }
    } else if (searchTask) {
      const filterDataList = (listData) => {
        const filterArr = listData.filter((item) =>
          item.task.toLowerCase().includes(searchTask.toLowerCase())
        );
        return filterArr;
      };
      if (course === "react") {
        setFilteredData(filterDataList(reactData));
      } else if (course === "node") {
        setFilteredData(filterDataList(nodeData));
      } else if (course === "cloud") {
        setFilteredData(filterDataList([]));
      } else if (course === "") {
        setFilteredData([]);
      }
    }
  }, [course, searchTask, reactData, nodeData]);

  const fetchData = async () => {
    const reactResponse = await fetch("http://localhost:5000/api/react-data");
    const dataOfReactCourse = await reactResponse.json();
    const nodeResponse = await fetch("http://localhost:5000/api/node-data");
    const dataOfNodeCourse = await nodeResponse.json();

    setReactData(dataOfReactCourse);
    setNodeData(dataOfNodeCourse);
  };
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(
        course === "react"
          ? `http://localhost:5000/api/react-data/${id}`
          : `http://localhost:5000/api/node-data/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      const deletedTask = await res.json();
      console.log("Task deleted:", deletedTask);

      fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete the task. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full pt-10 px-10 gap-4">
        <div className="flex w-full items-center gap-4">
          <TextField
            label="Search Task"
            placeholder="Enter task name to search"
            sx={{
              width: "20%",
            }}
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={course}
                  label="Course"
                  onChange={handleChange}
                >
                  <MenuItem value={"react"}>React</MenuItem>
                  <MenuItem value={"node"}>Node</MenuItem>
                  <MenuItem value={"cloud"}>Cloud</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button onClick={() => setIsAddNewTask(true)}>Add New Task</Button>
          </div>
        </div>
        <TableContainer sx={{ overflow: "auto" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  "& .MuiTableCell-head": {
                    fontSize: "18px",
                    fontWeight: "semibold",
                  },
                }}
              >
                {columns?.map((header) => (
                  <TableCell align={header.alignment}>{header.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData?.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    navigate(`/time-sheet/${course}/${row.task}/${row.id}`);
                  }}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "& .MuiTableCell-root": {
                      fontSize: "16px",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell component="th" scope="row" className="">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.task}</TableCell>
                  <TableCell align="right" sx={{ width: "auto" }}>
                    <StatusTimeline marks={marks} />
                  </TableCell>
                  <TableCell align="right">{row.timeComplexity}</TableCell>
                  <TableCell align="right">
                    <Icon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(row?.id);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon sx={{ fontSize: "16px" }} />
                    </Icon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <AddNewTask
        open={isAddNewTask}
        onClose={() => {
          setIsAddNewTask(false);
          setTaskName("");
        }}
        taskName={taskName}
        onTaskName={(e) => setTaskName(e.target.value)}
        onAddTask={handleAddTask}
      />
    </>
  );
};

export default TimeSheet;
