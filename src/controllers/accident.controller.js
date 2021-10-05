const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { accidentServer } = require('../services');

const createAccident = catchAsync(async (req,res) => {
  const accident = await accidentServer.createAccident(req.body);
  res.status(httpStatus.CREATED).send(accident);
});

const getAccidents = catchAsync(async (req, res) =>{
  const filter = pick(req.query, ['nameAccident','status','locationName','people'])
  const options = pick(req.query,['sortBy','limit','page']);
  const result = await accidentServer.queryUsers(filter, options);
  res.send(result);
})

const getAccident = catchAsync(async (req, res) => {
  const accident = await  accidentServer.getAccidentById(req.params.accidentId);
  if(!accident){
    throw new ApiError(httpStatus.NOT_FOUND,'Accident not found');
  }
  res.send(accident);
})

const updateAccident = catchAsync(async (req, res) => {
  const accident = await accidentServer.updateAccidentById(req.params.accidentId, req.body);
  res.send(accident);
});

const deleteAccident = catchAsync(async (req, res) => {
  await accidentServer.deleteAccidentById(req.params.accidentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAccident,
  getAccidents,
  getAccident,
  updateAccident,
  deleteAccident
}
