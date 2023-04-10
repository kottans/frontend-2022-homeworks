const URL_API = 'https://randomuser.me/api/?results=75&nat=us,gb,ua&inc=gender,name,email,dob,phone,picture';

const getUsers = () => fetch(URL_API)
    .then(response => response.json())
    .catch((err) => {console.error(err)});

export default getUsers;


