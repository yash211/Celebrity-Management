import React from "react";
import {
    Typography,
    IconButton,
    Grid,
    Card,
    CardContent,
    Box,
  } from "@mui/material";
  
  import {
    Edit as EditIcon,
    Delete as DeleteIcon,
  } from "@mui/icons-material";
  


  const CelebCard = ({ user,handleEdit,handleDelete }) => {
  return (
    <>
      <Card key={user.id} style={{ marginBottom: "3rem" }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                fontWeight="bold"
                textAlign="left"
              >
                Age
              </Typography>
              <Typography color="textSecondary" textAlign="left">
                {user.age + " Years"}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                fontWeight="bold"
                textAlign="left"
              >
                Gender
              </Typography>
              <Typography color="textSecondary" textAlign="left">
                {user.gender}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                fontWeight="bold"
                textAlign="left"
              >
                Country
              </Typography>
              <Typography color="textSecondary" textAlign="left">
                {user.country}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                fontWeight="bold"
                textAlign="left"
              >
                Description
              </Typography>
              <Box
                border={1}
                borderColor="rgba(0, 0, 0, 0.2)"
                borderRadius={4}
                padding={1}
                minWidth={200}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="left"
                >
                  {user.description}
                </Typography>
              </Box>
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
                  onClick={() => handleEdit(user)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => handleDelete(user)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CelebCard;
