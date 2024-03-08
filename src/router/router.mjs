import { Router } from "express";
import { users } from "../data/userData.mjs";

const router = Router();

router.get("/api/auth/status", (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send('Not Authenticated');
});

// in order to be able to access any of the path  before you should have authenticated yourself
// using router.post("/api/auth" tanto para acceder a las ruttas de router como para el routercart

router.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = users.find((user) => user.username === username);
  if (!findUser || findUser.password !== password)
    return response.status(401).send('Incorrect credentials');

  request.session.user = findUser;
  //user is a propetery that holds information about the user such as the id, email, etc
  // it is important to idenfify the use to be able to pass it on to the server
  // this line certifies that the user is log in
  return response.status(200).send(findUser);
});


export default router;
