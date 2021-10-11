const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const handbookValidation = require('../../validations/handbook.validation');
const handbookController = require('../../controllers/handbook.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('Users'), validate(handbookValidation.createHandbook), handbookController.createHandbook)
  .get(auth('Users'), validate(handbookValidation.getHandbooks), handbookController.getHandbooks);

router
  .route('/:handbookId')
  .get(auth('Users'), validate(handbookValidation.getHandbook), handbookController.getHandbook)
  .patch(auth('Users'), validate(handbookValidation.updateHandbook), handbookController.updateHandbook)
  .delete(auth('Users'), validate(handbookValidation.deleteHandbook),handbookController.deleteHandbook);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Handbooks
 *  description: Handbook retrieval
 */

/**
 * @swagger
 * /handbooks:
 *   post:
 *     summary: Create a handbook
 *     description: user can create other handbook.
 *     tags: [Handbooks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nameHandbook
 *               - severity
 *               - icon
 *               - content
 *               - utensil
 *             properties:
 *               nameHandbook:
 *                 type: string
 *               severity:
 *                  type: string
 *                  enum: [Serious,Medium,Simple]
 *               icon:
 *                 type: string
 *               content:
 *                 type: string
 *               utensil:
 *                 type: string
 *             example:
 *               nameHandbook: băng bó
 *               severity: Simple
 *               icon: card
 *               content: băng lại
 *               utensil: băng
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accident:
 *                   $ref: '#/components/schemas/Handbook'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all handbook
 *     description: user can retrieve all handbook.
 *     tags: [Handbooks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nameHandbook
 *         schema:
 *           type: string
 *         description: Handbook name
 *       - in: query
 *         name: severity
 *         schema:
 *           type: string
 *           enum: [Serious, Medium, Simple]
 *         description: handbook severity
 *       - in: query
 *         name: icon
 *         schema:
 *           type: string
 *         description: icon
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: content
 *       - in: query
 *         name: utensil
 *         schema:
 *           type: string
 *         description: utensil
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
 *                     $ref: '#/components/schemas/Handbook'
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
 * /handbooks/{id}:
 *   get:
 *     summary: Get a handbooks
 *     description: Logged in users can fetch only their own handbooks information
 *     tags: [Handbooks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: handbook id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Handbook'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: edit a Handbook
 *     description:  Logged in users can update their own information.
 *     tags: [Handbooks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Handbooks id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameHandbook:
 *                 type: string
 *               severity:
 *                  type: string
 *                  enum: [Serious,Medium,Simple]
 *               icon:
 *                 type: string
 *               content:
 *                 type: string
 *               utensil:
 *                 type: string
 *             example:
 *               nameHandbook: fakename
 *               severity: Serious
 *               icon: image
 *               content: be banh sau
 *               utensil: keo
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Handbook'
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
 *     summary: Delete a Handbook
 *     description: Logged in users can delete only themselves.
 *     tags: [Handbooks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Handbook id
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



