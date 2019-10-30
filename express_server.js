
// required 
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const cookieParser = require('cookie-parser')



// using the cookie parser
app.use(cookieParser())

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//generating the random 6 character string for the short url

function generateRandomString() {
  let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < 6; i++){
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result;
}



// database 
const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// handling the userlogin
app.post("/login", (req, res) => {
  res.cookie('username', req.body['username']);
  res.redirect('/urls/');
});

// handling the user logout
app.post("/logout", (req, res) => {
  res.clearCookie('username');
  res.redirect('/urls/');
});

// delete from the server
app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls/');
});

// edit the url 
app.post("/urls/:shortURL/edit", (req, res) => {
  urlDatabase[req.params.shortURL]= req.body.longURL;
  res.redirect(`/urls/${req.params.shortURL}`);
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
  let templateVars = { urls: urlDatabase, username: req.cookies.username};
  res.render("urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  console.log(req.cookies)
  let templateVars = {shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], username: req.cookies.username};
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
   const shortUrl = req.params.shortURL;
  const longUrl = urlDatabase[shortUrl];
  res.redirect(urlDatabase[req.params.shortURL]);
 });

 // when the server comes up
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});