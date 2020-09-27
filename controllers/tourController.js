const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {

  const tours = await Tour.find();

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    },
  });
}

exports.createTour = async (req, res) => {
  try {
    //const newtour = new Tour();
    //newtour.save()

    const newtour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newtour,
      }
    });

  } 
  catch (err) 
  {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.getOneTour = async (req, res) => {
  try {

    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      }
    });
  } 
  catch (err) 
  {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

exports.UpdateTour = async (req, res) => {
  try{

    const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true
    })

    res.status(200).json({
        status: 'success',
        data: {
          tour: tour
        }
    });
  } 
  catch(err) 
  {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  } 
}


exports.deleteTour = async (req, res) => {
  try{
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
    });
  } 
  catch(err) 
  {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  } 
}