import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  height: 270,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: "20px",
  boxShadow: 20,
  p: 2.5,
};

export default function BasicModal({ modalTitle, modalDesc, icon: IconComponent, size }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen} sx={{ p: 0 }}>
        <IconComponent fontSize={size} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
              <IconComponent fontSize="large" sx={{ml: 2.5}} />
            </Box>
            <CancelIcon onClick={handleClose} sx={{ cursor: 'pointer', alignItems: 'center', mb: 2.5 }}/>
          </Box>
          <Typography variant="filterh1" component="h2" sx={{ textAlign: 'center', pb: 1 }}>
                {modalTitle}
          </Typography>
          {Object.entries(modalDesc).map(([header, body], index) => (
            <div key={index}>
              <Typography variant="filterh1" sx={{ fontSize: '14px' }}>
                {header}
              </Typography>
              <Typography variant="filterh2" sx={{ textDecoration: 'none'}}>
                {body}
              </Typography>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}