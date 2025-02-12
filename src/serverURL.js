let url;

if (process.env.NODE_ENV === "production") {
  url = process.env.REACT_APP_PRODUCTION_URL;
} else {
  url = process.env.REACT_APP_DEVELOPMENT_URL;
}
console.log(
  `Currenty running in ${process.env.NODE_ENV} mode. The server URL used is: ${url}`
);

export default url;
