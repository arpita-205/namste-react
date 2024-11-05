import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Slider, Typography } from "@mui/material";

const steps = [
  "Select master blaster campaign settings",
  "Create an ad group",
  "Create an ad",
];

const StatusTimeline = ({ status }) => {
  const isStepFailed = (step) => {
    return step === 1;
  };

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

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Restricted values"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
};

export default StatusTimeline;
