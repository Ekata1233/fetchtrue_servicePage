function ProductHeader() { 
  return (
    <div>
        
        <div className="relative blue-bg">
        <h2 className="text-white pt-5 ps-5">Fetch True .</h2>

        {/* Bottom Wave SVG with Reduced Height */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,58.7C1200,53,1320,43,1380,37.3L1440,32V100H1380C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100H0Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default ProductHeader