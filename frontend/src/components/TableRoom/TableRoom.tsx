import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OutputIcon from "@mui/icons-material/Output";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/provider";
import "../TableRoom/tableroom.css";
import { meetListData } from "../../contexts/meet";
import { auth } from "../../configs/firebase-config";

export function TableRoom() {
  const homeProvider = useContext<any>(GlobalContext);
  const { authDetailState, userDetailState, meetListState, meetListDispatch } =
    homeProvider;
  const navigate = useNavigate();

  const [openSnackbarCode, setOpenSnackbarCode] = React.useState(false);

  useEffect(() => {
    const getListRoom = async () => {
      await axios
        .get("http://localhost:8080/api/room/list-room", {
          withCredentials: true,
        })
        .then(async (result) => {
          await meetListDispatch(meetListData(result.data.data));
        });
    };
    getListRoom();
  }, [authDetailState]);

  const handleDeleteRoom = async () => {
    const res = await axios.delete(
      "http://localhost:8080/api/room/delete-room/"
    );
  };

  const handleCopyLink = (nameRoom: any) => {
    navigator.clipboard.writeText(nameRoom);
    setOpenSnackbarCode(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbarCode(false);
  };

  return (
    <div className="tableroom-content">
      {authDetailState?.payload?.isLogin === true ? (
        <TableContainer component={Paper} sx={{ maxHeight: 330 }}>
          <Table stickyHeader>
            {meetListState.payload.length == 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell>There are no meeting rooms</TableCell>
                </TableRow>
              </TableHead>
            ) : (
              <TableHead className="bg-table-header">
                <TableRow>
                  <TableCell className="text-while-table-header" width="150px">
                    Name
                  </TableCell>
                  <TableCell
                    className="text-while-table-header glo-text-center"
                    width="500px"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
            )}

            <TableBody>
              {meetListState.payload.map((meet: any, index: any) => {
                console.log("meetListState");
                console.log(meetListState.payload.length);
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {meet.room_name.length > 10 ? (
                        <Typography noWrap>{`${meet.room_name.slice(
                          0,
                          10
                        )}...`}</Typography>
                      ) : (
                        <Typography noWrap>{meet.room_name}</Typography>
                      )}
                    </TableCell>

                    <TableCell className="glo-text-center">
                      <Tooltip title="Copy">
                        <Button
                          variant="outlined"
                          startIcon={<ContentCopyIcon />}
                          className="link-room"
                          onClick={() => handleCopyLink(meet?.friendly_id)}
                        >
                          Copy
                        </Button>
                      </Tooltip>
                      <Snackbar
                        open={openSnackbarCode}
                        autoHideDuration={6000}
                        onClose={handleClose}
                      >
                        <Alert
                          onClose={handleClose}
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          You have copied the link of the meeting!
                        </Alert>
                      </Snackbar>
                      <Button
                        variant="outlined"
                        className="link-room"
                        color="success"
                        startIcon={<OutputIcon />}
                        onClick={() => {
                          navigate("/room/" + meet.friendly_id);
                        }}
                      >
                        Redirect
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteRoom}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography color="text.secondary">
              Create your own meeting room
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
