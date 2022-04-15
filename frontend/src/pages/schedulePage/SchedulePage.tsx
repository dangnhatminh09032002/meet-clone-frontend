import * as React from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Header } from "../../components/HomeHeader/HomeHeader";
import "./schedulepage.css";
import { log } from "console";
import moment from "moment";

export function SchedulePage() {
  const [repeatime, setRepeatTime] = React.useState("");
  const [startDay, setStartDay] = React.useState(
    moment(new Date()).format("L").replaceAll("/", "-").toString()
  );
  const handleChange = (event: SelectChangeEvent) => {
    setRepeatTime(event.target.value);
  };

  // useEffect(() => {
  //   let result = moment(new Date()).format("L");
  //   console.log(result);
  //   let formatResult = result.replaceAll("/", "-");
  //   console.log(formatResult);
  //   setStartDay(formatResult);
  // }, []);

  React.useEffect(() => {
    console.log(startDay);
  }, [startDay]);

  return (
    <div className="schedule-page">
      <Header />
      <div className="schedule-content">
        <div className="schedule-left">
          <Typography variant="h4" gutterBottom>
            Your schedule
          </Typography>
          {/* <div className="schedule-title">
            <Input
              className="glo-add-title"
              placeholder="Add title"
              sx={{ mb: 2 }}
              autoFocus
            />
          </div>
          <div className="schedule-time">
            <p>From</p>
            <div className="time-from-day">
              <div className="input-from-day">
                <input type="date" />
                <input type="time" />
              </div>
            </div>
            <p>To</p>
            <div className="time-to-day">

            </div>
          </div> */}

          <Grid container className="schedule-title">
            <Grid item xs={12} lg={5}>
              <Input
                className="glo-add-title"
                placeholder="Add title"
                sx={{ mb: 2 }}
                autoFocus
              />
            </Grid>
          </Grid>

          <div className="schedule-time">
            <Grid container>
              <Grid className="schedule-start-time">
                <Grid
                  item
                  // xl={3}
                  // lg={3.5}
                  container
                  // justifyContent={{ lg: "flex-start", xl: "flex-start" }}
                  mr={0.5}
                >
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    type="date"
                    defaultValue={startDay}
                    className="ip-dayUpper"
                  />
                </Grid>
                <Grid
                  item
                  // xl={2.5}
                  // lg={3.5}
                  // xs={5}
                  container
                  // justifyContent={{
                  //   lg: "center",
                  //   xl: "flex-start",
                  // }}
                >
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    type="time"
                    className="ip-timeUpper"
                  />
                </Grid>
              </Grid>

              <Grid
                item
                // xl={1}
                // lg={12}
                // xs={8}
                container
                // justifyContent={{ lg: "flex-start", xl: "center" }}
                // alignItems="center"
                // my={{ lg: 2, xs: 1 }}
                my={1}
              >
                <Typography color="black">To</Typography>
              </Grid>

              <Grid className="schedule-end-time">
                <Grid
                  item
                  // xl={3}
                  // lg={3.5}
                  container
                  // justifyContent={{ lg: "flex-start", xl: "flex-end" }}
                  mr={0.5}
                >
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    type="date"
                    className="ip-dayDown"
                  />
                </Grid>
                <Grid
                  item
                  // xl={2.5}
                  // lg={3.5}
                  container
                  // justifyContent={{ lg: "center", xl: "flex-end" }}
                >
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    type="time"
                    className="ip-timeDown"
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
          {/* <div className="time-loop" style={{ marginTop: "10px" }}>
            <FormControl
              sx={{ mb: 2, minWidth: 200 }}
              size="small"
              className="glo-select-repeat"
            >
              <InputLabel id="demo-select-small">Choose option</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={repeatime}
                label="Repeat time"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Do not repeat</em>
                </MenuItem>
                <MenuItem value={"daily"}>Daily</MenuItem>
                <MenuItem value={"Monday to Friday"}>Monday to Friday</MenuItem>
                <MenuItem value={"Custom"}>Custom</MenuItem>
              </Select>
            </FormControl>
          </div> */}
          {/* <div className="time-loop" style={{ marginTop: "10px" }}>
            <FormControl
              sx={{ mb: 2, minWidth: 320 }}
              size="small"
              className="glo-select-repeat"
            >
              <InputLabel id="demo-select-small">Choose option</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={repeatime}
                label="Repeat time"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Do not repeat</em>
                </MenuItem>
                <MenuItem value={"daily"}>Daily</MenuItem>
                <MenuItem value={"Monday to Friday"}>Monday to Friday</MenuItem>
                <MenuItem value={"Custom"}>Custom</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="info-room">
            <Typography variant="h6" gutterBottom>
              Event details
            </Typography>
            <div className="info-meet">
              <Button
                className="glo-btn-join-meet"
                variant="contained"
                color="success"
                sx={{ mb: 1 }}
              >
                Join Meet
              </Button>
              <Typography variant="caption" display="block" gutterBottom>
                Information meet
              </Typography>
            </div>
          </div>
          <div className="glo-notify">
            <Stack spacing={2} direction="row">
              <div className="glo-stack-text">
                <Typography
                  variant="subtitle1"
                  display="block"
                  className="text-send-email text-margin"
                >
                  Send notifications by mail
                </Typography>
              </div>

              <div className="glo-row-stack">
                <TextField
                  sx={{ m: 1, maxWidth: 70 }}
                  size="small"
                  type="number"
                  inputProps={{ min: 1, max: 60 }}
                />
                <FormControl sx={{ minWidth: 200 }} size="small">
                  <InputLabel id="demo-select-small">Time</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={repeatime}
                    label="Time"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>minute</em>
                    </MenuItem>
                    <MenuItem value={"hour"}>hour</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Stack>
          </div>
          <div className="glo-description">
            <Typography variant="h6" gutterBottom>
              Add description
            </Typography>
            <div className="textarea-description">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={8}
                placeholder="Add description"
              />
            </div>
          </div>
          <div className="glo-guest">
            <Typography variant="h6" gutterBottom>
              Guest
            </Typography>
            <TextField
              className="glo-add-guest"
              id="filled-basic"
              label="Add guest"
              variant="filled"
              size="small"
            />
          </div> */}
        </div>
        <div className="schedule-right"></div>
      </div>
    </div>
  );
}
