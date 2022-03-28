import {
  CssBaseline,
  Container,
  Card,
  Stack,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import Navbar from "../components/Navbar";
import PuppyFace from "../assets/puppyface.svg";
import { useEffect, useState } from "react";
import { HOST } from "../constants";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardPage() {
  useEffect(() => {
    Notification.requestPermission();
  }, []);
  const [username, setName] = useState("Loading Name");
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(HOST + "/auth/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
    })
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        console.log(r);
        setName(r.nickname);
      });
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(HOST + "/api/tasks?date=" + selectedDate.toISOString(), {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
    })
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        console.log(r);
        setTasks(r);
      });
  }, [selectedDate, refresh]);
  const nav = useNavigate();
  return (
    <>
      <Navbar />
      <Container component={"main"} maxWidth="xs">
        <CssBaseline />
        <Stack mt={1}>
          <Card sx={{ textAlign: "center" }}>
            <h1>Hello, {username}</h1>
            <img src={PuppyFace} alt="puppy" />
          </Card>
          <DateSelect
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <Button
            sx={{ m: 1 }}
            variant="contained"
            onClick={() => nav("/addtask")}
          >
            Add Task
          </Button>

          <Tasks tasks={tasks} setRefresh={setRefresh} />
        </Stack>
      </Container>
    </>
  );
}

function DateSelect({ selectedDate, setSelectedDate }) {
  const sd = (val) => {
    let d = new Date();
    d.setDate(d.getDate() + val);
    return d;
  };
  const strdt = (date) => {
    let s = date.toDateString().split(" ");
    return s[1] + "\n" + s[2];
  };
  // const today = new Date();
  const dates = [sd(-2), sd(-1), sd(0), sd(1), sd(2)];
  console.log("selected date is", selectedDate);
  return (
    <Stack direction="row" gap={2} justifyContent="center" mt={2}>
      {dates.map((d) => (
        <Paper
          key={d.toDateString()}
          onClick={() => setSelectedDate(d)}
          sx={{
            backgroundColor:
              selectedDate.toDateString() === d.toDateString() ? "coral" : null,
            p: 2,
            textAlign: "center",
          }}
        >
          {strdt(d)}
        </Paper>
      ))}
    </Stack>
  );
}

function Tasks({ tasks, setRefresh }) {
  function markdone(taskid) {
    let ans = window.confirm(
      "You are marking task as completed and you will get reward so it can't be undone"
    );
    if (!ans) return;
    const token = localStorage.getItem("token");
    fetch(HOST + "/api/tasks/taskcomplete?taskid=" + taskid, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r === true) {
          alert("Marked as completed and rewards added");
          setRefresh(Date.now());
          Notification.requestPermission().then((v) => {
            if (v === "granted")
              new Notification("You got rewards, check rewards section");
          });
        }
      });
  }
  return (
    <List>
      {tasks.map((t) => (
        <Card sx={{ minWidth: "100%", padding: "2%", margin: "1%" }} key={t.id}>
          <ListItem
            key={t.id}
            secondaryAction={
              <Checkbox
                onChange={() => markdone(t.id)}
                checked={t.is_completed}
                disabled={t.is_completed}
              />
            }
          >
            <ListItemText primary={t.title} secondary={t.desc} />
          </ListItem>
        </Card>
      ))}
    </List>
  );
}
