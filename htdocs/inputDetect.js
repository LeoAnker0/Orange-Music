//responsible for checking if there was an input made in the search bar, and then making sure that 

window.GLOBALuserHasTyped = false;
window.GLOBALtimeSinceLastType = "";

const inputElement = document.getElementById("searchBar");

inputElement.addEventListener('input', (event) => {
  GLOBALuserHasTyped = true;
  GLOBALtimeSinceLastType = Date.now();
});
