const express = require('express');
const auth = require('../../middlewares/auth');
const  socketTypeController  = require();
const passport = require('passport');

const router = express.Router();

router
  .route('/')
  .post(auth('Users'),passport.authenticate('jwt', { session: false }), socketTypeController.createSocketCon);
 // .get(auth('Users'), validate(socketTypeControler.getHelpers), helperController.getHelpers);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Sockets
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /sockets:
 *   post:
 *     summary: Create a urgent accident
 *     description: user can create other urgent accidents.
 *     tags: [Sockets]
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
 *               - status
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
 *               accidentType: 617d7aa311d8ae3034be3309
 *               latitude: "70.235122"
 *               longitude: "75.235122"
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
