# 📔 Mi Guía Personal de Git & GitHub

Esta guía contiene mis notas de aprendizaje sobre cómo usar Git de forma profesional, siguiendo las mejores prácticas de la industria.

---

## 🏗️ 1. El Ciclo de Vida de los Cambios
Para entender Git, hay que entender los 4 estados principales:

1.  **Working Directory**: Tus archivos reales en el editor.
2.  **Staging Area (Index)**: La "sala de espera" donde preparas lo que vas a guardar.
3.  **Local Repository**: Tu base de datos local (donde viven tus commits).
4.  **Remote Repository**: Servidores como GitHub donde compartes el código.

---

## 🛠️ 2. Comandos Esenciales

| Comando | Para qué sirve |
| :--- | :--- |
| `git status` | Ver qué archivos han cambiado y en qué estado están. |
| `git add <archivo>` | Mover un archivo a la "sala de espera" (Staging). |
| `git add .` | Agregar todos los cambios (usar con precaución). |
| `git commit -m "mensaje"` | Guardar los cambios con un mensaje descriptivo. |
| `git push origin <rama>` | Enviar tus commits locales a GitHub. |
| `git log --oneline` | Ver el historial de commits de forma resumida. |

---

## 📝 3. Conventional Commits (Mensajes Profesionales)
Formato: `<tipo>(scope): <descripción>`

| Tipo | Cuándo usarlo | Ejemplo |
| :--- | :--- | :--- |
| **feat** | Nueva funcionalidad | `feat: añadir login` |
| **fix** | Corregir un error | `fix: error en el buscador` |
| **docs** | Cambios en documentación | `docs: redactar guía de git` |
| **style** | Visuales (CSS, espacios) | `style: centrar botones` |
| **refactor** | Mejora de código (sin cambios de función) | `refactor: separar rutas` |

---

## 💡 4. Tips & Trucos de Oro

### Commits Atómicos
Cada commit debe encargarse de **una sola cosa**. Es mejor tener 5 commits pequeños y claros que uno solo gigante que diga "Actualización".

### Corregir el último commit local
Si te equivocaste en el mensaje o se te olvidó un archivo:
1. Agregas el archivo: `git add <archivo>`
2. Enmiendas: `git commit --amend --no-edit`

---

## 🚨 5. Comandos de Emergencia (¡Uso con Precaución!)

### Deshacer el último commit (manteniendo los cambios)
Si hiciste un commit pero quieres "deshacerlo" para seguir editando esos mismos archivos:
```bash
git reset --soft HEAD~1
```

### Forzar actualización en GitHub
Si usaste `amend` después de haber hecho un `push`, GitHub rechazará tu próxima subida. Para solucionarlo (SOLO en proyectos personales):
```bash
git push origin <rama> --force
```

### Descartar todos los cambios locales (¡Peligro!)
Si hiciste un lío y quieres volver exactamente a como estaba el último commit (borra todo lo que no hayas guardado):
```bash
git restore .
```

---

*Última actualización: 2026-02-03*
