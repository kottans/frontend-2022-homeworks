const baseURL = "https://randomuser.me/api?results=100";

const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status — ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const getUserList = async () => {
  const data = await getData(`${baseURL}`);
  return data.results.map(convertUserData);
}

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
