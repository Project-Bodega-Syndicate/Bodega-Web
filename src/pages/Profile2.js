import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chevron from "../img/chevron-up.svg";

const Profile2 = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  // const [bg1, setBg1] = useState("");
  // const [bg2, setBg2] = useState("");
  const [mediaList, setMediaList] = useState([]);

  const u_name = id;
  // const baseURL1 = "https://bodegaproduction.azurewebsites.net/bodegaPublicURL/";
  const baseURL2 =
    "https://bodegaproduction.azurewebsites.net/searchBPL/metausername/";
  const baseURL3 =
    "https://bodegaproduction.azurewebsites.net/bodega-api/filterMetaUserTags/";
  const checkStr = "3c426c.jpeg";

  useEffect(() => {
    fetchData(u_name);
  }, [u_name]);

  useEffect(() => {
    var tempList = [];
    // const tempList2 = [];

    // tempList2.push(data.media1);
    // tempList2.push(data.media2);
    // tempList2.push(data.media3);
    // tempList2.push(data.media4);
    // tempList2.push(data.media5);
    // tempList2.push(data.media6);
    // tempList2.push(data.media7);
    // tempList2.push(data.media8);
    // tempList2.push(data.media9);
    // tempList2.push(data.media10);
    // tempList2.push(data.media11);
    // tempList2.push(data.media12);
    // tempList2.push(data.media13);
    // tempList2.push(data.media14);
    // tempList2.push(data.media15);

    if (data && data.media1) {
      if (!data.media1.includes(checkStr)) {
        tempList.push([data.media1, data.caption1]);
      }
      if (!data.media2.includes(checkStr)) {
        tempList.push([data.media2, data.caption2]);
      }
      if (!data.media3.includes(checkStr)) {
        tempList.push([data.media3, data.caption3]);
      }
      if (!data.media4.includes(checkStr)) {
        tempList.push([data.media4, data.caption4]);
      }
      if (!data.media5.includes(checkStr)) {
        tempList.push([data.media5, data.caption5]);
      }
      if (!data.media6.includes(checkStr)) {
        tempList.push([data.media6, data.caption6]);
      }
      if (!data.media7.includes(checkStr)) {
        tempList.push([data.media7, data.caption7]);
      }
      if (!data.media8.includes(checkStr)) {
        tempList.push([data.media8, data.caption8]);
      }
      if (!data.media9.includes(checkStr)) {
        tempList.push([data.media9, data.caption9]);
      }
      if (!data.media10.includes(checkStr)) {
        tempList.push([data.media10, data.caption10]);
      }
      if (!data.media11.includes(checkStr)) {
        tempList.push([data.media11, data.caption11]);
      }
      if (!data.media12.includes(checkStr)) {
        tempList.push([data.media12, data.caption12]);
      }
      if (!data.media13.includes(checkStr)) {
        tempList.push([data.media13, data.caption13]);
      }
      if (!data.media14.includes(checkStr)) {
        tempList.push([data.media14, data.caption14]);
      }
      if (!data.media15.includes(checkStr)) {
        tempList.push([data.media15, data.caption15]);
      }
      // tempList.forEach((x) => {
      //   if (!x.includes(checkStr)) {
      //     tempList2.push(x);
      //   }
      // });
      console.log("Templist", tempList);
      setMediaList(tempList);
      console.log(data.caption1);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.id) {
      fetchData2(data.ownerMetaUserID);
    }
  }, [data]);

  useEffect(() => {
    if (data2 && data2 !== "") {
      setProfileImg(data2.metauserProfileLogo);
    }
  }, [data2]);

  const fetchData = (u_name) => {
    const fetchData = async (u_name) => {
      // setIsLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.post(baseURL2, {
          headers: headers,
          metausername: u_name,
        });
        if (response) {
          // setIsLoading(false);
          console.log("API Response: ", response.data);
          setData(response.data[0]);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchData(u_name);
  };

  const fetchData2 = (u_id) => {
    const fetchData2 = async (u_id) => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.post(baseURL3, {
          headers: headers,
          metauserID: u_id,
        });
        if (response) {
          console.log("API 2 Response: ", response.data);
          setData2(response.data[0]);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchData2(u_id);
  };

  return (
    <div class="main-cont flex flex-col justify-center bg-transparent">
      <div class="container sm:w-full max-w-md h-full self-center snap-y snap-mandatory	bg-transparent">
        {data && data !== "" ? (
          <>
            <section class="flex flex-col h-screen w-full items-center snap-start	text-white">
              <div class="relative w-full h-full justify-center">
                <div class="flex flex-col justify-end items-center	pb-16 relative w-full h-full z-50">
                  <img
                    src={Chevron}
                    alt="Chevron Up Logo"
                    class="w-10 mb-7"
                  ></img>
                  <img
                    class="rounded-full w-36 h-36 object-cover bg-black"
                    alt="User Profile Picture"
                    src={profileImg}
                  ></img>
                  <p class="text-3xl mt-4">{data.metausername}</p>
                </div>
                <img
                  class="h-full w-full absolute -z-10 top-0 left-0 object-cover object-center"
                  alt="Cover Media"
                  src={data.coverMedia}
                ></img>
              </div>
            </section>
            <section class="flex flex-col h-screen w-full justify-center items-center snap-start text-white	">
              <div class="relative w-full h-screen">
                <div class="relative z-50 py-11 h-screen overflow-y-scroll">
                  <div class="mb-8 flex justify-center align-center">
                    <img
                      class="rounded-full w-24 h-24 object-cover bg-black"
                      alt="User Profile Picture"
                      src={profileImg}
                    ></img>
                  </div>
                  <div class="flex flex-col justify-center items-center">
                    <p class="text-2xl">{data.metausername}</p>
                    <p class="text-lg font-thin">{data.bioCaption}</p>
                  </div>
                  <div class="flex justify-center items-center">
                    <div className="grid grid-cols-2 gap-3 mt-4 px-6">
                      {mediaList &&
                        mediaList.map((item) => {
                          return (
                            <img
                              class="w-40 h-56 object-cover rounded-xl cursor-pointer	"
                              alt="User Media"
                              src={item[0]}
                              onClick={() => {
                                window.open(item[1], "_blank");
                              }}
                            ></img>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {data.backgroundImage ==
                "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg" ? (
                  // <div class="h-full w-full absolute -z-10 top-0 left-0 bg-black"></div>
                  <img
                    class="h-full w-full absolute -z-10 top-0 left-0 object-cover object-center"
                    alt="Background Picture"
                    src="https://i.pinimg.com/736x/c1/9d/79/c19d7964360a0144b39a0e4b67ca2cfb.jpg"
                  ></img>
                ) : (
                  <img
                    class="h-full w-full absolute -z-10 top-0 left-0 object-cover object-center"
                    alt="Background Picture"
                    src={data.backgroundImage}
                  ></img>
                )}
              </div>
            </section>
          </>
        ) : (
          <div
            class="flex justify-center items-center"
            style={{ color: "white" }}
          >
            <p class="mt-10">User does not exist</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile2;
