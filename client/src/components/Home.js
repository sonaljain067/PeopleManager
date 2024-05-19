import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 

function Home() {
  const [ listOfPersons, setListOfPersons ] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/person")
      .then((response) => {
        console.log(response.data)
        setListOfPersons(response.data.data); 
      })
  }, [])

  const handleGoToPerson = (id) => {
    navigate(`/person/${id}`);
  };

  return (
    <div className="App">
      <h1>PeopleManager</h1>
      
      { listOfPersons.map((value) => {
        return <div className="person">
            <h3 className="name">{ value.name }</h3>
            <p className="email">{ value.email }</p>
            <p className="phone">{ value.phoneNumber }</p>
            <p className="dob">{ value.dateOfBirth }</p> 
            <Button variant="primary" onClick={() => handleGoToPerson(value.id)}>View Person</Button>
         </div> 
      })}
    </div>
  );
}

export default Home;
