export const NOTES_KEY = 'notes-app-data';
export const THEME_KEY = 'notes-app-theme';

export const loadNotes = () => {
  try {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load notes from localStorage', e);
    return [];
  }
};

export const saveNotes = (notes) => {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save notes to localStorage', e);
  }
};

export const loadTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch (e) {
    console.error('Failed to load theme', e);
    return 'light';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme', e);
  }
};
