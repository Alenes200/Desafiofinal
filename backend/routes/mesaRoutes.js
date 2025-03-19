const express = require('express');
const mesasController = require('../controllers/mesaController');

const router = express.Router();

/**
 * @swagger
 * /api/mesas:
 *   get:
 *     summary: Lista todas as mesas
 *     tags: [Mesas]
 *     responses:
 *       200:
 *         description: Lista de mesas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mesa'
 *       500:
 *         description: Erro ao listar mesas
 */
router.get('/', mesasController.list);

/**
 * @swagger
 * /api/mesas/{id}:
 *   get:
 *     summary: Obtém uma mesa pelo ID
 *     tags: [Mesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da mesa
 *     responses:
 *       200:
 *         description: Detalhes da mesa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       404:
 *         description: Mesa não encontrada
 *       500:
 *         description: Erro ao buscar mesa
 */
router.get('/:id', mesasController.get);

/**
 * @swagger
 * /api/mesas:
 *   post:
 *     summary: Cria uma nova mesa
 *     tags: [Mesas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacidade:
 *                 type: integer
 *                 description: Capacidade da mesa
 *               descricao:
 *                 type: string
 *                 description: Descrição da mesa
 *               local:
 *                 type: string
 *                 description: Local da mesa
 *     responses:
 *       201:
 *         description: Mesa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       400:
 *         description: Campos obrigatórios faltando
 *       500:
 *         description: Erro ao criar mesa
 */
router.post('/', mesasController.create);

/**
 * @swagger
 * /api/mesas/{id}:
 *   put:
 *     summary: Atualiza uma mesa existente
 *     tags: [Mesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da mesa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacidade:
 *                 type: integer
 *                 description: Capacidade da mesa
 *               descricao:
 *                 type: string
 *                 description: Descrição da mesa
 *               local:
 *                 type: string
 *                 description: Local da mesa
 *               status:
 *                 type: integer
 *                 description: Status da mesa (1 para ativo, -1 para desativado)
 *     responses:
 *       200:
 *         description: Mesa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       400:
 *         description: Campos inválidos ou mesa desativada
 *       404:
 *         description: Mesa não encontrada
 *       500:
 *         description: Erro ao atualizar mesa
 */
router.put('/:id', mesasController.update);

/**
 * @swagger
 * /api/mesas/{id}:
 *   delete:
 *     summary: Desativa uma mesa (delete lógico)
 *     tags: [Mesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da mesa
 *     responses:
 *       200:
 *         description: Mesa desativada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       404:
 *         description: Mesa não encontrada
 *       500:
 *         description: Erro ao desativar mesa
 */
router.delete('/:id', mesasController.delete);

/**
 * @swagger
 * /api/mesas/local/{local}:
 *   get:
 *     summary: Busca mesas por local
 *     tags: [Mesas]
 *     parameters:
 *       - in: path
 *         name: local
 *         required: true
 *         schema:
 *           type: string
 *         description: Local das mesas
 *     responses:
 *       200:
 *         description: Lista de mesas do local especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mesa'
 *       404:
 *         description: Nenhuma mesa encontrada para o local especificado
 *       500:
 *         description: Erro ao buscar mesas por local
 */
router.get('/local/:local', mesasController.getByLocal);

/**
 * @swagger
 * components:
 *   schemas:
 *     Mesa:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da mesa
 *         capacidade:
 *           type: integer
 *           description: Capacidade da mesa
 *         descricao:
 *           type: string
 *           description: Descrição da mesa
 *         local:
 *           type: string
 *           description: Local da mesa
 *         status:
 *           type: integer
 *           description: Status da mesa (1 para ativo, -1 para desativado)
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação da mesa
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data de atualização da mesa
 *       example:
 *         id: 1
 *         capacidade: 4
 *         descricao: "Mesa perto da janela"
 *         local: "Restaurante A"
 *         status: 1
 *         created_at: "2023-10-10T12:00:00.000Z"
 *         updated_at: "2023-10-10T12:00:00.000Z"
 */

module.exports = router;
