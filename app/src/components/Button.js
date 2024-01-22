import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function ReusableButton({text, color, icon}) {
    return (
        <div>
            <Button variant="contained" color={color} endIcon={icon}  sx={ { borderRadius: 28 } }>
                <Typography variant="button">{text}</Typography>
            </Button>
        </div>
    )
}