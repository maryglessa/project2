const form = document.getElementById('passwordResetForm');
const emailField = document.getElementById('email');
const newPasswordField = document.getElementById('newPassword');
const confirmPasswordField = document.getElementById('confirmPassword');
const passwordFields = document.querySelector('.password-fields');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());

    if (emailValid) {
        emailField.classList.remove('is-invalid'); // Clear email error on valid input
        passwordFields.style.display = 'block'; // Show password fields

        const newPassword = newPasswordField.value.trim();
        const confirmPassword = confirmPasswordField.value.trim();
        const passwordsMatch = newPassword === confirmPassword;

        // Check password validity
        if (newPassword && passwordsMatch) {
            Swal.fire({
                title: 'Password Reset Successful!',
                text: 'Your password has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                form.reset();
                passwordFields.style.display = 'none'; // Hide password fields after success
            });
        } else {
            // If passwords do not match, add error class
            if (!passwordsMatch) {
                confirmPasswordField.classList.add('is-invalid');
            } else {
                confirmPasswordField.classList.remove('is-invalid');
            }
        }

        // Clear red error on typing in new password field
        newPasswordField.addEventListener('input', function() {
            newPasswordField.classList.remove('is-invalid');
        });

        // Clear red error on typing in confirm password field
        confirmPasswordField.addEventListener('input', function() {
            confirmPasswordField.classList.remove('is-invalid');
        });
    } else {
        emailField.classList.add('is-invalid'); // Invalid email
    }
});

// Toggle password visibility
function togglePasswordVisibility(inputField, toggleButton) {
    const input = document.getElementById(inputField);
    input.type = input.type === 'password' ? 'text' : 'password';
    toggleButton.textContent = input.type === 'password' ? 'Show' : 'Hide'; // Change button text
}

document.getElementById('toggleNewPassword').addEventListener('click', function() {
    togglePasswordVisibility('newPassword', this);
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    togglePasswordVisibility('confirmPassword', this);
});