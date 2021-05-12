import data from "./db.json";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuid } from "uuid";

export const initializeAxiosMockAdapter = (instance) => {
  const mock = new MockAdapter(instance, { delayResponse: 200 });
  mock.onGet("/collections").reply(({ headers }) => getCollections(headers));
  mock.onGet(/\/collection\/\d+/).reply((config) => getCollection(config));
  mock.onPost("/auth").reply(({ data }) => authenticate(data));
  mock.onPost("/signup").reply(({ data }) => register(data));
};
export const getCollections = (headers) => {
  const token = getTokenFromHeaders(headers);
  return [
    200,
    data?.collections.filter(
      (collection) => collection.userId == getUserIdFromToken(token)
    ),
  ];
};
export const getCollection = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const token = getTokenFromHeaders(config.headers);
  const userId = getUserIdFromToken(token);
  const collection = data?.collections.find(
    (c) => c.id == id && c.userId == userId
  );
  const collectionWithImages = collection && {
    ...collection,
    images: data.images.filter((image) =>
      collection.images?.includes(image.id)
    ),
  };
  return [200, collectionWithImages];
};

const extractIdPathParamFromUrl = (config) => {
  return config.url.split("/").pop();
};

const authenticate = (user) => {
  const { username, password } = JSON.parse(user || "");
  const validUser = data.users?.find((user) => user.username === username);
  if (validUser && validUser.password === password) {
    return [
      200,
      {
        token: `token-for-user-${validUser.id}`,
        user: {
          username: "admin",
        },
      },
    ];
  } else return [400, { error: "Not Authorized" }];
};

const register = (user) => {
  const { username, password } = JSON.parse(user || "{}");
  if (!username || username.length < 4)
    return [
      400,
      {
        error: "Username too short",
        field: "username",
      },
    ];
  if (usernameExists(username)) {
    return [
      401,
      {
        error: "Username already exists",
        field: "username",
      },
    ];
  }
  if (!password || password.length < 5)
    return [
      400,
      {
        error: "Password too short",
        field: "password",
      },
    ];

  return [
    201,
    {
      id: uuid(),
      username,
    },
  ];
};

const usernameExists = (username) => {
  return !!data.users.find((u) => u.username === username);
};

const getUserIdFromToken = (token) => token?.split("-").pop();

const getTokenFromHeaders = (headers) =>
  headers?.Authorization?.split(" ").pop();
