import React from "react";
import {
    
    IconButton,
    Grid,
    TextareaAutosize,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
  } from "@mui/material";
  
  import SaveIcon from "@mui/icons-material/Save";
  import CancelIcon from "@mui/icons-material/Cancel";
  import "react-toastify/dist/ReactToastify.css";

const CelebForm = ({editedUser,isSaveDisabled,handleCancel,handleSave,handleChange}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4}>
          <TextField
            name="age"
            label="Age"
            value={editedUser.age || ""}
            onChange={handleChange}
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            fullWidth
            style={{ color: "black" }}
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel
              id="demo-simple-select-standard-label"
              style={{ color: "black" }}
            >
              Gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              name="gender"
              value={editedUser.gender || ""}
              onChange={handleChange}
              style={{ color: "black" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="Transgender">Transgender</MenuItem>
              <MenuItem value="Rather not say">Rather not say</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
            name="country"
            label="Country"
            value={editedUser.country || ""}
            onChange={handleChange}
            style={{ color: "black" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Description</InputLabel>
          <TextareaAutosize
            name="description"
            label="Description"
            value={editedUser.description || ""}
            onChange={handleChange}
            placeholder="Description"
            minRows={2} // Decreased number of minRows
            style={{ width: "100%" }} // Align width with card width
          />
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "0.5rem",
            }}
          >
            <IconButton
              color="primary"
              size="small"
              disabled={isSaveDisabled}
              onClick={handleSave}
            >
              <SaveIcon />
            </IconButton>
            <IconButton color="primary" size="small" onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CelebForm;
