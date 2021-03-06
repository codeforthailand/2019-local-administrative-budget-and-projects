import * as d3 from "d3"

/*
input: budget (in millions)
*/
const budget2category = (budget) => {
    if (budget >= 100) {
        return 0
    } else if (budget >= 50 && budget < 100) {
        return 1
    } else if (budget >= 35 && budget < 50) {
        return 2
    } else if (budget >= 20 && budget < 35) {
        return 3
    }
}

const projectCount2Cat = (c) => {
    if(c >=20){
        return 0
    } else if (c >= 10 && c < 20) {
        return 1
    } else if (c >= 5 && c < 10) {
        return 2
    } else if (c >= 1 && c < 5) {
        return 3
    }
}


const generateBubbleData = ({numNodes}) => {
    console.log('generating bubble data')

    const data = d3.range(1)
        .map( d => {
            return { size: 320000000 }
        })
        .concat(d3.range(15).map(d => {
            return { size: Math.random() * 200000000 + 100000000 }}
        ))
        .concat(d3.range(41).map(d => { 
            return { size: Math.random() * 50000000 + 50000000 }}
        ))
        .concat(d3.range(175).map(d => {
            return { size: Math.random() * 30000000 + 20000000}
        }))

    return data.map( (d, i) => {
        const size = d["size"] / 1e6
        return {
            oneCategory: 0,
            budgetCategory: budget2category(size),
            regionCategory: i % 6,
            totalProjectCategory: Math.ceil(i + Math.random()*2) % 4,
            size: size,
            ratio: Math.random()
        }
    })
}


export {generateBubbleData, budget2category, projectCount2Cat}