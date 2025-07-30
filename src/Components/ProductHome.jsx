import { useState } from "react";
import Contact from "./Contact";
import Description from "./Overview";
import Document from "./Document";
import FAQs from "./FAQs";
import HitW from "./HitW";
import ProductDeatils from "./ProductDeatils";
import TandC from "./TandC";
import WhyBizBooster from "./WhyBizBooster";
import Benifits from "./Benifits";
import Highlight from "./Highlight";

function ProductHome() {
  
  const [showReview] = useState(false); // State to toggle review page
console.log("showReview", showReview)
const [discountedPrice, setDiscountedPrice] = useState(null); // State to store price from Description

return (
  <div>
    {/* <Carousell /> */}
    <ProductDeatils />
    <Benifits/>
    <Description /> 
    <Highlight/>
    <WhyBizBooster/>
    <Document />
    <TandC />
    <HitW />
   
   
     <FAQs />
    {/* <Contact/> */}
  </div>
  );
}

export default ProductHome;
