import {
  Card,
  Container,
  List,
  Stack,
  ListItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { HOST } from "../constants";
export default function RewardsPage() {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(HOST + "/api/rewards", {
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
        setRewards(r);
        let t = 0
        r.map(c=>t+=c.point)
        console.log(t)
        setPoints(t)
      });
  }, []);
  return (
    <>
      <Navbar title="Rewards" />
      <Container maxWidth="xs" component={"main"}>
        <Stack gap={1}>
          <Card sx={{ mt: 2, textAlign:"center" }}>
            <h3>Total Rewards: {points}</h3>
          </Card>
        </Stack>
        <List>
          {rewards.map((t) => (
            <Card sx={{ minWidth: "100%", my:1 }} key={t.id}>
              <ListItem key={t.id}>
                <ListItemText primary={"Point: "+t.point} secondary={"Date: "+new Date(Date.parse(t.date)).toLocaleString()} />
              </ListItem>
            </Card>
          ))}
        </List>
      </Container>
    </>
  );
}
