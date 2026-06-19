import { Router } from 'express';
import {
  listItems,
  getItem,
  createItem,
  deleteItem,
} from '../controllers/items.controller';

const router = Router();

router.get('/', listItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.delete('/:id', deleteItem);

export default router;
