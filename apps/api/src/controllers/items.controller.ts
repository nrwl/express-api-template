import { Request, Response } from 'express';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
} from '@express-api-template/util';

interface Item {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

// In-memory store - swap for a real DB in production
const items: Item[] = [
  {
    id: 1,
    name: 'Widget A',
    description: 'A sample widget',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Widget B',
    description: 'Another sample widget',
    createdAt: new Date().toISOString(),
  },
];
let nextId = 3;

export function listItems(req: Request, res: Response): void {
  res.json(successResponse(items));
}

export function getItem(req: Request, res: Response): void {
  const id = parseInt(String(req.params.id), 10);
  const item = items.find((i) => i.id === id);
  if (!item) {
    res.status(404).json(notFoundResponse('Item'));
    return;
  }
  res.json(successResponse(item));
}

export function createItem(req: Request, res: Response): void {
  const { name, description } = req.body as {
    name?: string;
    description?: string;
  };
  if (!name) {
    res.status(400).json(errorResponse('name is required'));
    return;
  }
  const item: Item = {
    id: nextId++,
    name,
    description: description ?? '',
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  res.status(201).json(successResponse(item));
}

export function deleteItem(req: Request, res: Response): void {
  const id = parseInt(String(req.params.id), 10);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    res.status(404).json(notFoundResponse('Item'));
    return;
  }
  const [removed] = items.splice(index, 1);
  res.json(successResponse(removed));
}
