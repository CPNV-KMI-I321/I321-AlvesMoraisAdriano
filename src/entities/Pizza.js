import { db } from '../config/database.js';
import { fail } from '../validation.js';

// Sélectionner toutes les pizzas
export function findAll() {
  return db.prepare('SELECT * FROM pizzas ORDER BY id').all();
}

// Sélectionner les pizzas par ID
export function findById(id) {
  return db.prepare('SELECT * FROM pizzas WHERE id = ?').get(id);
}

// Créer une pizza
export function create(data) {
  const result = db.prepare(`
    INSERT INTO pizzas (name, description, price, imageUrl)
    VALUES (?, ?, ?, ?)
  `).run(data.name, data.description, data.price, data.imageUrl);

  return findById(Number(result.lastInsertRowid));
}

// Modifier une pizza
export function update(id, data) {
  const result = db.prepare(`
    UPDATE pizzas
    SET name = ?, description = ?, price = ?, imageUrl = ?
    WHERE id = ?
  `).run(data.name, data.description, data.price, data.imageUrl, id);

  if (result.changes === 0) return undefined;
  return findById(id);
}

// Supprimer une pizza
export function remove(id) {
  const result = db.prepare('DELETE FROM pizzas WHERE id = ?').run(id);
  return result.changes > 0;
}
