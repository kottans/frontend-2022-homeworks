export async function getData(url) {
  const errorWindow = document.querySelector(".error");
  try {
    const responseData = await fetch(url);
    return await responseData.json();
  } catch {
    errorWindow.showModal();
    console.log(error);
  }
}
