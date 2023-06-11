import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
  Grid,
  TextField,
  Container,
} from "@mui/material";

import {
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import celebrities from "../data/celebrities.json";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { countryRegex } from "../utils/regex";
import CelebCard from "./celeb_card";
import CelebForm from "./celeb_form";
const AvatarImage = styled(Avatar)({
  width: "56px",
  height: "56px",
});

const UserList = () => {
  const [expandedUser, setExpandedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * The function calculates a person's age based on their date of birth.
   * @param dob - The parameter `dob` stands for "date of birth" and is expected to be a string
   * representing a date in the format "YYYY-MM-DD".
   * @returns The function `calculateAge` returns the age of a person based on their date of birth
   * (dob) passed as an argument.
   */
  const calculateAge = (dob) => {
    var currentDate = new Date();
    var dobDate = new Date(dob);

    var age = currentDate.getFullYear() - dobDate.getFullYear();
    var monthDiff = currentDate.getMonth() - dobDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const [users, setUsers] = useState(() => {
    // Calculate age for each user and add it as a property
    const updatedCelebrities = celebrities.map((user) => ({
      ...user,
      name: user.first + " " + user.last,
      age: calculateAge(user.dob),
    }));

    return updatedCelebrities;
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.first} ${user.last}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  /**
   * The function handles expanding and collapsing a user's information, but only if not in edit mode.
   * @param user - The user parameter is a variable that represents a user object. It is used to
   * determine which user should be expanded or collapsed in the UI.
   * @returns If `editMode` is true, the function returns without doing anything. Otherwise, if the
   * `user` parameter is the same as the `expandedUser` state, it sets the `expandedUser` state to null.
   * Otherwise, it sets the `expandedUser` state to the `user` parameter. Finally, it sets the
   * `editMode` state to false and the `editedUser`
   */
  const handleExpand = (user) => {
    if (editMode) {
      return; // Do not expand if in edit mode
    }

    if (user === expandedUser) {
      setExpandedUser(null);
    } else {
      setExpandedUser(user);
    }

    setEditMode(false);
    setEditedUser(null);
  };

  /**
   * The function handles the deletion of a user from a list of users after confirming with the user.
   * @param user - The `user` parameter is an object representing a user that is being passed to the
   * `handleDelete` function. It is used to identify which user should be deleted from the `users`
   * array.
   */
  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      setUsers(users.filter((u) => u !== user));
    }
  };

  /**
   * The function handles editing a user's information if they are 18 years or older.
   * @param user - The `user` parameter is an object that represents a user.
   */
  const handleEdit = (user) => {
    const age = calculateAge(user.dob);
    if (age >= 18) {
      setEditMode(true);
      setEditedUser({
        ...user,
        age: String(age),
      });
    }
  };

  /**
   * The function updates the user details if they pass validation and disables the save button.
   */
  const handleSave = () => {
    if (validateUserDetails(editedUser)) {
      setUsers(
        users.map((user) => (user === expandedUser ? editedUser : user))
      );
      setEditMode(false);
      setEditedUser(null);
      setIsSaveDisabled(true);
      toast.success("Saved Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedUser(null);
    setIsSaveDisabled(true);
  };

  /**
   * The below code defines a function to handle changes in user input and validate user details.
   * @param event - an event object that contains information about the event that triggered the
   * function, such as the target element and the type of event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "gender") {
      setEditedUser((prevUser) => ({ ...prevUser, gender: value }));
    } else {
      setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
    setIsSaveDisabled(false);
  };

  const validateUserDetails = (user) => {
    console.log(user);
    if (
      user.name === "" ||
      user.country === "" ||
      user.age === "" ||
      user.description === ""
    ) {
      toast.error("One or more field are empty", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    if (isNaN(user.age) || user.age < 0) {
      toast.error("Age cannot be negative", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    if (!countryRegex.test(user.country)) {
      toast.error("Numbers are not accepted in country", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    return true;
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        maxWidth: "600px",
      }}
    >
      <h2>Celebs</h2>
      <TextField
        label="Search Celebrities"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem", width: "80%" }}
      />
      {filteredUsers.map((user) => (
        <Accordion
          key={user.id}
          expanded={user === expandedUser}
          onChange={() => handleExpand(user)}
          alignItems="center"
        >
          <AccordionSummary
            expandIcon={user === expandedUser ? <RemoveIcon /> : <AddIcon />}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <AvatarImage alt={user.first} src={user.picture} />
              </Grid>
              <Grid item>
                {editMode && editedUser?.id === user.id ? (
                  <TextField
                    name="name"
                    label="Name"
                    value={editedUser.name || ""}
                    onChange={handleChange}
                    InputProps={{
                      style: { height: "30px" },
                    }}
                    style={{ color: "black" }}
                    fullWidth
                  />
                ) : (
                  <Typography>{user.name}</Typography>
                )}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            {editMode && editedUser?.id === user.id ? (
              <CelebForm editedUser={editedUser} handleChange={handleChange} handleSave={handleSave} isSaveDisabled={isSaveDisabled} handleCancel={handleCancel}/>
            ) : (
              <CelebCard user={user} handleEdit={handleEdit} handleDelete={handleDelete}/>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default UserList;
