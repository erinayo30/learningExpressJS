const fs = require("fs");

let movies = JSON.parse(fs.readFileSync("./data/movies.json"));
exports.checkId = (req, res, next, value) => {
  console.log(`movie ID is ${value}`);
  // Finding movie based on ID parameter
  let movie = movies.find((el) => el.id === value);
  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: `Movies with ID ${value} is not found`,
    });
  }
  next();
};
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
      movies: movies,
      // requestedAt: requestedAt,
    },
  });
};
// Using GET to get a specific data
exports.getAMovie = (req, res) => {
  // console.log(req.params);
  // Convert ID to Number Type
  const id = req.params.id * 1;

  // Finding movie based on ID parameter
  let movie = movies.find((el) => el.id === value);
  // if (!movie) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movies with ID ${id} is not found`,
  //   });
  // }
  // Send movie in the status
  res.status(200).json({
    status: "success",
    data: {
      movie: movie,
    },
  });
};
// Creating a API Post request
// exports.createMovies = (req, res) => {
//   // console.log(req.body);
//   const newID = movies[movies.length - 1].id + 1;
//   const newMovie = Object.assign({ id: newID }, req.body);

//   movies.push(newMovie);

//   fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
//     if (err) {
//       return res.status(500).json({
//         status: "error",
//         message: "Failed to save movie",
//       });
//     }
//     res.status(201).json({
//       status: "success",
//       data: {
//         movies: newMovie,
//       },
//     });
//   });
//   // res.send("Created");
//   console.log(createMovies);
// };

exports.createMovies = (req, res) => {
  // Assuming movies array and other dependencies are properly initialized
  const newID = movies[movies.length - 1].id + 1;
  const newMovie = Object.assign({ id: newID }, req.body);

  movies.push(newMovie);

  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "Failed to save movie",
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        movies: newMovie,
      },
    });
  });
};

// Validate create pr post request
exports.validateBody = (req, res, next) => {
  if (!req.body.name || !req.body.releaseYear || !req.body.duration) {
    return res.status(400).json({
      status: "fail",
      message: "Not a valid input",
    });
    next();
  }
};

// Update part of the resource PATCH
exports.updateMovie = (req, res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === value);

  // if (!movieToUpdate) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movies with ID ${id} is not found`,
  //   });
  // }
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
};

// Delete a request
exports.deleteMovie = (req, res) => {
  let id = req.params.id * 1;
  const movieToDelete = movies.find((el) => el.id === value);

  // if (!movieToDelete) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: `Movies with ID ${id} is not found`,
  //   });
  // }
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
};
