const {SchemaTypes, SchemaTypeOptions, version} = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const schema = require('./schemas/cityschema');

const options = {
    definition: {
        openapi: '3.0.3',
        info:{
            title: "Swagger API Docxx - OpenAPI 3.0",
            description: "This is a sample API for city & cars list in Karnataka",
            contact:{
                name: "Nitish Mathapati",
                email: "ntshmathapati2003@gmail.com"
            },
            version: '24.2.22'
        },
        externalDocs:{
            url: "https://editor.swagger.io/",
            description: "Find out more about SwaggerEditor"
        },
        servers:[
            {
            url:"http://localhost:2025"
            },
            {
            url:"http://localhost:3000" 
            }
        ],
        tags:[
            {
                name: "Cities",
                description: "Everything about cities",
                externalDocs: {
                    description: "City",
                    url: "https://www.bankbazaar.com/pin-code/karnataka.html"
                }
            },
            {
                name: "Foods",
                description: "Everything about food of particular city",
                externalDocs: {
                    description: "Food"
                }
            },
            {
                name: "Locations",
                description: "Everything about locations of particular city",
                externalDocs: {
                    description: "Location"
                }
            },
            {
                name: "Day Plans",
                description: "Choose day plans",
                externalDocs: {
                    description: "Location"
                }
            }
        ],
        security:[
            {
                api_key:[]
            },
            {
                Swagger_auth:[
                    'write:cities',
                    'read:cities'
                ]
            }
        ],
        paths:{
            '/city':{
                get:{
                    tags:[
                        "Cities"
                    ],
                    summary: "Welcome",
                    description: "A simple greeting message from the server",
                    responses:{
                        '200': {
                            description: "Successful Response",
                            content: {
                                'application/json':{
                                    schema:{
                                        type:'string',
                                        // example: "Hey hi..! welcome to my server"
                                    }
                                }
                            }
                        },
                        '400':{
                            content:{
                                'application/json':{
                                    schema:{
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
            },
            '/city/addcity':{
                post:{
                    tags:[
                        "Cities"
                    ],
                    summary: "Add city",
                    description: "Add a new city to the database",
                    operationId: "addcity",
                    requestBody:{
                        description: "Add a new city to the database through swaggerAPI",
                        content:{
                            'application/json':{
                                schema:{
                                    $ref: "#/components/schemas/cities"
                                }
                            }
                        },
                        required:true
                    },
                    responses:{
                        '200':{
                            description: "Successfully added to database",
                            content:{
                                'applicaiton/json':{
                                    schema:{
                                        $ref: "#/components/schemas/cities"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "Oopss..! Something went wrong"
                        },
                        security:{
                            Swagger_auth:[
                                'read:cities',
                                'write.cities'
                            ]
                        }
                    }
                }
            },
            '/city/getcity':{
                get:{
                    tags:[
                        "Cities"
                    ],
                    summary: "read city",
                    description: "read the city from the database",
                    operationId: "readcity",
                    responses: {
                        '200':{
                            description: "List of all cities",
                            content: {
                                'application/json':{
                                    schema:{
                                        type: "object",
                                        properties: {
                                            data: {
                                                type: 'array',
                                                items: {
                                                    $ref: "#/components/schemas/cities"
                                                }
                                            },
                                            message: {
                                                type: 'string',
                                                example: "All city details"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "Internal server error"
                        }
                    }
                }
            },
            '/city/getcitybyname/{city_name}':{
                get:{
                    tags:[
                        "Cities"
                    ],
                    summary: "Find city by name",
                    description: "Returns a single city",
                    operationId: "getCityByName",
                    parameters:[{
                        name: "city_name",
                        in: "path",
                        description: "Name of city to return",
                        required:true,
                        schema:{
                            $ref :"#/components/schemas/cities/properties/city_name"
                        }
                    }],
                    responses:{
                        '200':{
                            description: "Successful Operation",
                            content: {
                                'application/json':{
                                    schema:{
                                        $ref: "#/components/schemas/cities"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "City not found"
                        }
                    },
                }
            },
            '/city/updatecitybyname/{city_name}':{
                put:{
                    tags:["Cities"],
                    summary: "Update by city",
                    description: "Updates the details of present city",
                    parameters: [{
                        name: "city_name",
                        in: "path",
                        description: "Update the city and pincode to update",
                        required:true,
                        schema:{
                            $ref: "#/components/schemas/cities/properties/city_name"
                        }
                    }],
                    requestBody:{
                        description: "Add a new city to the database through swaggerAPI",
                        content:{
                            'application/json':{
                                schema:{
                                    $ref: "#/components/schemas/cities"
                                }
                            }
                        },
                        required:true
                    },
                    responses:{
                        '200':{
                            description: "Successful Operation",
                            content: {
                                'application/json':{
                                    schema:{
                                        $ref: "#/components/schemas/cities"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "City not found"
                        }
                    }
                }
            },
            '/city/deletebyname/{city_name}':{
                delete:{
                    tags:["Cities"],
                    summary: "Delete City",
                    description: "Delete the city by its name",
                    parameters: [{
                        name: "city_name",
                        in: "path",
                        description: "Update the city and pincode to update",
                        required:true,
                        schema:{
                            $ref: "#/components/schemas/cities/properties/city_name"
                        }
                    }],
                    responses:{
                        '200':{
                            description: "Successful Operation",
                            content: {
                                'application/json':{
                                    schema:{
                                        $ref: "#/components/schemas/cities"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "City not found"
                        }
                    }
                }
            },
            '/city/food/{city_name}':{
                get:{
                    tags:[
                        "Foods"
                    ],
                    summary: "Find food ",
                    description: "Returns all food of particular city",
                    operationId: "food",
                    parameters:[{
                        name: "city_name",
                        in: "path",
                        description: "Name of city to return foods",
                        required:true,
                        schema:{
                            $ref :"#/components/schemas/cities/properties/city_name"
                        }
                    }],
                    responses:{
                        '200':{
                            description: "Successful Operation",
                            content: {
                                'application/json':{
                                    schema:{
                                        $ref: "#/components/schemas/foods"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "City not found"
                        }
                    },
                }
            },
            '/city/place/{city_name}':{
                get:{
                    tags:[
                        "Locations"
                    ],
                    summary: "Find Place",
                    description: "Returns all places of particular city",
                    operationId: "place",
                    parameters:[{
                        name: "city_name",
                        in: "path",
                        description: "Name of city to return foods",
                        required:true,
                        schema:{
                            $ref :"#/components/schemas/cities/properties/city_name"
                        }
                    }],
                    responses:{
                        '200':{
                            description: "Successful Operation",
                            content: {
                                'application/json':{
                                    schema:{
                                        $ref: "#/components/schemas/locations"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "City not found"
                        }
                    },
                }
            },
            '/city/onedayplan/{city_name}':{
                get:{
                    tags:[
                        "Day Plans"
                    ],
                    summary: "One-day Plan",
                    description: "Returns all places of particular city for one day trip",
                    operationId: "place",
                    parameters:[{
                        name: "city_name",
                        in: "path",
                        description: "Name of city to return foods",
                        required:true,
                        schema:{
                            $ref :"#/components/schemas/cities/properties/city_name"
                        }
                    }],
                    responses:{
                        '200':{
                            description: "Successful Operation",
                            content: {
                                'application/json':{
                                    schema:{
                                        $ref: "#/components/schemas/locations"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "City not found"
                        }
                    },
                }
            },
            '/city/twodaysplan/{city_name}':{
                get:{
                    tags:[
                        "Day Plans"
                    ],
                    summary: "Two-days Plan",
                    description: "Returns all places of particular city for two days trip",
                    operationId: "place",
                    parameters:[{
                        name: "city_name",
                        in: "path",
                        description: "Name of city to return foods",
                        required:true,
                        schema:{
                            $ref :"#/components/schemas/cities/properties/city_name"
                        }
                    }],
                    responses:{
                        '200':{
                            description: "Successful Operation",
                            content: {
                                'application/json':{
                                    schema:{
                                        $ref: "#/components/schemas/locations"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "City not found"
                        }
                    },
                }
            },
            '/city/threedaysplan/{city_name}':{
                get:{
                    tags:[
                        "Day Plans"
                    ],
                    summary: "Three-days Plan",
                    description: "Returns all places of particular city for three days trip",
                    operationId: "place",
                    parameters:[{
                        name: "city_name",
                        in: "path",
                        description: "Name of city to return foods",
                        required:true,
                        schema:{
                            $ref :"#/components/schemas/cities/properties/city_name"
                        }
                    }],
                    responses:{
                        '200':{
                            description: "Successful Operation",
                            content: {
                                'application/json':{
                                    schema:{
                                        $ref: "#/components/schemas/locations"
                                    }
                                }
                            }
                        },
                        '400':{
                            description: "City not found"
                        }
                    },
                }
            }
        },
        components:{
            schemas: {
                cities:{                   // Schema 1
                    required:[
                        "city_name",
                        "pincode"
                    ],
                    type: "object",             
                    properties:{
                        city_name:{
                            type:'string',
                            example:"Kalaburgi"
                        },
                        state:{
                            type:'string',
                            example:"Karnataka"
                        },
                        pincode:{
                            type:'number',
                            example:585105
                        }
                    }
                },
                foods:{
                    required:[
                        "city_name",
                        "food",
                        "description"
                    ],
                    type: "object",
                    properties:{
                        city_name:{
                            type:'string',
                            example: "Kalaburgi"
                        },
                        food:{
                            type:'string',
                            example:"Rotti"
                        },
                        description:{
                            type:'string',
                            example:"It is made up of jawar"
                        }
                    }
                },
                locations:{
                    required:[
                        "city_name",
                        "locationName",
                        "description",
                        "time"
                    ],
                    type:"object",
                    properties:{
                        city_name:{
                            type:'string',
                            example:"Kalaburgi"
                        },
                        locationName:{
                            type:'string',
                            example:"Temple"
                        },
                        description:{
                            type:'string',
                            example:"Hindu temple"
                        },
                        time:{
                            type:'number',
                            example:120
                        }
                    }
                }
            },
            requetBodies:{
                cities:{
                    description:"City object that needs to be added to the server",
                    content:{
                        'application/json':{
                            schema:{
                                $ref: '#/components/schemas/cities'
                            }
                        }
                    }
                }
            },
            securitySchemes:{
                Swagger_auth:{
                    type:'oauth2',
                    flows:{
                        implicit:{
                            authorizationUrl: "http://localhost:4000/oauth/authorize",
                            tokenUrl: 'http://localhost:4000/oauth/token',
                            scopes:{
                                'read:cities': "Read city information",
                                'write:cities': "Modify city information"
                            }
                        }
                    }
                },
                api_key: {
                    type: "apiKey",             // apiKey: case sensitive (K should be uppercase)
                    name: "api_key",
                    in: "header"
                }
            }
        }
    },
    apis:['./index.js'], //Path to the file where APIs are defined
};

const swaggerDocs = swaggerJsDoc(options);
module.exports = {swaggerDocs};