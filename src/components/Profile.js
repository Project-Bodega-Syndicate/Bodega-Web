import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chevron from "../img/chevron-up.svg";

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [mediaList, setMediaList] = useState([]);
  const [scrollValue, setScrollValue] = useState("");
  const [scrollAmt, setScrollAmt] = useState(0);
  const topRef = useRef(null);

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
      // console.log("Templist", tempList);
      setMediaList(tempList);
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
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.post(baseURL2, {
          headers: headers,
          metausername: u_name,
        });
        if (response) {
          // console.log("API Response: ", response.data);
          if (response.data.length === 0) {
            setIsLoading(false);
            setNoUser(true);
          } else {
            setData(response.data[0]);
          }
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    setIsLoading(true);
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
          setIsLoading(false);
          // console.log("API 2 Response: ", response.data);
          setData2(response.data[0]);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    setIsLoading(true);
    fetchData2(u_id);
  };

  useEffect(() => {
    const onScroll = (e) => {
      setScrollAmt(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollAmt]);
  useEffect(() => {
    if (topRef && scrollAmt) {
      var elDistanceToTop =
        window.pageYOffset + topRef.current.getBoundingClientRect().top;
      if (scrollAmt >= elDistanceToTop) {
        setScrollValue("scroll");
      } else {
        setScrollValue("hidden");
      }
    }
  }, [scrollAmt, topRef]);

  return (
    <div className="main-cont flex flex-col justify-center bg-transparent">
      <div className="container sm:w-full max-w-md h-full self-center snap-y snap-mandatory bg-transparent ">
        {isLoading ? (
          <section className="loadingCont flex justify-center items-center h-screen w-full">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin h-28 w-28"
            >
              <path
                d="M100 170C138.66 170 170 138.66 170 100C170 61.3401 138.66 30 100 30C61.3401 30 30 61.3401 30 100C30 138.66 61.3401 170 100 170Z"
                stroke="white"
                strokeWidth="20"
                strokeDasharray="329.87 113.96"
              />
            </svg>
          </section>
        ) : data && !noUser ? (
          <>
            <section className="flex flex-col h-screen w-full items-center snap-always snap-start	text-white ">
              <div className="relative w-full h-full justify-center">
                <div className="flex flex-col justify-end items-center pb-16 relative w-full h-full z-50">
                  <img src={Chevron} className="w-10 mb-7" alt="chevron"></img>
                  <img
                    className="rounded-full w-36 h-36 object-cover bg-black"
                    src={profileImg}
                    alt="profile"
                  ></img>
                  <p className="text-3xl mt-4">{data.metausername}</p>
                </div>
                <img
                  className="h-full w-full absolute -z-10 top-0 left-0 object-cover object-center"
                  src={data.coverMedia}
                  alt="cover"
                ></img>
              </div>
            </section>
            <section className="flex flex-col h-screen w-full justify-center items-center snap-always snap-start text-white ">
              <div className="relative w-full h-screen">
                <div
                  className="relative z-50 py-11 h-screen scr-div"
                  ref={topRef}
                  style={{ overflowY: `${scrollValue}` }}
                >
                  <div className="mb-8 flex justify-center align-center">
                    <img
                      className="rounded-full w-24 h-24 object-cover bg-black"
                      src={profileImg}
                      alt="profile"
                    ></img>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl">{data.metausername}</p>
                    <p className="text-lg font-thin">{data.bioCaption}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="grid grid-cols-2 gap-3 mt-4 px-6">
                      {mediaList &&
                        mediaList.map((item, index) => {
                          return (
                            <img
                              className="w-40 h-56 object-cover rounded-xl cursor-pointer	"
                              src={item[0]}
                              alt="gallery"
                              onClick={() => {
                                window.open(item[1], "_blank");
                              }}
                              key={index}
                            ></img>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {data.backgroundImage ===
                "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg" ? (
                  // <div className="h-full w-full absolute -z-10 top-0 left-0 bg-black"></div>
                  <img
                    className="h-full w-full absolute -z-10 top-0 left-0 object-cover object-center"
                    alt="bg2"
                    src="https://i.pinimg.com/736x/c1/9d/79/c19d7964360a0144b39a0e4b67ca2cfb.jpg"
                  ></img>
                ) : (
                  <img
                    className="h-full w-full absolute -z-10 top-0 left-0 object-cover object-center"
                    src={data.backgroundImage}
                    alt="bg2"
                  ></img>
                )}
              </div>
            </section>
          </>
        ) : (
          <div className="flex justify-center items-center h-screen w-full text-white">
            <p className="mt-10">User does not exist</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
