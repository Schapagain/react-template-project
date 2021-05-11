import data from "./db.json";
import MockAdapter from "axios-mock-adapter";

export const initializeAxiosMockAdapter = (instance) => {
  const mock = new MockAdapter(instance, { delayResponse: 200 });
  mock.onGet("/collections").reply(({ headers }) => getCollections(headers));
  mock.onGet(/\/collection\/\d+/).reply((config) => getCollection(config));

  mock.onPost("/auth").reply(({ data }) => authenticate(data));
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
  } else throw new Error("Invalid Credentials!");
};

const getUserIdFromToken = (token) => token?.split("-").pop();

const getTokenFromHeaders = (headers) =>
  headers?.Authorization?.split(" ").pop();
