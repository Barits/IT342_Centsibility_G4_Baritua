import React from 'react';
import { Paper, Typography, LinearProgress } from '@mui/material';

const BudgetOverviewCard = ({
  cardClass,
  label,
  value,
  valueClass,
  meta,
  progressValue,
  progressTone
}) => (
  <Paper elevation={0} className={`budget-overview-card ${cardClass}`}>
    <Typography variant="body2" className="budget-overview-label">
      {label}
    </Typography>
    <Typography variant="h4" className={`budget-overview-value ${valueClass || ''}`.trim()}>
      {value}
    </Typography>
    {typeof progressValue === 'number' && (
      <LinearProgress
        variant="determinate"
        value={progressValue}
        className={`budget-overview-progress progress-${progressTone}`}
      />
    )}
    <Typography variant="caption" className="budget-overview-meta">
      {meta}
    </Typography>
  </Paper>
);

export default BudgetOverviewCard;
