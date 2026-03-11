import React from 'react';
import { Box, Typography } from '@mui/material';
import '../css/components/CategorySelector.css';

const CategorySelector = ({ selectedCategory, onSelect }) => {
  const categories = [
    { id: 'food', label: 'Food', icon: '🍔', color: '#EF4444' },
    { id: 'transport', label: 'Transport', icon: '🚗', color: '#3B82F6' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#EC4899' },
    { id: 'bills', label: 'Bills', icon: '💡', color: '#F59E0B' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
    { id: 'health', label: 'Health', icon: '💊', color: '#EF4444' },
    { id: 'education', label: 'Education', icon: '📚', color: '#3B82F6' },
    { id: 'salary', label: 'Salary', icon: '💰', color: '#10B981' },
    { id: 'housing', label: 'Housing', icon: '🏠', color: '#10B981' },
    { id: 'gifts', label: 'Gifts', icon: '🎁', color: '#EC4899' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '📱', color: '#3B82F6' },
    { id: 'other', label: 'Other', icon: '📦', color: '#6B7280' }
  ];

  return (
    <Box className="category-selector">
      <Typography variant="body2" className="category-selector-label">
        Category
      </Typography>
      <Box className="category-grid">
        {categories.map((category) => (
          <Box
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => onSelect(category.id)}
            sx={{
              borderColor: selectedCategory === category.id ? category.color : '#E5E7EB',
              backgroundColor: selectedCategory === category.id ? `${category.color}10` : 'transparent'
            }}
          >
            <Box 
              className="category-icon"
              sx={{ backgroundColor: `${category.color}20` }}
            >
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
