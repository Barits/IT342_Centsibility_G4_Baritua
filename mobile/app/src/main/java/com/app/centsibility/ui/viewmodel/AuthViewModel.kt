package com.app.centsibility.ui.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.app.centsibility.data.local.TokenManager
import com.app.centsibility.data.model.AuthResponse
import com.app.centsibility.data.model.LoginRequest
import com.app.centsibility.data.model.RegisterRequest
import com.app.centsibility.data.remote.Resource
import com.app.centsibility.data.repository.AuthRepository
import kotlinx.coroutines.launch

class AuthViewModel(
    private val repository: AuthRepository = AuthRepository(),
    private val tokenManager: TokenManager
) : ViewModel() {

    private val _authState = MutableLiveData<Resource<AuthResponse>?>(null)
    val authState: LiveData<Resource<AuthResponse>?> = _authState

    fun register(firstName: String, lastName: String, email: String, password: String) {
        if (firstName.isBlank() || lastName.isBlank() || email.isBlank() || password.isBlank()) {
            _authState.value = Resource.Error("All fields are required")
            return
        }
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            _authState.value = Resource.Error("Invalid email address")
            return
        }
        if (password.length < 8) {
            _authState.value = Resource.Error("Password must be at least 8 characters")
            return
        }
        val passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$".toRegex()
        if (!passwordPattern.matches(password)) {
            _authState.value = Resource.Error("Password must contain at least one digit, one lowercase, one uppercase, and one special character")
            return
        }

        viewModelScope.launch {
            _authState.value = Resource.Loading()
            val result = repository.register(RegisterRequest(firstName, lastName, email, password))
            _authState.value = result
        }
    }

    fun login(email: String, password: String) {
        if (email.isBlank() || password.isBlank()) {
            _authState.value = Resource.Error("Email and password are required")
            return
        }

        viewModelScope.launch {
            _authState.value = Resource.Loading()
            val result = repository.login(LoginRequest(email, password))
            if (result is Resource.Success && result.data?.token != null) {
                tokenManager.saveToken(result.data.token)
            }
            _authState.value = result
        }
    }

    fun resetState() {
        _authState.value = null
    }
}
