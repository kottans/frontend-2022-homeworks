export async function getData(url) {
  const errorWindow = document.querySelector(".error");
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  } catch (error) {
    errorWindow.querySelector(
      ".error__title"
    ).textContent = `Error: ${error.message}`;
    errorWindow.showModal();
    console.log("Error: " + error.message);
  }
}
