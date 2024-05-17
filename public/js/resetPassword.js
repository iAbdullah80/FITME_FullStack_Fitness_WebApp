const signupForm = document.getElementById('reset-form');
const errorMessage = document.getElementById('error-message');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const password = signupForm.elements.password.value;
  const confirmPassword = signupForm.elements.confirmPassword.value;

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    errorMessage.style.display = 'block';
    return;
  }

  try {
    const response = await fetch('/reset', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signupForm.elements.email.value,
        password: signupForm.elements.password.value
      })
    });

    if (response.status === 404) {
      errorMessage.textContent = 'User not found.';
      errorMessage.style.display = 'block';
    } else if (response.status === 200) {
        // Handle successful reset
        errorMessage.style.color = 'green';
        errorMessage.textContent = 'Password reset successful. Redirecting to sign in page.';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            window.location.href = '/signin';
        }, 3000);
        } else if (response.status === 401) {
            errorMessage.textContent = 'Admin password cannot be reset.';
            errorMessage.style.display = 'block';
        }
    else {
        console.log("Error: ", response);
        window.location.reload();
    }
  } catch (error) {
    console.error('Error:', error);
    errorMessage.textContent = 'Error.';
    errorMessage.style.display = 'block';
    setTimeout(() => {
        window.location.reload();
    }, 3000);
  }
});