const labelConstant = {
    one: ["ภาพรวมทั้งประเทศ"],
    budget: [
        "฿200M ขึ้นไป",
        "฿100M-200M",
        "฿50M-100M",
        "฿20M-50M",
    ],
    region: [
        "เหนือ",
        "ตะวันตก",
        "ตะวันออกเฉียงเหนือ",
        "ตะวันออก",
        "กลาง",
        "ใต้"
    ],
    totalProjects: [
        "มากกว่า 20",
        "10-20",
        "5-10",
        "1-5 โครงการ",
    ],
    moral: [
        "มากกว่า 30%",
        "",
    ],
    doCivilProjects: [
        "รับโครงการด้านโยธา",
        ""
    ]
}

const db = {
    url: "/data.json"
}

const globalConfig = {
    references: [],
    mainVizPageNo: 5,
    highligthColors: [
        "#eee",
        "#5E5050"
    ],
    vizAtPage: [
        "none",
        "none",
        "none",
        "none",
        "none",
        "circleBlob",
        "circleBlob",
        "circleBlob",
        "none",
    ],
    pageTitles: [
        "ขุมทรัพย์อปท. 7 แสนล้านบาท",
        "มูลค่าการจัดซื้อ-จัดจ้างและรูปแบบการจัดซื้อ",
        "ที่มาเงินทอน",
        "สัดส่วนการใช้งบของอปท.",
        "สัดส่วนการใช้งบของอปท.",
        "นิติบุคคลกับโครงการของอปท.",
        "นิติบุคคลกับโครงการของอปท.",
        "นิติบุคคลกับโครงการของอปท.",
        "สรุป",
    ],
    purchaseMethods: [
        {
            name: 'เฉพาะเจาะจง',
        },
        {
            name: 'ประกวดราคาอิเล็กทรอนิกส์ (e-bidding)',
        },
        {
            name: 'ประกวดราคาด้วยวิธีการทางอิเล็กทรอนิกส์',
        },
        {
            name: 'พิเศษ',
        },
        {
            name: 'คัดเลือก',
        },
        {
            name: 'สอบราคา',
        },
        {
            name: 'จ้างที่ปรึกษาโดยวิธีคัดเลือก',
        },
        {
            name: 'จ้างที่ปรึกษาโดยวิธีประกาศเชิญชวนทั่วไป',
        },
        {

            name: 'จ้างที่ปรึกษาโดยวิธีเฉพาะเจาะจง',
        },
        {
            name: 'ตกลงราคา',
        },
        {
            name: 'ประกวดราคา',
        },
        {
            name: 'กรณีพิเศษ',
        },

    ],
}

const statistics = {
    "part1": {
        "totalGovBudget": 720822 * 1e6,
        "totalProjects": 30000,
        "totalValue": 32768 * 1e6,
        "totalCivilProjectValue": 21252 * 1e6,
        "totalCivilProjects": 12222,
    }
}

export {labelConstant, db, globalConfig, statistics}