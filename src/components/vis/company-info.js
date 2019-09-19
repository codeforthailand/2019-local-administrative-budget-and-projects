import axios from "axios"

import React, {useState, useEffect} from "react"
import rd3 from 'react-d3-library'

import bipartite from "d3-bipartite"
import BipartiteGraph from "../../d3-components/bipartite"
import { DESKTOP_MIN_WIDTH, media } from "../../shared/style"

import companyProjectProfiles from "../../data/company_stats"
import { dairyCompanyFilter } from "../../shared/variables"

import utils from "../../utils"

const RD3Component = rd3.Component;


const companies = companyProjectProfiles
  .filter(c => !c.corporate_name.match(dairyCompanyFilter))

const CompanyInfo = () => {
  const [orgProfile, setOrgProfile] = useState(utils.pickRandomly(companies))

  const [d3Dom, setd3Dom] = useState()

  const padding = 10

  const windowWidthHeight = utils.getWindowWidthHeight()
  const scalingFactor = (utils.isMobile() ? 0.3 : 0.5)
  const width = windowWidthHeight.width * scalingFactor
  const height = 300

  const layout = bipartite() 
    .width(width)
    .height(height)
    .padding(padding)
    .source(d => d.source)
    .target(d => d.target)
    .value(d => d.value)

  useEffect(() => {
    const data = orgProfile.projectInsights
      .map( d => {
        return {
          ...d,
          value: d.value / 1e6
        }
      })
    
    const layoutData = layout(data)
    const bd = BipartiteGraph({
      layoutData, width, height
    })

    setd3Dom(bd)
  }, [orgProfile]);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(db.companyProfile(tin))
      
  //     const org = result.data
  //     const dd = {}

  //     org.projects
  //       .forEach(p => {
  //         const k = `${p.purchaseMethod}::${p.province}`
  //         if (k in dd) {
  //           dd[k] += p.projectValue / 1e6
  //         } else {
  //           dd[k] = p.projectValue / 1e6
  //         }
  //       });

  //     const connections = Object.keys(dd).map( k => {
  //       const slugs = k.split("::")
  //       return {
  //           source: slugs[0],
  //           target: slugs[1],
  //           value: dd[k]
  //       }
  //     })

  //     setData(connections)
  //     setOrgProfile(org)

  //   };
  //   fetchData();
  // }, [tin])

  return (
      <div id="company-info"
        css={{
          position: "relative"
        }}
      >
        <div css={{
          textAlign: "center",
          [media(DESKTOP_MIN_WIDTH)]: {
            textAlign: "left"
          }
        }}>
          <div css={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "center",
            [media(DESKTOP_MIN_WIDTH)]: {
              textAlign: "right",
            }
          }} onClick={() =>{ setOrgProfile(utils.pickRandomly(companies)) }}>
            <div css={{
              padding: "5px",
              border: "1px solid",
              cursor: "pointer",
              display: "inline-block",
            }}>
              สุ่มเลือกบริษัทอื่น
            </div>
          </div>
          <div>
            รายละเอียดการรับโครงการของ {` `}
            <span css={{
              textDecoration: "underline",
              display: "block",
              [media(DESKTOP_MIN_WIDTH)]: {
                display: "inline"
              }
            }}>
              { orgProfile.tin &&
                <a style={{color: "black", textDecoration: "none"}}
                  href={`https://datawarehouse.dbd.go.th/company/profile/${orgProfile.tin[3]}/${orgProfile.tin}`} target="_blank" rel="noopener noreferrer">
                    {orgProfile.corporate_name}
                </a>
              }
            </span>
          </div>
        </div>
        <div
          css={{
            marginLeft: `-${width}px`,
            [media(DESKTOP_MIN_WIDTH)]: {
              marginLeft: 0
            }
          }}
        >
          <RD3Component data={d3Dom}/>
        </div>

        <div css={{textAlign: "center"}}>
          { orgProfile.tin && <div style={{textDecoration: "underline", textAlign: "center"}}>
            <a style={{color: "black", textDecoration: "none"}}
               href={`https://govspending.data.go.th/budget?winner=${orgProfile.tin}`} target="_blank" rel="noopener noreferrer">
                ดูโครงการทั้งหมดจาก ภาษีไปไหน?
            </a>
            </div>
          }
        </div>
      </div>
  )
}

export default CompanyInfo