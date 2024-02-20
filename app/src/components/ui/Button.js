import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function ReusableButton({text, color, icon, width, height, onClick, fontSize, textTransform}) {
    return (
        <div>
            <Button variant="contained" color={color} endIcon={icon} sx={ { borderRadius: 28, width: {width}, height: {height} } } onClick={onClick}>
                <Typography variant="button" sx={{ textTransform: {textTransform}, fontSize: {fontSize} }}>{text}</Typography>
            </Button>
        </div>
    )
}