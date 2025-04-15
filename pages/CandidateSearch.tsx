import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';


const CandidateSearch = () => {
  const [loggins, setLoggins] = useState<{ login: string }[]>([]);
  const [index, setIndex] = useState(0);
  // Removed unused isSelected state
  const [details, setDetails] = useState<{ login?: string; avatar_url?: string; location?: string; email?: string; company?: string; bio?: string }>({});
  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await searchGithub();
        console.log(response);
        setLoggins(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }
  , []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await searchGithubUser(loggins[index].login);
        console.log(response);
        setDetails(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }
  , [loggins, index]);

  const makeDecision = async (isSelected: boolean) => {
    if (isSelected) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(details);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    // Removed setIsSelected as isSelected is no longer used
    setIndex((prevIndex) => (prevIndex + 1) % loggins.length);
  }
  
  return <>

   <h1>Candidate Search</h1>
   <div className="boxContainer">
    <div className= "clientPic">
    <img src = {details.avatar_url} alt="Avatar" />
    </div>
    
    <div className="clientInfo" >
      <h2>{details.login}</h2>
      <p>{details.location ? details.location:"Location not available."}</p>
      <p>{details.email ? details.email: "Email not available."}</p>
      <p>{details.company ? details.company: "Company not available."}</p>
      <p>{details.bio ? details.bio: "Bio not available."}</p>
    </div>
   </div>
    <div className="buttonContainer">
            <div>
              <IoRemoveCircle
              style={{
                color: 'red',
                fontSize: '80px',
                cursor: 'pointer',
              }}
              onClick={() => makeDecision(false)}
              
            /></div>

              <div>
            <IoAddCircle
              style={{
                fontSize: '80px',
                color: 'green',
                cursor: 'pointer',
              }}
              onClick={() => makeDecision(true)}
            /></div>
          </div>
          
   </>
};

export default CandidateSearch;
