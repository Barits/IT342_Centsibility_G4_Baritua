package com.app.centsibility.data.model

data class RegisterRequest(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String
)

data class LoginRequest(
    val email: String,
    val password: String
)

data class AuthResponse(
    val success: Boolean,
    val message: String?,
    val token: String?,
    val data: UserData?,
    val timestamp: String?
)

data class UserData(
    val id: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val role: String
)
