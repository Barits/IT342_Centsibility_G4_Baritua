package com.centsibility.backend.repository;

import com.centsibility.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * RoleRepository - Data access layer for Role entity
 * 
 * TODO: 
 * - Implement initialization of default roles in database
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    /**
     * Find role by name
     * @param name role name
     * @return Optional containing role if found
     */
    Optional<Role> findByName(Role.RoleName name);
}
