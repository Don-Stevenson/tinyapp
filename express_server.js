const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

function generateRandomString() {
  let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < 6; i++){
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result;
}
console.log("REFRESH")
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

  
app.post("/urls/:shortURL/delete", (req, res) => {
  console.log("Hello there")
  delete urlDatabase[req.params.shortURL];
  res.redirect('http://google.com');
});


app.post("/urls", (req, res) => {
  // console.log(req.body);  // Log the POST request body to the console
  urlDatabase[generateRandomString()] = req.body.longURL;
  res.redirect('/urls/');
});




app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
   const shortUrl = req.params.shortURL;
  const longUrl = urlDatabase[shortUrl];
  res.redirect(urlDatabase[req.params.shortURL]);
 });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});