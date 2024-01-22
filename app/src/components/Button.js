import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function ReusableButton({text}) {
    return (
        <div>
            <Button variant="contained" color="success" endIcon={<SendIcon />}>
                {text}
            </Button>
        </div>
    )
}