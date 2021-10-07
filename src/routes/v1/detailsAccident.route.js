const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const detailsAccidentValidation = require('../../validations/detailsAccident.validation');
const detailsAccidentController = require('../../controllers/detailsAccident.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('Users'), validate(detailsAccidentValidation.createDetailsAccident), detailsAccidentController.createDetailsAccident)
  .get(auth('Users'), validate(detailsAccidentValidation.getDetailsAccidents), detailsAccidentController.getDetailsAccidents);

router
  .route('/:detailsAccidentId')
  .get(auth('Users'), validate(detailsAccidentValidation.getDetailsAccident), detailsAccidentController.getDetailsAccident)
  .patch(auth('Users'), validate(detailsAccidentValidation.updateDetailsAccident), detailsAccidentController.updateDetailsAccident)
  .delete(auth('Users'), validate(detailsAccidentValidation.deleteDetailsAccident),detailsAccidentController.deleteDetailsAccident);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: DetailsAccident
 *  description: Details Accident retrieval
 */

/**
 * @swagger
 * /detailsAccidents:
 *   post:
 *     summary: Create a details accident
 *     description: user can create other details accidents.
 *     tags: [DetailsAccident]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accident
 *               - user
 *               - content
 *               - timeOut
 *               - locationName
 *               - latitude
 *               - longitude
 *             properties:
 *               accident:
 *                 type: string
 *               user:
 *                  type: string
 *               content:
 *                 type: string
 *               timeOut:
 *                 type: Date
 *               locationName:
 *                 type: string
 *               latitude:
 *                 type: string
 *               longitude:
 *                 type: string
 *             example:
 *               accident: 615704b89e78551a588d220f
 *               user: 615703b8c5678d1ea8f597af
 *               content: card
 *               timeOut: 09-06-2021
 *               locationName: tay ninh
 *               latitude: "75.253698"
 *               longitude: "75.253698"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accident:
 *                   $ref: '#/components/schemas/DetailsAccident'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all details accidents
 *     description: user can retrieve all details accident.
 *     tags: [DetailsAccident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: user
 *       - in: query
 *         name: accident
 *         schema:
 *           type: string
 *         description: accident
 *       - in: query
 *         name: statusLog
 *         schema:
 *           type: string
 *           enum: [Start, Supporting , End]
 *         description: status Log
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: content
 *       - in: query
 *         name: timeOut
 *         schema:
 *           type: Date
 *         description: Date out
 *       - in: query
 *         name: locationName
 *         schema:
 *           type: string
 *         description: address
 *       - in: query
 *         name: locationName
 *         schema:
 *           type: string
 *         description: location Name
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: string
 *         description: latitude
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: string
 *         description: latitude
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
 *                     $ref: '#/components/schemas/DetailsAccident'
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
 * /detailsAccidents/{id}:
 *   get:
 *     summary: Get a details accident
 *     description: Logged in users can fetch only their own details accident information
 *     tags: [DetailsAccident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: details accident id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DetailsAccident'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: edit a details accident
 *     description:  Logged in users can update their own information.
 *     tags: [DetailsAccident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: details Accident id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusLog:
 *                 type: string
 *                 enum: [Start, Supporting , End]
 *               content:
 *                 type: string
 *               timeOut:
 *                 type: string
 *             example:
 *               statusLog: Supporting
 *               content: be banh sau
 *               timeOut: 09-09-2021
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DetailsAccident'
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
 *     summary: Delete a details accident
 *     description: Logged in users can delete only themselves.
 *     tags: [DetailsAccident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: details accident id
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

