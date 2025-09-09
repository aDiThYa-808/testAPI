import { getStatusCode } from "../core/server";

describe("getStatusCode", () => {
  const endpoints = [
    {
      method: "GET",
      path: "/users",
      response: {
        id: 123,
        name: "adi",
      },
      status: 200,
    },
    {
      method: "GET",
      path: "/products",
      response: {
        id: 123,
        name: "bat",
      },
    },
  ];

  test('return valid status code for matching endpoints',()=>{
    expect(getStatusCode(endpoints,'GET','/users')).toBe(200);
  });

  test('returns undefined if status code is not mentioned',()=>{
    expect(getStatusCode(endpoints,'GET','/products')).toBe(undefined);
  })

  test('returns undefined if there is no match',()=>{
    expect(getStatusCode(endpoints,'GET','/doesnt/exist')).toBe(undefined);
  });
});
