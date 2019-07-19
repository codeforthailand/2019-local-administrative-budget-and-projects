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
        "red"
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
        "มูลค่าการจัดซื้อ-จัดจ้าง",
        "ที่มาเงินทอน",
        "สัดส่วนรายได้ของ อปท.",
        "คอนกรีต - ลูกรัง ซ่อมสร้างไม่รู้จบ",
        "บริษัทที่มีขีดความสามารถในการได้งานอปท.",
        "นิยามโยธา",
        "คลิกดูรายภาคและรายบริษัท",
        "ผู้จัดทำ",
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
        "totalProjects": 92137,
        "totalValue": 32768 * 1e6,
        "totalCivilProjectValue": 21252 * 1e6,
        "totalCivilProjects": 30634,
        "totalOrgs": 10000, // this is a mock data
    },
    "part4": {
        "budgetPortions": [
            {
                "name": "รายได้ที่ อปท. จัดหาเอง",
                "amount": 112000
            },
            {
                "name": "รายได้ที่รัฐบาลเก็บให้และแบ่งให้",
                "amount": 229900 
            },
            {
                "name": "ภาษีมูลค่าเพิ่มที่รัฐบาลแบ่งให้  (ตาม พ.ร.บ. กำหนดแผนฯ)",
                "amount": 115000 
            },
            {
                "name": "เงินอุดหนุน",
                "amount": 263922 
            },
        ]
    }
}

export {labelConstant, db, globalConfig, statistics}