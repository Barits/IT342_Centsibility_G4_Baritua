import React from 'react';
import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CategoriesWithoutBudgetsPanel = ({
  categories,
  showUnusedCategories,
  onToggle,
  onSetBudget
}) => (
  <Paper elevation={0} className="budgets-management-side">
    <Box className="side-panel-header" onClick={onToggle}>
      <Typography variant="subtitle1" className="side-panel-title">
        Categories Without Budgets
      </Typography>
      <ExpandMoreIcon className={`side-panel-chevron ${showUnusedCategories ? 'expanded' : ''}`} />
    </Box>
    <Typography variant="body2" className="budgets-section-subtitle side-panel-subtitle">
      Optional categories you can budget later.
    </Typography>

    {showUnusedCategories && (
      <>
        {categories.length === 0 ? (
          <Paper elevation={0} className="no-extra-categories-card">
            <Typography variant="body2" className="no-extra-categories-text">
              No optional categories pending setup.
            </Typography>
          </Paper>
        ) : (
          <Box className="categories-without-budget">
            {categories.map((category) => (
              <Paper key={category.id} elevation={0} className="category-without-budget-item">
                <Box className="category-without-budget-info">
                  <Box className="category-budget-icon">{category.icon}</Box>
                  <Box>
                    <Typography variant="body1" className="category-without-budget-name">
                      {category.name}
                    </Typography>
                    <Typography variant="caption" className="category-without-budget-meta">
                      0% spent this month
                    </Typography>
                  </Box>
                </Box>

                <Box className="category-without-budget-actions">
                  <LinearProgress variant="determinate" value={0} className="category-progress-bar progress-empty" />
                  <Button
                    variant="contained"
                    size="small"
                    className="set-budget-button"
                    onClick={() => onSetBudget(category.name)}
                  >
                    Set Budget
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </>
    )}
  </Paper>
);

export default CategoriesWithoutBudgetsPanel;
