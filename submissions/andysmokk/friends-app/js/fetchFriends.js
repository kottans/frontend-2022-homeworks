const BASE_URL = "https://randomuser.me/api/1.4/";

const fetchFriends = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}?results=20&inc=gender,name,picture,cell,location,dob&noinfo`
    );
    const dataResponse = await response.json();
    return dataResponse.results;
  } catch (error) {
    console.error(e.message);
  }
};

export { fetchFriends };
