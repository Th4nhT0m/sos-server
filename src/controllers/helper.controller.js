const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { helperServer } = require('../services');

const createHelper = catchAsync(async (req, res)=> {
  const detailsAccident = await helperServer.createHelper(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(detailsAccident);
});

const getHelpers = catchAsync(async (req, res) =>{
  const filter = pick(req.query,['accident','status','timeOut','user','helperLatitude','helperLongitude','accidentLatitude','accidentLongitude']);
  const options = pick(req.query, ['sortBy','limit','page']);
  const result = await helperServer.queryHelper(filter,options);
  res.send(result);
});

const getHelperByIdAccident = catchAsync(async (req, res) =>{
  const filter = pick(req.query,['accident']);
  const options = pick(req.query, ['sortBy','limit','page']);
  const result = await helperServer.queryHelperByAccidentId(filter,options);
  res.send(result);
});

const getHelperByUserId = catchAsync(async (req,res)=>{
  const options = pick(req.query, ['sortBy','limit','page']);
  const result = await helperServer.getHelperByUserId(req.user.id,options);
  res.send(result);
});

const getHelper = catchAsync(async (req,res)=>{
  const Helper = await helperServer.getHelperById(req.params.HelperId);
  if(!Helper){
    throw new ApiError(httpStatus.NOT_FOUND,'Helper not found')
  }
  res.send(Helper);
});

const updateHelper = catchAsync(async (req,res)=>{
  const helperUpdate = await helperServer.updateHelperById(req.params.HelperId, req.body,req.user.id);
  res.send(helperUpdate);
});

const deleteHelper = catchAsync(async (req,res) =>{
   await helperServer.deleteHelperById(req.params.HelperId);
  res.status(httpStatus.NOT_FOUND).send();
});

module.exports = {
  createHelper,
  getHelpers,
  getHelper,
  updateHelper,
  deleteHelper,
  getHelperByIdAccident,
  getHelperByUserId,
}
