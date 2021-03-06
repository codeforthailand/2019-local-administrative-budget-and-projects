import * as d3 from "d3-format"
import { DESKTOP_MIN_WIDTH, MOBILE_CONTENT_PADDING } from "./shared/style"

const utils = {}

utils.array2lookup = (arr) => {
    let d = {}
    arr.forEach( (e, i) => {
      d[e] = i 
    });

    return d
}

utils.defaultLocationSearch = () => {
  if(typeof window !== 'undefined' && window) {
    return "" // useQueryParam will parse query params automatically
  } else {
    console.log("defaultLocation:dumy")
    return "?dummy-param"
  }
}

utils.numFormatInt = d3.format(",")
utils.numFormatFloat = d3.format(",.2f")
utils.moneyFormat = (d) => `${utils.numFormatFloat(d)} ล้านบาท`

utils.getWindowObj = () => {
  if(typeof window !== `undefined` &&  window){
    return window
  } else {
    return {}
  }
}

utils.getWindowWidthHeight = () => {
  if(typeof window !== 'undefined' && window) {
    return {
      width: Math.min(window.outerWidth, DESKTOP_MIN_WIDTH),
      height: window.outerHeight
    }
  } else {
    return {
      width: 0,
      height: 0
    }
  }
}

utils.getWidth = () => {
  const windowSize = utils.getWindowWidthHeight()
  if(utils.isMobile()){
    return windowSize.width * 0.8 - 2*MOBILE_CONTENT_PADDING 
  } else {
    return windowSize.width
  }
}

utils.isMobile = () => {
  const size = utils.getWindowWidthHeight()
  return size.width < DESKTOP_MIN_WIDTH
}

utils.pickRandomly = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default utils