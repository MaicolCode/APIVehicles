export function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem(
    'darkMode', 
    document.body.classList.contains('dark-mode')
  );
}

// Función para inicializar el tema
export function initTheme() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const darkIcon = document.querySelector('.dark');
  const lightIcon = document.querySelector('.light');

  // Verificar preferencia de tema guardada
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    
    // Restaurar estado del ícono en modo oscuro
    darkIcon.classList.add('hidden');
    lightIcon.classList.remove('hidden');
  } else {
    // Estado por defecto en modo claro
    darkIcon.classList.remove('hidden');
    lightIcon.classList.add('hidden');
  }

  darkModeToggle.addEventListener('click', (e) => {
    toggleDarkMode();
    if(darkIcon.classList.contains('hidden')) {
      darkIcon.classList.remove('hidden');
      lightIcon.classList.add('hidden');
    } else {
      darkIcon.classList.add('hidden');
      lightIcon.classList.remove('hidden');
    }
  }); 
}

export function selectedOption() {
  const optionDocs = document.querySelectorAll('.option-docs-list li');
  
  // Recuperar la opción seleccionada guardada
  const selectedOptionText = localStorage.getItem('selectedOptionText');
  
  optionDocs.forEach((option) => {
    // Evento de clic para guardar la opción
    option.addEventListener('click', () => {
      // Guardar texto del elemento
      localStorage.setItem('selectedOptionText', option.textContent.trim());
      
      // Limpiar selección anterior
      optionDocs.forEach(opt => opt.classList.remove('active'));
      
      // Marcar elemento actual
      option.classList.add('active');
    });

    // Restaurar selección si existe
    if (selectedOptionText && option.textContent.trim() === selectedOptionText) {
      // Limpiar selección anterior
      optionDocs.forEach(opt => opt.classList.remove('active'));
      
      // Marcar elemento correcto
      option.classList.add('active');
    }
  });
}

const prev_option = document.querySelector('.prev-page');
const next_option = document.querySelector('.next-page');

prev_option.addEventListener('click', () => {
  localStorage.removeItem('selectedOptionText');
});

next_option.addEventListener('click', () => {
  localStorage.removeItem('selectedOptionText');  
});

document.addEventListener('DOMContentLoaded', initTheme);
document.addEventListener('DOMContentLoaded', selectedOption);