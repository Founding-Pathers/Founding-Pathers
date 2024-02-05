import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

export default function AlertDialog({buttonText, src, dialogHeader, agreeText, closeText, fontSize, textTransform, textColor, onYes, showTwoButtons, widthIcon}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen} sx={{ textTransform: textTransform, fontSize: fontSize, color: textColor, paddingTop: 0 }}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ borderRadius: "20px", width: "336px", height: "244.5px", fontSize: 18, marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto" }}
      >
        <DialogTitle sx={{ textAlign: "center", paddingBottom: 0 }} id="alert-dialog-title">
            <img src={src} alt="icon" style={{ height: widthIcon, width: widthIcon, marginRight: '8px'}} />
        </DialogTitle>

        <DialogContent sx={{ paddingBottom: 1, paddingTop: 0 }}>
          <DialogContentText sx={{ fontSize: "18px", fontWeight: 600, textAlign: "center", color: "black" }} id="alert-dialog-description">
            {dialogHeader}
          </DialogContentText>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ justifyContent: 'space-around', paddingTop: 0, paddingBottom: 0 }}>
          <Button sx={{ fontSize: "16px", color: "#858585", width: '100%', fontWeight: 600, textTransform: "none" }} onClick={handleClose}>{closeText}</Button>
          {showTwoButtons && (
            <>
              <Divider orientation="vertical" flexItem />
              <Button
                sx={{
                  fontSize: "16px",
                  paddingRight: 8,
                  paddingLeft: 7,
                  width: '50%',
                  fontWeight: 600,
                  textTransform: "none",
                }}
                onClick={onYes}
                autoFocus
              >
                {agreeText}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}