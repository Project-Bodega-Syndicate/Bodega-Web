import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  // const [error, setError] = useState(false);

  const u_name = id;
  // const baseURL = "https://bodegaproduction.azurewebsites.net/bodega-api/searchMetaUser/";
  const baseURL2 =
    "https://bodegaproduction.azurewebsites.net/bodegaPublicURL/";
  const baseURL3 =
    "https://bodegaproduction.azurewebsites.net/searchBPL/metausername/";

  useEffect(() => {
    fetchData(u_name);
  }, []);

  useEffect(() => {
    fetchMetaData();
  }, []);

  useEffect(() => {
    if (apiData && apiData.results) {
      const temp = apiData.results;
      console.log(temp);
      const temp2 = temp.map((item) => item.metausername);
      setUserList(temp2);
      console.log(userList);
    }
  }, [apiData]);

  useEffect(() => {
    if (userList && userList.includes(u_name)) {
      setError(false);
      console.log("Found");
    } else {
      setError(true);
      console.log("Not Found");
    }
  }, [userList]);

  const fetchData = (u_name) => {
    const fetchData = async (u_name) => {
      setIsLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.post(baseURL3, {
          headers: headers,
          metausername: u_name,
        });
        if (response) {
          setIsLoading(false);
          console.log(response.data);
          setData(response.data);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchData(u_name);
  };

  const fetchMetaData = () => {
    const fetchMetaData = async () => {
      setIsLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get(baseURL2, {
          headers: headers,
        });
        if (response) {
          setIsLoading(false);
          console.log(response.data);
          setApiData(response.data);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchMetaData();
  };

  return (
    <div class="main">
      <div class="temp">
        <p>User MetaId: {id}</p>
      </div>
      <div class="container">
        {data && userList && data !== "" ? (
          <>
            <section class="one">
              <h1>First Page</h1>
              <br></br>
              {/* <h4>All users list:</h4> */}
              {/* <ul>
                {userList.map((item) => {
                  return <li>{item}</li>;
                })}
              </ul> */}
              <h4>All users list:</h4>
              <ul>
                {userList.map((item) => {
                  return <li>{item}</li>;
                })}
              </ul>
            </section>
            <section class="two">
              <h1>Second Page</h1>
            </section>
          </>
        ) : (
          <>
            <section class="one">
              <h1>First Page</h1>
            </section>
            <section class="two">
              <h1>Second Page</h1>
            </section>
            <section class="three">
              <h1>Third Page</h1>
            </section>
            <section class="four">
              <h1>Fourth Page</h1>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
