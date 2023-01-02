

type carrackDict = {
    boat: [
        {
            advance: [
                {
                    image: [
                        string
                    ],
                    need: [
                        {
                            [key: string]: [
                                {
                                    quantity: [
                                        string
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            balance: [
                {
                    image: [
                        string
                    ],
                    need: [
                        {
                            [key: string]: [
                                {
                                    quantity: [
                                        string
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            volante: [
                {
                    image: [
                        string
                    ],
                    need: [
                        {
                            [key: string]: [
                                {
                                    quantity: [
                                        string
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            valor: [
                {
                    image: [
                        string
                    ],
                    need: [
                        {
                            [key: string]: [
                                {
                                    quantity: [
                                        string
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            [key: string]: [
                {
                    image: [
                        string
                    ],
                }
            ]
        }
    ]
}

export default carrackDict;