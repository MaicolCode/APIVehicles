export function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem(
    'darkMode', 
    document.body.classList.contains('dark-mode')
  );
}

// Función para inicializar el tema
export function initTheme() {
  // Verificar preferencia de tema guardada
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Agregar event listeners a todos los botones de cambio de tema
  const darkModeToggles = document.querySelectorAll('.dark-mode-toggle');
  darkModeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleDarkMode);
  });
}

document.addEventListener('DOMContentLoaded', initTheme)