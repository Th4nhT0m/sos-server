const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {handbookServer } =require('../services');


const createHandbook = catchAsync(async (req,res) => {
  const createHB = await handbookServer.createHandbook(req.body,req.user.id);
  res.status(httpStatus.CREATED).send(createHB);
});

const getHandbooks = catchAsync(async (req, res) =>{
  const filter = pick(req.query, ['nameHandbook','severity','icon'])
  const options = pick(req.query,['sortBy','limit','page']);
  const result = await handbookServer.queryHandbook(filter, options);
  res.send(result);
});

const getHandbook = catchAsync(async (req, res) => {
  const getHandbook = await  handbookServer.getHandbookById(req.params.handbookId);
  if(!getHandbook){
    throw new ApiError(httpStatus.NOT_FOUND,'Handbook not found');
  }
  res.send(getHandbook);
});

const updateHandbook  = catchAsync(async (req, res) => {
  const updateHB = await handbookServer.updateHandbookById(req.params.handbookId, req.body, req.user.id);
  res.send(updateHB);
});

const deleteHandbook = catchAsync(async (req, res) => {
  await handbookServer.deleteHandbookById(req.params.handbookId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHandbook,
  getHandbooks,
  getHandbook,
  updateHandbook,
  deleteHandbook
}
