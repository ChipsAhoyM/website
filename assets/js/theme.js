// Has to be in the head tag, otherwise a flicker effect will occur.

let toggleTheme = (theme) => {
  if (theme == "dark") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}

let applyTheme = (theme) => {
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
};

let setTheme = (theme) => {
  transTheme();
  applyTheme(theme);
  localStorage.setItem("theme", theme);

  // Updates the background of medium-zoom overlay.
  if (typeof medium_zoom !== 'undefined') {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement)
          .getPropertyValue('--global-bg-color') + 'ee',  // + 'ee' for transparency.
    })
  }
};


let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500)
}


let initTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored) {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}


initTheme();
