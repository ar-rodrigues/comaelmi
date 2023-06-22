export default function SvgCross(props){
  const {width, height, fill, strokeLinecap, strokeLinejoin, strokeWidth, classProp } = props

  return(
    <>
    <svg width={width} height={height} viewBox="0 0 32 32" fill={fill} className={classProp} xmlns="http://www.w3.org/2000/svg">
      <path fill={fill} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} strokeWidth={strokeWidth} d="M22.6654 16.9523H16.9511V22.6666H15.0463V16.9523H9.33203V15.0475H15.0463V9.33325H16.9511V15.0475H22.6654V16.9523Z" >
      </path>
    </svg>
    </>
  )
}
