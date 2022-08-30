// Основа адреса для краткости
const baseURL = "https://randomuser.me/api?results=100";
// const baseURL = "../../assets/data.json";

// Базовая функция получения данных из API
const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status — ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Функция получения списка пользователей (с помощью "базовой функции")
export const getUserList = async () => {
  const data = await getData(`${baseURL}`);
  return data.results.map(convertUserData);
}

// Функция преобразования сложных данных из ответа в удобный объект
const convertUserData = (obj) => {
  return {
    name: obj.name.first + " " + obj.name.last,
    gender: obj.gender,
    photo: obj.picture.large,
    email: obj.email,
    phone: obj.phone,
    age: obj.dob.age, 
  }
}
