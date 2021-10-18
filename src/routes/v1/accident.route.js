const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const accidentValidation = require('../../validations/accident.validation');
const accidentController = require('../../controllers/accident.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('Users'), validate(accidentValidation.createAccident), accidentController.createAccident)
  .get(auth('Users'), validate(accidentValidation.getAccidents), accidentController.getAccidents);

router
  .route('/Urgent')
  .post(auth('Users'), validate(accidentValidation.createAccidentUrgent), accidentController.createAccident);

router
  .route('/:accidentId')
  .get(auth('Users'), validate(accidentValidation.getAccident), accidentController.getAccident)
  .patch(auth('Users'), validate(accidentValidation.updateAccident), accidentController.updateAccident)
  .delete(auth('Users'), validate(accidentValidation.deleteAccident),accidentController.deleteAccident);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Accidents
 *  description: Accident retrieval
 */

/**
 * @swagger
 * /accidents:
 *   post:
 *     summary: Create a accident
 *     description: user can create other accidents.
 *     tags: [Accidents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameAccident
 *               - accidentType
 *               - description
 *               - latitude
 *               - longitude
 *               - created_by
 *               - modified_by
 *             properties:
 *               nameAccident:
 *                 type: string
 *               accidentType:
 *                  type: string
 *               description:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *               created_by:
 *                 type: string
 *               modified_by:
 *                 type: string
 *             example:
 *               nameAccident: accident card
 *               accidentType: 88703b8c5678d1ea8f597af
 *               description: card
 *               latitude: "70.235122"
 *               longitude: "75.235122"
 *               created_by: 615703b8c5678d1ea8f597af
 *               modified_by: 615703b8c5678d1ea8f597af
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accident:
 *                   $ref: '#/components/schemas/Accident'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all accidents
 *     description: user can retrieve all accident.
 *     tags: [Accidents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nameAccident
 *         schema:
 *           type: string
 *         description: Accident name
 *       - in: query
 *         name: accidentType
 *         schema:
 *           type: string
 *         description: Accident status
 *       - in: query
 *         name: created_by
 *         schema:
 *           type: string
 *         description: user name create
 *       - in: query
 *         name: modified_by
 *         schema:
 *           type: string
 *         description: user name update
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
 *                     $ref: '#/components/schemas/Accident'
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
 */

/**
 * @swagger
 * /accidents/Urgent:
 *   post:
 *     summary: Create a urgent accident
 *     description: user can create other urgent accidents.
 *     tags: [Accidents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accidentType
 *               - latitude
 *               - longitude
 *               - created_by
 *               - modified_by
 *             properties:
 *               accidentType:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *               created_by:
 *                 type: string
 *               modified_by:
 *                 type: string
 *             example:
 *               accidentType: 6157sss5b8c5678d1ea8f597af
 *               latitude: "70.235122"
 *               longitude: "75.235122"
 *               created_by: 615703b8c5678d1ea8f597af
 *               modified_by: 615703b8c5678d1ea8f597af
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accident:
 *                   $ref: '#/components/schemas/Accident'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * /accidents/{id}:
 *   get:
 *     summary: Get a accident
 *     description: Logged in users can fetch only their own accident information
 *     tags: [Accidents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: accident id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Accident'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: edit a accident
 *     description:  Logged in users can update their own information..
 *     tags: [Accidents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Accident id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameAccident:
 *                 type: string
 *               accidentType:
 *                 type: string
 *               description:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *             example:
 *               nameAccident: accident card
 *               accidentType: 6157sss5b8c5678d1ea8f597af
 *               description: be banh sau
 *               latitude: "70.25698"
 *               longitude: "75.02356"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Accident'
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
 *     tags: [Accidents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Accident id
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


