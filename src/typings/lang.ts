
type langDict = {
    pageTitle: [
        {
            [key:string]:  [
                string
            ];
        }
    ]
    navigation: [
        {
            barter: [
                string
            ];
            carrack:  [
                string
            ];
        }
    ]
    items: [
        {
            [key:string]:  [
                {
                    name: [
                        string
                    ]
                    description: [
                        string
                    ]
                }
            ]

        }
    ]
    barter: [
        {
            left:[
                {
                    storageTitle: [
                        string
                    ]
                }
            ]
            table:[
                {
                    name: [
                        string
                    ]
                    tier: [
                        string
                    ]
                    qty: [
                        string
                    ]
                }
            ]
        }
    ]
}

export default langDict;