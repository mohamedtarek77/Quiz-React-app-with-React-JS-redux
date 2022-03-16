import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "../redux/actions";

const SelectField = ({ label, options }) => {
  const dispatch = useDispatch();
  const [Value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(e.target.value));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(e.target.value));
        break;
      case "Type":
        dispatch(handleTypeChange(e.target.value));
        break;
      default:
        return;
    }
  };
  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={Value}
          variant="outlined"
          label={label}
          fullWidth
          onChange={handleChange}
        >
          {options.map((option) => {
            return (
              <MenuItem value={option.id} key={option.id}>
                {option.name}
              </MenuItem>
            );
          })}{" "}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectField;
