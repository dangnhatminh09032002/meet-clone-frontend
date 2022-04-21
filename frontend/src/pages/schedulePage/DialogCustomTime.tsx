import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
} from "@mui/material";

export interface IDialogCustom {
  openDialogCustom: boolean;
  setOpenDialogCustom: any;
}

export function DialogCustomTime({
  openDialogCustom,
  setOpenDialogCustom,
}: IDialogCustom) {
  const handleCloseCustom = () => {
    setOpenDialogCustom(false);
  };

  const handleSubmitScheduleMeet = async () => {};

  return (
    <form onSubmit={handleSubmitScheduleMeet}>
      <Dialog
        open={openDialogCustom}
        onClose={handleCloseCustom}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Custom time</DialogTitle>
        <DialogContent>
          <p>Repeat on</p>
          <Grid direction="row">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="T2"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="T3"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="T4"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="T5"
            />
          </Grid>
          <Grid>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="T6"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="T7"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="CN"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCustom}>Disagree</Button>
          <Button onClick={handleCloseCustom} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
