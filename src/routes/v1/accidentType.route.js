const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const accidentTypeValidation = require('../../validations/accidentType.validation');
const accidentTypeController = require('../../controllers/accidentType.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('Users'), validate(accidentTypeValidation.createAccidentType), accidentTypeController.createAccidentType)
  .get(auth('Users'), validate(accidentTypeValidation.getAccidentsType), accidentTypeController.getAccidentsType);

router
  .route('/:accidentTypeId')
  .get(auth('Users'), validate(accidentTypeValidation.getAccidentType), accidentTypeController.getAccidentType)
  .patch(auth('Users'), validate(accidentTypeValidation.updateAccidentType), accidentTypeController.updateAccidentType)
  .delete(auth('Users'), validate(accidentTypeValidation.deleteAccidentType),accidentTypeController.deleteAccidentType);

module.exports = router;


/**
 * @swagger
 * tags:
 *  name: Accident Type
 *  description: Accident type retrieval
 */

/**
 * @swagger
 * /accidentsType:
 *   post:
 *     summary: Create a accident type
 *     description: admin can create other accidents type.
 *     tags: [AccidentsType]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accidentTypeName
 *               - status
 *               - remark
 *             properties:
 *               accidentTypeName:
 *                 type: string
 *               status:
 *                  type: string
 *                  enum: [Low,Average,Danger]
 *               remark:
 *                 type: string
 *             example:
 *               accidentTypeName: sự cố
 *               status: Low
 *               remark: no die
 *     responses:
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
