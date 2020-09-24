const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.CheckID = (req, res, next, val) => {
  console.log(`Your Entered Tour ID is ${val}`);
  if (req.params.val > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.CheckBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing Name or Price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  var noDeletes = true;
  var newid;
  var newtour;

  for (var i = 0; i < tours.length; i++) {
    if (i != tours[i].id) {
      noDeletes = false;
      newid = i;
      break;
    }
  }

  if (noDeletes) {
    newid = tours[tours.length - 1].id + 1;
    newtour = Object.assign({ id: newid }, req.body);
    tours.push(newtour);
  } else {
    newtour = Object.assign({ id: newid }, req.body);
    tours.splice(newid, 0, newtour);
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newtour,
        },
      });
    }
  );
};

exports.getOneTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: tours[req.params.id],
    },
  });
};

exports.UpdateTour = (req, res) => {
  for (var key in req.body) {
    if (key in tours[req.params.id]) {
      tours[req.params.id][key] = req.body[key];
    }
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: tours[req.params.id],
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  tours.splice(req.params.id, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
