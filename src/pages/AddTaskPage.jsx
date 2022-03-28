import {
  Container,
  Stack,
  CssBaseline,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { HOST } from "../constants";

export default function AddTaskPage() {
const nav = useNavigate();
  const handleSubmit = (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(HOST + "/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
      body: JSON.stringify({
        title: data.get("title"),
        desc: data.get("desc"),
        // user: 1,
        event_date: data.get("event_date"),
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r)
        alert("Task created succwssfully");
        nav("/dashboard")

      }).catch(e=>alert(e));
  };
  return (
    <>
      <Navbar title="Add Task"/>
      <Container component={"main"} maxWidth="xs">
        <CssBaseline />
        <Stack container mt={2}>
          <Typography component="h1" variant="h5">
            Add Task
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Event Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="desc"
              label="Event Description"
              type="text"
              id="desc"
              autoComplete={false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="event_date"
              label="Event Date"
              type="date"
              id="desc"
              autoComplete={false}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Task
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
