import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import StatusTimeline from "./StatusTimeline";

const columns = [
  { name: "Sr No" },
  { name: "Task", alignment: "left" },
  { name: "Status", alignment: "center" },
  { name: "Time complexity", alignment: "right" },
];
const reactData = [
  {
    id: "1",
    task: "Components, JSX, State, Props",
    status: "Completed",
    timeComplexity: "on Time",
  },
  {
    id: "2",
    task: "Hooks (useState, useEffect, useMemo, useCallback), Context API",
    status: "Completed",
    timeComplexity: "on Time",
  },
  {
    id: "3",
    task: "Advanced: Custom Hooks, Optimization",
    status: "Completed",
    timeComplexity: "on Time",
  },
  {
    id: "4",
    task: "React Router, Error Boundaries, Suspense",
    status: "Completed",
    timeComplexity: "on Time",
  },
  {
    id: "5",
    task: "High order components,test cases",
    status: "Completed",
    timeComplexity: "on Time",
  },
];
const nodeData = [
  {
    id: "1",
    task: "Introduction to Node.js, npm, REST APIs",
    status: "Completed",
    timeComplexity: "on Time",
  },
  {
    id: "2",
    task: "Understanding middlewares, basic routing",
    status: "Completed",
    timeComplexity: "on Time",
  },
  {
    id: "3",
    task: "Authentication & Authorization (JWT, OAuth)",
    status: "Completed",
    timeComplexity: "on Time",
  },
  {
    id: "4",
    task: "Database integration (MongoDB or SQL)",
    status: "Completed",
    timeComplexity: "on Time",
  },
  {
    id: "5",
    task: "Error handling, Logging, Debugging",
    status: "Completed",
    timeComplexity: "on Time",
  },
];

const TimeSheet = () => {
  const [searchTask, setSearchTask] = useState("");
  const [course, setCourse] = useState("react");

  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

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
  }, [course, searchTask]);

  return (
    <div className="flex flex-col items-center justify-center h-full pt-40 px-32 gap-4">
      <div className="flex w-full items-center gap-20">
        <TextField
          label="Search Task"
          placeholder="Enter task name to search"
          sx={{
            width: "20%",
          }}
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
        />
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
            {filteredData.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& .MuiTableCell-root": {
                    fontSize: "16px",
                  },
                }}
              >
                <TableCell component="th" scope="row" className="">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.task}</TableCell>
                <TableCell align="right" sx={{ width: "auto" }}>
                  <StatusTimeline status={row.status} />
                </TableCell>
                <TableCell align="right">{row.timeComplexity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TimeSheet;
