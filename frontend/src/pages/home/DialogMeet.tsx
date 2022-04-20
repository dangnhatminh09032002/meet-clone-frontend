import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { server } from '../../configs/axios-config';
import { addMeet } from "../../contexts";
import { GlobalContext } from "../../contexts/provider";
import "./dialogmeet.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface IDialogMeet {
  openDialogMeet: boolean;
  setOpenDialogMeet: any;
  setAnchor: any;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function DialogMeet({
  openDialogMeet,
  setOpenDialogMeet,
  setAnchor,
}: IDialogMeet) {
  const handleClose = () => {
    setOpenDialogMeet(false);
  };

  const [name, setName] = useState("");
  const meetProvider = useContext<any>(GlobalContext);
  const { meetListDispatch } = meetProvider;

  const handleSubmitCreateMeeting = async () => {
    await server
      .post(
        "rooms",
        { room_name: name },
      )
      .then(async (result) => {
        await meetListDispatch(addMeet(result.data));
      });
    setOpenDialogMeet(false);
    setAnchor(null);
  };


  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleSubmitCreateMeeting();
    }
  }

  return (
    <form onSubmit={handleSubmitCreateMeeting}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialogMeet}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create a meeting room
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography>Enter room creation information</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Meeting name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            onKeyDown={onKeyDown}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={handleSubmitCreateMeeting}
          >
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </form>
  );
}
