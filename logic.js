
function checkPassword() {
    const input = document.getElementById('password').value;
    if (input === 'Panda1') {
        window.location.href = 'app.html';
    } else {
        document.getElementById('error').innerText = 'Niepoprawne hasło.';
    }
}
