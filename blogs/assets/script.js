// Get the toggle button and the body
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const toggleIcon = toggleButton.querySelector('img');

// Apply the theme from localStorage on page load
function applyTheme(theme) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(theme);
    toggleIcon.src = theme === 'light-mode'
        ? 'https://img.icons8.com/ios-glyphs/30/000000/moon-symbol.png'
        : 'https://img.icons8.com/ios-glyphs/30/ffffff/sun--v1.png';
}

// Check localStorage for the preferred theme and apply it
const savedTheme = localStorage.getItem('theme') || 'dark-mode'; // Default to dark mode if no theme is saved
applyTheme(savedTheme);

// Debounce function to prevent rapid multiple toggles
function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}

// Toggle between light and dark mode
const toggleTheme = debounce(() => {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}, 300); // 300ms delay to debounce

toggleButton.addEventListener('click', toggleTheme);
