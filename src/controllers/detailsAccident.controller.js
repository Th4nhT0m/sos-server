const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { detailsAccidentServer } = require('../services');

const createDetailsAccident = catchAsync(async (req, res)=> {
  const detailsAccident = await detailsAccidentServer.createDAccident(req.body);
  res.status(httpStatus.CREATED).send(detailsAccident);
});

const getDetailsAccidents = catchAsync(async (req, res) =>{
  const filter = pick(req.query,['accident','statusLog','content','timeOut','user']);
  const options = pick(req.query, ['sortBy','limit','page']);
  const result = await detailsAccidentServer.queryDAccident(filter,options);
  res.send(result);
});

const getDetailsAccident = catchAsync(async (req,res)=>{
  const detailsAccident = await detailsAccidentServer.getDAccidentById(req.params.detailsAccidentId);
  if(!detailsAccident){
    throw new ApiError(httpStatus.NOT_FOUND,'details accident not found')
  }
  res.send(detailsAccident);
});

const updateDetailsAccident = catchAsync(async (req,res)=>{
  const DAUpdate = await detailsAccidentServer.updateAccidentById(req.params.detailsAccidentId, req.body);
  res.send(DAUpdate);
});

const deleteDetailsAccident = catchAsync(async (req,res) =>{
   await detailsAccidentServer.deleteAccidentById(req.params.detailsAccidentId);
  res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
  createDetailsAccident,
  getDetailsAccidents,
  getDetailsAccident,
  updateDetailsAccident,
  deleteDetailsAccident
}
