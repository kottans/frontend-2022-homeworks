let URL_API = 'https://randomuser.me/api/?results=50&nat=us,gb,ua&inc=gender,name,email,dob,phone,picture';

const getData = () => fetch(URL_API)
    .then(response => response.json())
    .catch((err) => {console.error(err)});

export default getData;

