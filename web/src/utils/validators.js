// Email validation
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Username validation
export const isValidUsername = (username) => {
  return username.length >= 3 && username.length <= 50;
};

// Amount validation
export const isValidAmount = (amount) => {
  return !isNaN(amount) && parseFloat(amount) > 0;
};

// Date validation
export const isValidDate = (date) => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

// Phone number validation
export const isValidPhoneNumber = (phone) => {
  const regex = /^[\d\s\-\+\(\)]+$/;
  return !phone || regex.test(phone);
};
