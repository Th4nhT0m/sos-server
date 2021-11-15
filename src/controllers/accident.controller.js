const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { accidentServer } = require('../services');
const { use } = require('express/lib/router');

const createAccident = catchAsync(async (req,res) => {
  const accident = await accidentServer.createAccident(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(accident);
});

const getAccidents = catchAsync(async (req, res) =>{
  const filter = pick(req.query, ['nameAccident','accidentType','description','created_by','modified_by','status'])
  const options = pick(req.query,['sortBy','limit','page']);
  const result = await accidentServer.queryAccident(filter, options);
  res.send(result);
})

const getAccidentByUserId = catchAsync(async (req,res) =>{
  const options = pick(req.query,['sortBy','limit','page']);
  const accident = await accidentServer.getAccidentByUserId(req.user.id,options);
  if(!accident) {
    throw new ApiError(httpStatus.NOT_FOUND,'Accident not found');
  }
  res.send(accident);
})

const getAccident = catchAsync(async (req, res) => {
  const accident = await  accidentServer.getAccidentById(req.params.accidentId);
  if(!accident){
    throw new ApiError(httpStatus.NOT_FOUND,'Accident not found');
  }
  res.send(accident);
})

const updateAccident = catchAsync(async (req, res) => {
  const accident = await accidentServer.updateAccidentById(req.params.accidentId, req.body,req.user.id);
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
  deleteAccident,
  getAccidentByUserId,
}
