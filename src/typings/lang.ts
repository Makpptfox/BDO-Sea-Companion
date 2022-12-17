
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
}

export default langDict;