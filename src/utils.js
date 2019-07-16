import * as d3 from "d3-format"

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

export default utils