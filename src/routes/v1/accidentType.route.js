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
 *  name: AccidentsType
 *  description: Accident type retrieval
 */

/**
 * @swagger
 * /accidentsType:
 *   post:
 *     summary: Create a AccidentsType
 *     description: user can create other AccidentsType.
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
 *               - remark
 *             properties:
 *               accidentTypeName:
 *                 type: string
 *               remark:
 *                  type: string
 *             example:
 *               accidentTypeName: Basic
 *               remark: Basic
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accident:
 *                   $ref: '#/components/schemas/AccidentType'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all accidentsType
 *     description: admin can retrieve all accidentType.
 *     tags: [AccidentsType]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: accidentTypeName
 *         schema:
 *           type: string
 *         description: accidentType name
 *       - in: query
 *         name: remark
 *         schema:
 *           type: string
 *         description: remark
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of accident
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AccidentType'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * /accidentsType/{id}:
 *   get:
 *     summary: Get a accidentType
 *     description: Logged in admin can fetch only their own accident type information
 *     tags: [AccidentsType]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AccidentType id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AccidentType'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: edit a accidentType
 *     description:  Logged in admin can update their own information.
 *     tags: [AccidentsType]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AccidentType id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accidentTypeName:
 *                 type: string
 *               remark:
 *                 type: string
 *             example:
 *               accidentTypeName: low
 *               remark: low
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/AccidentType'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a accident
 *     description: Logged in users can delete only themselves.
 *     tags: [AccidentsType]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: AccidentType id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */



