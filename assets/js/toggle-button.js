const css_stylesheet = document.getElementById("theme-css");
const toggle_btn = document.getElementById("toggle-theme");

if (toggle_btn) toggle_btn.addEventListener("click", changeTheme);

function changeTheme() {

    const oldTheme = getTheme();

    let newTheme;
    
    if(oldTheme === "dark") {
       newTheme = "light";
    } else newTheme = "dark";

    
    localStorage.setItem("theme", newTheme);
    css_stylesheet.href = `./assets/css/${newTheme}.css`;
}

function getTheme() {
   let theme = localStorage.getItem("theme");

   

   if (theme === null) {
       theme = "dark";
       localStorage.setItem("theme", theme);
    }

   return theme; 
}

(() => {
    let theme = getTheme();
    css_stylesheet.href = `./assets/css/${theme}.css`;
})();



