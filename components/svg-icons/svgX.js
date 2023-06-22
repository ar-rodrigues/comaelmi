export default function SvgX(props){
  const {width, height, fill, strokeLinecap, strokeLinejoin, strokeWidth, classProp } = props

  return(
    <>
    <svg style={{ width: width, height: height }} viewBox="0 0 24 24" fill={fill} className={classProp} xmlns="http://www.w3.org/2000/svg">
      <path fill={fill} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} strokeWidth={strokeWidth} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" >
      </path>
    </svg>
    </>
  )
}

