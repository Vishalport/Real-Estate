import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property_API } from "../config/config";
import ImageGallery from "react-image-gallery";
import AddFeature from "../components/cards/AddFeature";
// import { NumberFormate } from '../helpers/number';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeDislike from "../components/misc/LikeDislike";
import GoogleMapCard from "../components/cards/GoogleMapCard";
import ContectSeller from "../components/Forms/ContectSeller";
dayjs.extend(relativeTime); // to use the date formate like : [ 3 Hour ago ]

function NumberFormate(x) {
  return x.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const images = [
  {
    original:
      "https://images.pexels.com/photos/12639296/pexels-photo-12639296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/12639296/pexels-photo-12639296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    original:
      "https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    original:
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    thumbnail:
      "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function ViewCard() {
  // state
  const [card, setCard] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params?._id) {
      ShowCared();
    }
  }, [params?._id]);

  const ShowCared = async () => {
    try {
      const { data } = await axios.get(
        `${Property_API}/viewproperty/${params._id}`
      );
      const info = data.result;
      setCard(info);
      console.log("card----------------", info);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container-fluid ">
        <div className="row mt-2">
          <div className="col-lg-4">
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary disable mt-2">
                {card.type} For {card.action}
              </button>
              <LikeDislike card={card} />
            </div>
            <div>
              <br />
              {card?._id ? "✅In market" : "❌Off market"}
            </div>
            <h1>{card.address}</h1>
            <AddFeature card={card} />

            <h3 className="mt-4 h2">Price : $ {card?.price}</h3>
            <br />
            <h5>Posted at : {dayjs(card.createdAt).fromNow()}</h5>
          </div>
          <div className="col-lg-8">
            <ImageGallery items={images} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <GoogleMapCard card={card} />
            <h1>{card.address}</h1>
            <br />
            <hr />
            <div className="container">
              <ContectSeller card={card} />
            </div>
            <br />
            <hr />
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. <br />Lorem ipsum may
              be used as a placeholder before final copy is available. <br />It is
              also used to temporarily replace text in a process called
              greeking, which allows designers to consider the form of a webpage
              or publication, without the meaning of the text influencing the
              design. Lorem ipsum is typically a corrupted version of De finibus
              bonorum et malorum, a 1st-century BC text by the Roman statesman
              and philosopher Cicero, with words altered, added, and removed to
              make it nonsensical and improper Latin.<br /> The first two words
              themselves are a truncation of 'dolorem ipsum' ('pain itself').
              Versions of the Lorem ipsum text have been used in typesetting at
              least since the 1960s, when it was popularized by advertisements
              for Letraset transfer sheets.[1] <br /> Lorem ipsum was introduced to the
              digital world in the mid-1980s, when Aldus employed it in graphic
              and word-processing templates for its desktop publishing program
              PageMaker. Other popular word processors, including Pages and
              Microsoft Word,<br /> have since adopted Lorem ipsum,[2] as have many
              LaTeX packages,[3][4][5] web content managers such as Joomla! and
              WordPress, and CSS libraries such as Semantic UI.[6]
              <br /><br />
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. <br />Lorem ipsum may
              be used as a placeholder before final copy is available. <br />It is
              also used to temporarily replace text in a process called
              greeking, which allows designers to consider the form of a webpage
              or publication, without the meaning of the text influencing the
              design. Lorem ipsum is typically a corrupted version of De finibus
              bonorum et malorum, a 1st-century BC text by the Roman statesman
              and philosopher Cicero, with words altered, added, and removed to
              make it nonsensical and improper Latin.<br /> The first two words
              themselves are a truncation of 'dolorem ipsum' ('pain itself').
            </p>
          </div>
        </div>
      </div>

      <br /><br /><br /><hr />
      <div className="container-fluid">
        <h1 className="text-center" >Related Property</h1>
      </div>
      <hr />


      {/* <ViewCard/>  */}
      {/* {JSON.stringify(card)} */}
    </div>
  );
}
