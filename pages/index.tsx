import React, { useEffect, useState} from 'react';



const Index: React.FunctionComponent = () => {
const[data,setData] = useState({
  users: []
})
  const options = {
    method: 'GET',
  };
  const url = "https://atacha.azurewebsites.net/";
  const getAtachaData = async () => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const newData = data;

      if (newData) {
        setData(newData)
      }
      
      
    } catch (error) {
      console.error(error)
    }
  };
  
  useEffect(() => {
    const getDataZipcodes = async () => {
      await getAtachaData();
    };
      getDataZipcodes();
  }, [data]);
  

  return (
    <p>

{data && data.users.map((user:any)=>{
  return (<div>{user.name}</div>)
})}
    </p>
    

  )

}

export default Index
