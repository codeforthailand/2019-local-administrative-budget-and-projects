const array2lookup = (arr) => {
    let d = {}
    arr.forEach( (e, i) => {
      d[e] = i 
    });

    return d
}

export {array2lookup}