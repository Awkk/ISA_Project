export const baseurl = process.env.ON_HEROKU
  ? "https://isa-rebbit-server.herokuapp.com/api/v1"
  : "http://localhost:8888/api/v1";
