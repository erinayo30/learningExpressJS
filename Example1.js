const { count } = require("console");
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

let app = express();
let port = 3000;
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

const logger = function (req, res, next) {
  console.log("custom middleware call");
  next();
};

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
// app.use((req, res, next) => {
//   req.requestedAt = new Date().toISOString();
//   next();
// });
//  Creating API
// creating a get request
app.get("/api/v1/movies", (req, res) => {
  res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
      movies: movies,
      // requestedAt: requestedAt,
    },
  });
});
// Using GET to get a specific data
app.get("/api/v1/movies/:id", (req, res) => {
  // console.log(req.params);
  // Convert ID to Number Type
  const id = req.params.id * 1;

  // Finding movie based on ID parameter
  let movie = movies.find((el) => el.id === id);
  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: `Movies with ID ${id} is not found`,
    });
  }
  // Send movie in the status
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
});
// Creating a API Post request
app.post("/api/v1/movies", (req, res) => {
  // console.log(req.body);
  const newID = movies[movies.length - 1].id + 1;

  const newMovie = Object.assign({ id: newID }, req.body);

  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        movies: newMovie,
      },
    });
  });
  // res.send("Created");
});
// Update part of the resource PATCH
app.patch("/api/v1/movies/:id", (req, res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === id);

  if (!movieToUpdate) {
    return res.status(404).json({
      status: "fail",
      message: `Movies with ID ${id} is not found`,
    });
  }
  let movieIndex = movies.indexOf(movieToUpdate);

  Object.assign(movieToUpdate, req.body);
  movies[movieIndex] = movieToUpdate;

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        movies: movieToUpdate,
      },
    });
    // console.log(movieToUpdate);
  });
  // fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
  //   res.status(200).json({
  //     status: "success",
  //     data: {
  //       movies: movieToUpdate,
  //     },
  //   });
  //   // console.log(movieToUpdate);
  // });
});

// Delete a request
app.delete("/api/v1/movies/:id", (req, res) => {
  let id = req.params.id * 1;
  const movieToDelete = movies.find((el) => el.id === id);

  if (!movieToDelete) {
    return res.status(404).json({
      status: "fail",
      message: `Movies with ID ${id} is not found`,
    });
  }
  const index = movies.indexOf(movieToDelete);

  movies.splice(index, 1);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        movies: null,
      },
    });
    // const newID = movies[movies.length - 1].id - 1;

    // const newMovie = Object.assign({ id: newID }, req.body);
    // console.log(newMovie);
  });
});

app.listen(port, () => {
  console.log("server has startrd ...");
});

// vanila js to start a server
// const server = http.createServer((req, res) => {
//   res.writeHead(200, {
//     "Content-Type": "",
//   });
// });
// server.listen(8000, "127.0.0.1", () => {
//   console.log("App Started");
// });
