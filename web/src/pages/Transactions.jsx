import React from 'react';
import { Box, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TransactionsFilterBar from '../components/transactions/TransactionsFilterBar';
import TransactionsGroupedList from '../components/transactions/TransactionsGroupedList';
import TransactionsSearchBar from '../components/transactions/TransactionsSearchBar';
import TransactionsSummaryCard from '../components/transactions/TransactionsSummaryCard';
import useTransactionsData from '../hooks/useTransactionsData';
import '../css/Transactions.css';

const Transactions = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filters,
    totalSpent,
    groupedTransactions,
    hasResults
  } = useTransactionsData();

  return (
    <Box className="transactions-root">
      <Sidebar />
      <Box className="transactions-main">
        <Box className="transactions-header-container">
          <Header 
            title="Transactions" 
            showAvatar={false}
          />
        </Box>

      <TransactionsSummaryCard totalSpent={totalSpent} />

      <TransactionsSearchBar value={searchQuery} onChange={setSearchQuery} />

      <TransactionsFilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <TransactionsGroupedList
        groupedTransactions={groupedTransactions}
        hasResults={hasResults}
        onAddTransaction={() => navigate('/add-transaction')}
      />

      {/* Floating Action Button */}
      <Fab 
        className="transactions-fab" 
        color="primary"
        onClick={() => navigate('/add-transaction')}
      >
        <AddIcon />
      </Fab>
      </Box>
    </Box>
  );
};

export default Transactions;
