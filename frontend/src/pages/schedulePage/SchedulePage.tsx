import React, { useEffect, useState } from "react";
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
import moment from "moment";

export function SchedulePage() {
  const [repeatime, setRepeatTime] = useState("");
  const [startDay, setStartDay] = useState("");
  // const [startDay, setStartDay] = useState(
  //   moment(new Date()).format("L").toString()
  // );
  const [hour, setHour] = useState<any>("");
  const handleChange = (event: SelectChangeEvent) => {
    setRepeatTime(event.target.value);
  };

  useEffect(() => {
    // let result = moment(new Date()).format("L");
    let result = moment(new Date()).format("L");
    console.log(result);
    setStartDay(result);

    // let formatResult = result.replaceAll("/", "-");
    // console.log(formatResult);
    // setStartDay(formatResult);
  }, []);

  return (
    <div className="schedule-page">
      <Header />
      <div className="schedule-content">
        <div className="schedule-left">
          <Typography variant="h4" gutterBottom>
            Your schedule
          </Typography>
          <Grid container className="schedule-title">
            <Grid item xs={12} lg={12} xl={12}>
              <Input
                className="glo-add-title"
                placeholder="Add title"
                sx={{ mb: 2 }}
                autoFocus
              />
            </Grid>
          </Grid>
          <p>{startDay}</p>
          <div className="schedule-time">
            <Grid container className="time" xl={12}>
              <Grid className="schedule-start-time" xl={5.5}>
                <Grid item md={6} lg={6} xl={6} container mr={0.5}>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    type="date"
                    asp-format="{mm/dd/yyyy}"
                    // defaultValue={startDay}
                    // defaultValue={`${startDay}`}
                    // value={`${startDay}`}
                    value={startDay}
                    className="ip-dayUpper"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} lg={6} xl={6} container>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    type="time"
                    className="ip-timeUpper"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid
                item
                container
                my={1}
                xl={1}
                justifyContent={{ xl: "center" }}
              >
                <Typography color="black">To</Typography>
              </Grid>

              <Grid className="schedule-end-time" xl={5.5}>
                <Grid item md={6} container mr={0.5} xl={6}>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    type="date"
                    className="ip-dayDown"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} container xl={6}>
                  <TextField
                    id="outlined-size-small"
                    size="small"
                    type="time"
                    className="ip-timeDown"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className="time-loop" style={{ marginTop: "10px" }}>
            <Grid container>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <FormControl
                  sx={{ mb: 2 }}
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
                    <MenuItem value={"Monday to Friday"}>
                      Monday to Friday
                    </MenuItem>
                    <MenuItem value={"Custom"}>Custom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div className="info-room">
            <Typography variant="h6" gutterBottom>
              Event details
            </Typography>
            <div className="info-meet">
              <Button
                className="glo-btn-join-meet"
                variant="contained"
                sx={{ mb: 1 }}
              >
                Join Meet
              </Button>
              <Typography variant="caption" display="block" gutterBottom>
                Information meet: <i>localhost:3000/abc-xyz</i>
              </Typography>
            </div>
          </div>
          <div className="glo-notify">
            <Grid container className="schedule-title">
              <Grid item xs={12}>
                <Typography variant="subtitle1" display="block">
                  Send notifications by mail
                </Typography>
              </Grid>
              <Grid container xl={12}>
                <Grid
                  item
                  xs={2.8}
                  sm={2.87}
                  md={2.8}
                  lg={2.5}
                  xl={2.4}
                  className="spac-right"
                >
                  <TextField
                    size="small"
                    type="number"
                    fullWidth
                    inputProps={{ min: 1, max: 60 }}
                  />
                </Grid>
                <Grid item xs={9} sm={9} md={9.125} lg={9.44} xl={9.51}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-select-small">Time</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={repeatime}
                      label="Time asasasasa"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>minute</em>
                      </MenuItem>
                      <MenuItem value={"hour"}>hour</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div className="glo-description">
            <Typography variant="h6" gutterBottom>
              Add description
            </Typography>
            <div className="texta-description">
              <TextareaAutosize
                aria-label="minimum height"
                minRows={4}
                maxRows={8}
                placeholder="Add description"
                className="textarea-description"
              />
            </div>
          </div>
          <div className="glo-guest">
            <Typography variant="h6" gutterBottom>
              Guest
            </Typography>
            <Grid container className="add-guest">
              <Grid item xs={12} sm={12}>
                <TextField
                  className="glo-add-guest"
                  id="filled-basic"
                  label="Add guest"
                  variant="filled"
                  size="small"
                />
              </Grid>
            </Grid>
          </div>
          <div className="btn-save-infor">
            <Button sx={{ my: 2 }} variant="contained" className="btn-save">
              Save
            </Button>
          </div>
        </div>
        <div className="schedule-right"></div>
      </div>
    </div>
  );
}
