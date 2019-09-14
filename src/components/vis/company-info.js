import axios from "axios"

import React, {useState, useEffect} from "react"
import rd3 from 'react-d3-library'

import bipartite from "d3-bipartite"
import BipartiteGraph from "../../d3-components/bipartite"
import { DESKTOP_MIN_WIDTH, MOBILE_CONTENT_PADDING, media } from "../../shared/style"


import utils from "../../utils"

import {db} from "../../constant"

const RD3Component = rd3.Component;

const CompanyInfo = ({tin="0107537002753"}) => {
  const [orgProfile, setOrgProfile] = useState({})

  const [d3Dom, setd3Dom] = useState()
  const [data, setData]= useState([])
  const [topKProjects, setTopKProjects]= useState([])

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
    const layoutData = layout(data)
    const bd = BipartiteGraph({
      layoutData, width, height
    })

    setd3Dom(bd)
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(db.companyProfile(tin))
      
      const org = result.data
      console.log(org)

      const dd = {}

      org.projects
        .forEach(p => {
          const k = `${p.purchaseMethod}::${p.province}`
          if (k in dd) {
            dd[k] += p.projectValue / 1e6
          } else {
            dd[k] = p.projectValue / 1e6
          }
        });

      const connections = Object.keys(dd).map( k => {
        const slugs = k.split("::")
        return {
            source: slugs[0],
            target: slugs[1],
            value: dd[k]
        }
      })

      setData(connections)
      setOrgProfile(org)

      const k = Math.min(3, org.projects.length)
      const topProjects = org.projects
        .slice()
        .sort( (a, b) => b.sum_price_agree - a.sum_price_agree)
        .slice(0, k)

      setTopKProjects(topProjects)

    };
    fetchData();
  }, [])

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
            margin: "0px auto",
            padding: "5px",
            border: "1px solid",
            width: "auto",
            display: "inline-block",
            marginBottom: "10px",
            [media(DESKTOP_MIN_WIDTH)]: {
              marginBottom: "0px",
              position: "absolute",
              top: "-5px",
              right: "0px",
            }
          }}>
            สุ่มเลือกบริษัทอื่น
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
              {orgProfile.name}
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

        {/* <div>
          <div style={{fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", marginTop: "0"}}>
            
          </div>
          { orgProfile.projects &&  <span>
              ได้รับโครงการจากอปท.ต่างๆ ทั้งสิ้น {orgProfile.projects.length} โครงการ
              {` `}ซึ่งรวมมูลค่าทั้งหมด {utils.moneyFormat(orgProfile.projects.map(p => p.projectValue).reduce( (a,b) => a+b, 0)/1e6)}
              {` `}โดยโครงการที่มีมูลค่าสูงสุด {topKProjects.length} อันดับแรก คือ 
              <ul>
                {
                  topKProjects.map(p => {
                    return <li key={p.projectName} alt={p.projectName}>
                      <a style={{color: "black", textDecoration: "none"}}
                        href={`https://govspending.data.go.th/budget?tgsp=${p.projectId}`} target="_blank" rel="noopener noreferrer"
                      >
                        <b>{ Sugar.String.truncate(p.projectName, 60) }</b> <br/>
                        กับ {p.localAuthority}, {p.province} {` `} <br/>
                        โดยรูปแบบ {p.purchaseMethod} <br/>
                        มูลค่าโครงการ {utils.moneyFormat(p.projectValue/1e6)}<br/>
                      </a>
                      </li>
                  })
                }
              </ul> 
          </span>
          }

        </div>  */}
        <div css={{textAlign: "center"}}>
          { orgProfile.tin && <div style={{textDecoration: "underline", textAlign: "center"}}>
            <a style={{color: "black", textDecoration: "none"}}
              href={`https://datawarehouse.dbd.go.th/company/profile/${orgProfile.tin[3]}/${orgProfile.tin}`} target="_blank" rel="noopener noreferrer">
                ดูข้อมูลเพิ่มเติมของนิติบุคคลนี้จากกรมการค้าภายใน
            </a> <br/>
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