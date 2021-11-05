const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { accidentTypeServer } = require('../services');

const createAccidentType = catchAsync(async (req,res) => {
  const accidentType = await accidentTypeServer.createAccidentType(req.user.id, req.body);
  res.status(httpStatus.CREATED).send(accidentType);
});

const getAccidentsType = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['accidentTypeName'])
  const options = pick(req.query,['sortBy','limit','page']);
  const result = await accidentTypeServer.queryAccidentType(filter, options);
  res.send(result);
})

const getAccidentType = catchAsync(async (req, res) => {
  const accidentType = await  accidentTypeServer.getAccidentTypeById(req.params.accidentTypeId);
  if(!accidentType){
    throw new ApiError(httpStatus.NOT_FOUND,'Accident type not found');
  }
  res.send(accidentType);
})

const updateAccidentType = catchAsync(async (req, res) => {
  const accidentType = await accidentTypeServer.updateAccidentTypeById(req.params.accidentTypeId, req.body, req.user.id);
  res.send(accidentType);
});

const deleteAccidentType = catchAsync(async (req, res) => {
  await accidentTypeServer.deleteAccidentTypeById(req.params.accidentTypeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAccidentType,
  getAccidentsType,
  getAccidentType,
  deleteAccidentType,
  updateAccidentType
}
