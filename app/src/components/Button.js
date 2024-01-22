import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';

export default function ReusableButton({text, color}) {
    return (
        <div>
            <Button variant="contained" color={color} endIcon={<SendIcon />}  sx={ { borderRadius: 28 } }>
                <Typography variant="button">{text}</Typography>
            </Button>
        </div>
    )
}