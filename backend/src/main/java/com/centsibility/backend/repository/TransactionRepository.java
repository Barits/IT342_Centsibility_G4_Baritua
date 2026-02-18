package com.centsibility.backend.repository;

import com.centsibility.backend.model.Transaction;
import com.centsibility.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * TransactionRepository - Data access layer for Transaction entity
 * 
 * TODO: 
 * - Implement pagination for transaction lists
 * - Add filtering by date range, category, type
 * - Add aggregation methods (sum by category, monthly totals, etc.)
 */
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    /**
     * Find all transactions for a specific user
     * @param user the user
     * @return list of transactions
     */
    List<Transaction> findByUser(User user);
    
    /**
     * Find transactions by user and type
     * @param user the user
     * @param type transaction type (INCOME/EXPENSE)
     * @return list of transactions
     */
    List<Transaction> findByUserAndType(User user, Transaction.TransactionType type);
    
    /**
     * Find transactions by user within date range
     * @param user the user
     * @param startDate start date
     * @param endDate end date
     * @return list of transactions
     */
    List<Transaction> findByUserAndTransactionDateBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
    
    /**
     * Find transactions by user and category
     * @param user the user
     * @param category transaction category
     * @return list of transactions
     */
    List<Transaction> findByUserAndCategory(User user, Transaction.Category category);
    
    // TODO: Add more custom query methods
    // Example: @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user = ?1 AND t.type = ?2")
    //          BigDecimal getTotalByUserAndType(User user, TransactionType type);
}
