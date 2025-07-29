import { useState } from "react";
import Contact from "./Contact";
import Description from "./Description";
import Document from "./Document";
import FAQs from "./FAQs";
import HitW from "./HitW";
import ProductDeatils from "./ProductDeatils";
import TandC from "./TandC";
import WhyBizBooster from "./WhyBizBooster";

function ProductHome() {
  const [showReview] = useState(false); // State to toggle review page
console.log("showReview", showReview)
const [discountedPrice, setDiscountedPrice] = useState(null); // State to store price from Description

return (
  <div>
    {/* <Carousell /> */}
    <ProductDeatils />
    <Description setDiscountedPrice={setDiscountedPrice} /> 
    <Document />
    <TandC />
    <HitW />
    <FAQs />
    <WhyBizBooster />
    {discountedPrice !== null && <Contact discountedPrice={discountedPrice} />}
  </div>
  );
}

export default ProductHome;
