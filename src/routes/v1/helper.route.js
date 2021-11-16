const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const helperValidation = require('../../validations/helper.validation');
const helperController = require('../../controllers/helper.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('Users'), validate(helperValidation.createHelper), helperController.createHelper)
  .get(auth('Users'), validate(helperValidation.getHelpers), helperController.getHelpers);

router
  .route('/accidentID')
  .get(auth('Users'), validate(helperValidation.getHelperByIdAccident), helperController.getHelperByIdAccident);

router
  .route('/myHelper')
  .get(auth('Users'), validate(helperValidation.getHelpers), helperController.getHelperByUserId);

router
  .route('/:HelperId')
  .get(auth('Users'), validate(helperValidation.getHelper), helperController.getHelper)
  .patch(auth('Users'), validate(helperValidation.updateHelper), helperController.updateHelper)
  .delete(auth('Users'), validate(helperValidation.deleteHelper),helperController.deleteHelper);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: helper
 *  description: helper retrieval
 */

/**
 * @swagger
 * /helpers:
 *   post:
 *     summary: Create a helper
 *     description: user can create other helper.
 *     tags: [helper]
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
 *               - helperLatitude
 *               - helperLongitude
 *               - accidentLatitude
 *               - accidentLongitude
 *             properties:
 *               accident:
 *                 type: string
 *               user:
 *                  type: string
 *               content:
 *                 type: string
 *               timeOut:
 *                 type: Date
 *               helperLatitude:
 *                 type: string
 *               helperLongitude:
 *                 type: string
 *               accidentLatitude:
 *                 type: string
 *               accidentLongitude:
 *                 type: string
 *             example:
 *               accident: 61827279511174f2ef1e
 *               user: 617d0805f24fef34b082a161
 *               content: card
 *               timeOut: 09-06-2021
 *               helperLatitude: "75.2536989"
 *               helperLongitude: "75.2536983"
 *               accidentLatitude: "90.2536298"
 *               accidentLongitude: "90.2553698"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accident:
 *                   $ref: '#/components/schemas/Helper'
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
 *     tags: [helper]
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Start, Arrived, Success, Cancel]
 *         description: status Log
 *       - in: query
 *         name: timeOut
 *         schema:
 *           type: Date
 *         description: Date out
 *       - in: query
 *         name: helperLatitude
 *         schema:
 *           type: string
 *         description: helperLatitude
 *       - in: query
 *         name: helperLongitude
 *         schema:
 *           type: string
 *         description: helperLongitude
 *       - in: query
 *         name: accidentLatitude
 *         schema:
 *           type: string
 *         description: accidentLatitude
 *       - in: query
 *         name: accidentLongitude
 *         schema:
 *           type: string
 *         description: accidentLongitude
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
 *                     $ref: '#/components/schemas/Helper'
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
 *
 */

/**
 * @swagger
 * /helpers/accidentID:
 *   get:
 *     summary: Get details accidents by id accident
 *     description: user can retrieve all details accident.
 *     tags: [helper]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: accident
 *         schema:
 *           type: string
 *         description: accident
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
 *                     $ref: '#/components/schemas/Helper'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /helpers/myHelper:
 *   get:
 *     summary: get helper by user id
 *     description: get helper.
 *     tags: [helper]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Helper'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /helpers/{id}:
 *   get:
 *     summary: Get a helper
 *     description: Logged in users can fetch only their own helper information
 *     tags: [helper]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: helper id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Helper'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: edit a helper
 *     description:  Logged in users can update their own information.
 *     tags: [helper]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: helper id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Start, Arrived, Success, Cancel]
 *               content:
 *                 type: string
 *               timeOut:
 *                 type: Date
 *               helperLatitude:
 *                 type: string
 *               helperLongitude:
 *                 type: string
 *               accidentLatitude:
 *                 type: string
 *               accidentLongitude:
 *                 type: string
 *             example:
 *               status: Success
 *               content: be banh sau
 *               timeOut: 2021-09-09
 *               helperLatitude: "702.253692"
 *               helperLongitude: "702.253869"
 *               accidentLatitude: "70.259369"
 *               accidentLongitude: "70.225369"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Helper'
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
 *     summary: Delete a helper
 *     description: Logged in users can delete only themselves.
 *     tags: [helper]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: helper id
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

