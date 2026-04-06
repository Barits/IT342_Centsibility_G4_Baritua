import React from 'react';
import { Box, Typography } from '@mui/material';
import EmptyState from './EmptyState';
import '../css/components/CategorySelector.css';

const CategorySelector = ({ selectedCategory, onSelect, categories = [], className = '' }) => {
  const colorClassByHex = {
    '#EF4444': 'category-color-red',
    '#3B82F6': 'category-color-blue',
    '#EC4899': 'category-color-pink',
    '#F59E0B': 'category-color-amber',
    '#8B5CF6': 'category-color-violet',
    '#10B981': 'category-color-green',
    '#6B7280': 'category-color-gray'
  };

  if (categories.length === 0) {
    return (
      <EmptyState
        title="No categories available"
        description="Load transaction categories from the backend before showing category chips here."
      />
    );
  }

  return (
    <Box className={`category-selector ${className}`.trim()}>
      <Typography variant="body2" className="category-selector-label">
        Category
      </Typography>
      <Box className="category-grid">
        {categories.map((category) => (
          <Box
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'selected' : ''} ${colorClassByHex[category.color] || 'category-color-default'}`}
            onClick={() => onSelect(category.id)}
          >
            <Box className="category-icon">
              {category.icon}
            </Box>
            <Typography variant="caption" className="category-label">
              {category.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategorySelector;
