import {fail, validateId, validateIngredient} from '../validation.js';
import * as Ingredient from '../entities/Ingredient.js';

// Chercher tous les ingrédients
export function list(req, res) {
  res.json(Ingredient.findAll());
}

// Chercher les ingrédients par ID
export function get(req, res) {
  const id = validateId(req.params.id); // Une valeur incorrecte déclenche HTTP 400.
  const ingredient = Ingredient.findById(id);

  if (!ingredient) fail(404, 'Ingrédient introuvable.');
  res.json(ingredient); // HTTP 200, avec les données trouvées.
}

// Ajouter un ingrédient
export function create(req, res) {
  const data = validateIngredient(req.body); // Valide le nom et le prix (400 sinon).
  const ingredient = Ingredient.create(data);

  res.location(`/api/ingredients/${ingredient.id}`).status(201).json(ingredient);
}

// Modifier un ingrédient
export function update(req, res) {
  const id = validateId(req.params.id);
  if (!Ingredient.findById(id)) fail(404, 'Ingrédient introuvable.');

  const data = validateIngredient(req.body); // Données non valides : HTTP 400.
  res.json(Ingredient.update(id, data)); // HTTP 200 avec la version modifiée.
}

// Supprimer un ingrédient
export function remove(req, res) {
  const id = validateId(req.params.id);
  if (!Ingredient.remove(id)) fail(404, 'Ingrédient introuvable.');

  res.status(204).end(); // Aucun JSON envoyé pour une suppression réussie.
}
