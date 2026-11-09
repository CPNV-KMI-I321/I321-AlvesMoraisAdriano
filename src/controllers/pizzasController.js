import * as Pizza from '../entities/Pizza.js';
import {fail, validateId, validatePizza} from '../validation.js';

// Recherche de toutes les pizzas
export function list(req, res) {
  res.json(Pizza.findAll());
}

// Recherche des pizzas par ID
export function get(req, res) {
  const id = validateId(req.params.id);
  const pizza = Pizza.findById(id);

  if (!pizza) fail(404, 'Pizza introuvable.');
  res.json(pizza);
}

// Créer une pizza
export function create(req, res) {
  const data = validatePizza(req.body);
  const pizza = Pizza.create(data);

  res.location(`/api/pizzas/${pizza.id}`);
  res.status(201).json(pizza);
}

// Met à jour une pizza
export function update(req, res) {
  const id = validateId(req.params.id);
  const data = validatePizza(req.body);
  const pizza = Pizza.update(id, data);

  if (!pizza) fail(404, 'Pizza introuvable.');
  res.json(pizza);
}

// Supprimer une pizza
export function remove(req, res) {
  const id = validateId(req.params.id);
  const deleted = Pizza.remove(id);

  if (!deleted) fail(404, 'Pizza introuvable.');
  res.sendStatus(204);
}
