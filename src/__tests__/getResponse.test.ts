import { getResponse } from "../core/server";

describe('getResponse',()=>{

    const endpoints = [
        {
            method:"GET",
            path:"/users",
            response:{
                users:[
                    {id:1,name:"Adi"},
                    {id:2,name:"Kohli"}
                ]
            },
            status:200
        },
    ]

    test('returns correct response for matching endpoints.',()=>{
        expect(getResponse(endpoints,'GET','/users')).toStrictEqual({users:[
                    {id:1,name:"Adi"},
                    {id:2,name:"Kohli"}
                ]});
    })

    test("returns undefined if no endpoint matches",()=>{
        expect(getResponse(endpoints,'GET','/doesnt/exist')).toBe(undefined)
    });
})