import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import '../css/components/EmptyState.css';

const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <Box className="empty-state">
      <Typography variant="h6" className="empty-state-title">
        {title}
      </Typography>
      <Typography variant="body2" className="empty-state-description">
        {description}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} className="empty-state-action">
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;