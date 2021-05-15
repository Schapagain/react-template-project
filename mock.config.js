import data from "./db.json";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuid } from "uuid";

export const initializeAxiosMockAdapter = (instance) => {
  const mock = new MockAdapter(instance, { delayResponse: 200 });
  mock.onGet("/albums").reply(({ headers }) => getAlbums(headers));
  mock.onGet("/images").reply(({ headers }) => getImages(headers));
  mock.onGet(/\/album\/\d+/).reply((config) => getAlbum(config));
  mock.onPost("/auth").reply(({ data }) => authenticate(data));
  mock.onPost("/signup").reply(({ data }) => register(data));
  mock
    .onPost(/\/album\/\d+\/upload/)
    .reply((config) => uploadImageToalbum(config));
};
export const getAlbums = (headers) => {
  const token = getTokenFromHeaders(headers);
  return [
    200,
    data?.albums.filter((album) => album.userId == getUserIdFromToken(token)),
  ];
};

export const getImages = (headers) => {
  const token = getTokenFromHeaders(headers);
  return [
    200,
    data?.images.filter((image) => image.userId == getUserIdFromToken(token)),
  ];
};

const sleep = (value) => new Promise((resolve) => setTimeout(resolve, value));

// this mocks a request which slowly resolves (20% progress every 500ms)
async function uploadImageToalbum(config) {
  const total = 1024; // mocked file size
  for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
    await sleep(1000);
    if (config.onUploadProgress) {
      config.onUploadProgress({ loaded: total * progress, total });
    }
  }
  return [200, null];
}

export const getAlbum = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const token = getTokenFromHeaders(config.headers);
  const userId = getUserIdFromToken(token);
  const album = data?.albums.find((c) => c.id == id && c.userId == userId);
  const albumWithImages = album && {
    ...album,
    images: data.images.filter((image) => album.images?.includes(image.id)),
  };
  return [200, albumWithImages];
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
