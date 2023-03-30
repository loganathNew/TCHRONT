import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function ResponsiveDialog({ open, msg, handleCloseDialog }) {
    // const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     props.handleCloseDialog(true);
    // };

    // const handleCloseYes = (val) => {
    //     props.handleCloseDialog(val);
    // };

    const handleCloseNo = (val) => {
        handleCloseDialog(val);
    };




    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                // onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {msg}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleCloseNo(false)}>
                        No
                    </Button>
                    <Button onClick={() => handleCloseNo(true)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}