import { fail } from '../validation.js';
import {db} from "../config/database.js";

// Sélectionner tous les ingrédients
export function findAll() {
  return db.prepare('SELECT * FROM ingredients ORDER BY id').all();
}

// Sélectionner les ingrédients par ID
export function findById(id) {
  return db.prepare('SELECT * FROM ingredients WHERE id = ?').get(id);
}

// Ajouter un ingrédient
export function create(data) {
  const result = db.prepare(
      'INSERT INTO ingredients (name, price) VALUES (?, ?)'
  ).run(data.name, data.price);

  return findById(Number(result.lastInsertRowid));
}

// Modifier un ingrédient
export function update(id, data) {
  db.prepare(
      'UPDATE ingredients SET name = ?, price = ? WHERE id = ?'
  ).run(data.name, data.price, id);

  return findById(id);
}

// Supprimer un ingrédient
export function remove(id) {
  const result = db.prepare('DELETE FROM ingredients WHERE id = ?').run(id);
  return result.changes > 0;
}
