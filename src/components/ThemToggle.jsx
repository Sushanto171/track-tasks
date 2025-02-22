import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "business");
    } else {
      document.documentElement.setAttribute("data-theme", "autumn");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-secondary dark:bg-secondary-dark text-white btn-sm"
    >
      {darkMode ? "Dark" : "light"}
    </button>
  );
};

export default ThemeToggle;
