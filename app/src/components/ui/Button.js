import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ReusableButton({ text, color, startIcon, icon, width, height, onClick, fontSize, textTransform, borderColor, borderRadius, to }) {
    return (
        <div>
            <Button
                variant="contained"
                color={color}
                startIcon={startIcon}
                endIcon={icon}
                sx={{ borderColor: borderColor, borderRadius: borderRadius !== undefined ? borderRadius : 28, width: width, height: height }}
                onClick={onClick}
                component={Link} // Set component prop to Link
                to={to} // Set to prop to the specified route
            >
                <Typography variant="button" sx={{ textTransform: textTransform, fontSize: fontSize }}>{text}</Typography>
            </Button>
        </div>
    );
}