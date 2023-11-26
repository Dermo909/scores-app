import {useState} from 'react'
import './App.css';

function App() {

  const [sendResponse, setSendResponse] = useState(null);
  const [getResponse, setGetResponse] = useState(null);

  const handleSendScorseButtonClick = async () => {
    try {
      const url = 'https://47qi87hk9l.execute-api.us-east-1.amazonaws.com/dev'; 

      // JSON data to be sent in the POST request
      const postData = [{
        "id": "11",
        "hometeam": "Waterford Utd",
        "awayteam": "Wexford",
        "homescore": "3",
        "awayscore": "1"
      }];

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent' : 'react app'
        },
        body: JSON.stringify(postData),
      };
      setSendResponse("Sending.......");
      const apiResponse = await fetch(url, requestOptions);
      const responseData = await apiResponse.json();

      // Update state with the response data
      setSendResponse(responseData);
    }
    catch (error) {
      // Handle errors here if the fetch or JSON parsing fails
      console.error('Error:', error);
      setSendResponse('Error:', error);
    }
  };

  const handleGetScoresButtonClick = async () => {
    try {
      const url = 'https://47qi87hk9l.execute-api.us-east-1.amazonaws.com/dev'; 

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent' : 'react app'
        },
      };

      const apiResponse = await fetch(url, requestOptions);
      const responseData = await apiResponse.json();

      // Update state with the response data
      setGetResponse(JSON.parse(responseData.body).Items);
    }
    catch (error) {
      // Handle errors here if the fetch or JSON parsing fails
      console.error('Error:', error);
      setGetResponse('Error:', error);
    }
  };

  return (

    <>
    <div>
      <h1>POST Scores</h1>
      <button onClick={handleSendScorseButtonClick}>Send Scores</button>
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(sendResponse, null, 2)}</pre>
      </div>
    </div>
    <div>
      <h1>GET Scores</h1>
      <button onClick={handleGetScoresButtonClick}>Get Scores</button>
      <div>
        <h2>DynamoDB Items</h2>
        <div>
      <table>
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Home Score</th>
            <th>Away Score</th>
          </tr>
        </thead>
        <tbody>
          {getResponse && getResponse.map((item, index) => (
            <tr key={index}>
              <td>{item.HomeTeam}</td>
              <td>{item.HomeScore}</td>
              <td>{item.AwayScore}</td>
              <td>{item.AwayTeam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
    </>
  );
}

export default App;
