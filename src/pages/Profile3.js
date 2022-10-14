import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chevron from "../img/chevron.svg";

const Profile3 = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coverImg, setCoverImg] = useState("");
  const [mediaList, setMediaList] = useState([]);

  const u_name = id;
  const baseURL1 =
    "https://bodegaproduction.azurewebsites.net/bodegaPublicURL/";
  const baseURL2 =
    "https://bodegaproduction.azurewebsites.net/searchBPL/metausername/";
  const baseURL3 =
    "https://bodegaproduction.azurewebsites.net/bodega-api/filterMetaUserTags/";
  const checkStr = "3c426c.jpeg";

  const tempData = [
    {
      id: 1,
      metausername: "rahul",
      bioCaption: "",
      subscriptionButton: false,
      yerrrButton: false,
      backgroundImage:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      backgroundColor: "TRANSPARENT",
      profileImage: null,
      coverMedia:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media1:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media2:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media3:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media4:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media5:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media6:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media7:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media8:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media9:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media10:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media11:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media12:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media13:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media14:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media15:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      altText1: "",
      altText2: "",
      altText3: "",
      altText4: "",
      altText5: "",
      altText6: "",
      altText7: "",
      altText8: "",
      altText9: "",
      altText10: "",
      altText11: "",
      altText12: "",
      altText13: "",
      altText14: "",
      altText15: "",
      caption1: "",
      caption2: "",
      caption3: "",
      caption4: "",
      caption5: "",
      caption6: "",
      caption7: "",
      caption8: "",
      caption9: "",
      caption10: "",
      caption11: "",
      caption12: "",
      caption13: "",
      caption14: "",
      caption15: "",
      created_at: "2022-10-11",
      modified_at: "2022-10-11T02:25:02.441435-05:00",
      ownerMetaUserID: 1,
    },
    {
      id: 2,
      metausername: "rahul",
      bioCaption: "beta tester",
      subscriptionButton: false,
      yerrrButton: false,
      backgroundImage:
        "https://projectbodegadb.blob.core.windows.net/media/bodegaMerchant/bodegaPublicURL/contentPage/backgroundImage/516A4015-0132-49A6-8863-835EC_IyicIH9.png",
      backgroundColor: "black",
      profileImage: null,
      coverMedia:
        "https://projectbodegadb.blob.core.windows.net/media/bodegaMerchant/bodegaPublicURL/contentPage/media1/B1455609-4E49-4A2D-801B-A8ED9C52ABCD__.png",
      media1:
        "https://projectbodegadb.blob.core.windows.net/media/bodegaMerchant/bodegaPublicURL/contentPage/media1/E1EDA3BC-DCE0-411A-8FB3-275DF530B533__.png",
      media2:
        "https://projectbodegadb.blob.core.windows.net/media/bodegaMerchant/bodegaPublicURL/contentPage/media2/99175903-B710-45B3-A861-B2E8103EE93C__.png",
      media3:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media4:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media5:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media6:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media7:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media8:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media9:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media10:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media11:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media12:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media13:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media14:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      media15:
        "https://projectbodegadb.blob.core.windows.net/media/8954256a-cc48-4d73-a863-5c8ebe3c426c.jpeg",
      altText1: "",
      altText2: "",
      altText3: "",
      altText4: "",
      altText5: "",
      altText6: "",
      altText7: "",
      altText8: "",
      altText9: "",
      altText10: "",
      altText11: "",
      altText12: "",
      altText13: "",
      altText14: "",
      altText15: "",
      caption1: "https://instagram.com/sudo.88",
      caption2: "https://trillmrkt.com",
      caption3: "",
      caption4: "",
      caption5: "",
      caption6: "",
      caption7: "",
      caption8: "",
      caption9: "",
      caption10: "",
      caption11: "",
      caption12: "",
      caption13: "",
      caption14: "",
      caption15: "",
      created_at: "2022-10-11",
      modified_at: "2022-10-11T11:08:06.151081-05:00",
      ownerMetaUserID: 2,
    },
  ];

  useEffect(() => {
    console.log("this is tempData", tempData);
    console.log(typeof tempData);
    setData(tempData[0]);
    console.log("this is data", data);
  }, []);

  useEffect(() => {
    console.log("mediaList: ", mediaList);
  }, [mediaList]);

  useEffect(() => {
    if (data && data.media1) {
      setCoverImg(data.coverMedia);
      console.log("CoverImg is: ", coverImg);

      const tempList = [];
      const tempList2 = [];
      tempList.push(data.media1);
      tempList.push(data.media2);
      tempList.push(data.media3);
      tempList.push(data.media4);
      tempList.push(data.media5);
      tempList.push(data.media6);
      tempList.push(data.media7);
      tempList.push(data.media8);
      tempList.push(data.media9);
      tempList.push(data.media10);
      tempList.push(data.media11);
      tempList.push(data.media12);
      tempList.push(data.media13);
      tempList.push(data.media14);
      tempList.push(data.media15);

      tempList.forEach((x) => {
        if (!x.includes(checkStr)) {
          tempList2.push(x);
        }
      });
      setMediaList(tempList2);
    }
  }, []);

  useEffect(() => {
    if (data && data.id) {
      fetchData2(data.ownerMetaUserID);
      console.log(data2);
    }
  }, [data]);

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
          console.log(data2);
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchData2(u_id);
  };

  return (
    <div class="flex flex-col justify-center bg-black">
      <div class="container sm:w-full max-w-md h-full self-center snap-y snap-mandatory	">
        {data && data !== "" ? (
          <>
            <section class="flex flex-col justify-end h-screen w-full items-center bg-emerald-500 snap-start	">
              <div class="flex flex-col justify-center items-center	 pb-20">
                <img src={Chevron} alt="Chevron Logo" class="w-10 mb-7"></img>
                <img class="rounded-full w-36" src={data.coverMedia}></img>
                <p class="text-4xl mt-6">{data.metausername}</p>
              </div>
            </section>
            <section
              class="flex flex-col h-screen w-full justify-start items-center py-11 bg-red-500 overflow-y-scroll snap-start	"
              style={{ backgroundImage: `url: (${coverImg})` }}
              // background={data.coverMedia != "" ? data.coverMedia : ""}
            >
              {/* <div></div>
              <div> */}
              <div class="mb-8">
                <img
                  class=" cover-img rounded-full"
                  src={data.coverMedia}
                ></img>
              </div>
              <div class="flex flex-col">
                <p class="text-3xl">{data.metausername}</p>
                <p class="text-2xl">{data.bioCaption}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-9 px-6">
                {/* {mediaList && mediaList.map((item) => {
                  return <img class="w-44 h-56 object-cover rounded-xl" src={item}></img>;
                })} */}
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media1}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media2}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media3}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media4}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media5}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media6}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media7}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media8}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media9}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media10}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media11}
                ></img>
                <img
                  class="w-44 h-56 object-cover rounded-xl"
                  src={data.media12}
                ></img>
              </div>
              {/* </div> */}
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

export default Profile3;
