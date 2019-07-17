# Global Statistics
Data Structure:
```
    "part1": {
        "totalGovBudget": 720822 * 1e6,
        "totalProjects": 92137,
        "totalValue": 32768 * 1e6,
        "totalCivilProjectValue": 21252 * 1e6,
        "totalCivilProjects": 30634,
        "totalOrgs": 10000, // this is a mock data, [TODO] need data
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
```

# Top Companies Statistics (for front page)
Filename: `data.json`

Data Structure:

```
{
    setting: {
        minTotalProjectValues: int, // use for displying why we pick these companies
    }, 
    companies: [
        {
            name: str,
            tin: str,
            primaryRegion: str, // i.e. เหนือ กลาง ..., computed from project -> อปท. -> region then take region with max count
            totalProjectValue: int // 
            totalProjects: int // 
            purchaseMethodCount: { 
                "e-bidding": int, 
                ...  // only include what the company has, frontend will handle non-existing key case
            }
            doCivilProjects: [yes/no] // yes when the company has at least such a project
        },
        ...
    ]

}
```

# Company Profile (for org page), approx. 2xx files will be generated
These companies are ones that we include in data.json

Filename: `<tin>.json`

Data Structure:
```
{
    name: str,
    tin: str,
    totalProjects: int,
    projects: [ // sorted by projectValue
        {
            projectId: str, 
            projectName: str,
            localAuthority: str,
            province: str,
            projectValue: int,
            purchaseMethod: str,
        },
        ...
    ]
}
```