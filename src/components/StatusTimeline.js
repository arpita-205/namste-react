import Box from "@mui/material/Box";
import { Slider } from "@mui/material";

const steps = [
  "Select master blaster campaign settings",
  "Create an ad group",
  "Create an ad",
];

const StatusTimeline = ({ marks }) => {
  return (
    <Box
      sx={{ width: 300 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Slider
        aria-label="Restricted values"
        defaultValue={20}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
};

export default StatusTimeline;
