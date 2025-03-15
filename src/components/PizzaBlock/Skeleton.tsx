import React from "react"
import ContentLoader from "react-content-loader"

interface MyLoaderProps {
   className?: string;
   speed?: number;
   width?: number;
   height?: number;
   viewBox?: string;
   backgroundColor?: string;
   foregroundColor?: string;
}

const MyLoader: React.FC<MyLoaderProps> = (props) => (
   <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={453}
      viewBox="0 0 280 453"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
   >
      <circle cx="127" cy="127" r="127" />
      <rect x="0" y="263" rx="10" ry="10" width="280" height="23" />
      <rect x="0" y="304" rx="10" ry="10" width="280" height="82" />
      <rect x="4" y="403" rx="15" ry="15" width="90" height="27" />
      <rect x="127" y="395" rx="20" ry="20" width="152" height="43" />
   </ContentLoader>
)

export default MyLoader

