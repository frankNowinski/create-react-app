import express from 'express';
import authenticate from '../middlewares/authenticate';

import Stock from '../models/stock';

let router = express();
router.get('/', authenticate, (req, res) => {
  res.status(201).json({ success: true });
});

router.post('/', authenticate, (req, res) => {
  const { symbol, shares, userId } = req.body;

  Stock.forge({
    symbol, shares, userId
  }, { hasTimestamps: true }).save()
    .then(stock => res.json({ success: true }))
    .catch( err => res.status(500).json({ error: err }));
})

// validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
//   if(isValid) {
//     const { username, email, password } = req.body;
//     const password_digest = bcrypt.hashSync(password, 10);
//
//     User.forge({
//       username, email, password_digest
//     }, { hasTimestamps: true }).save()
//       .then(user => res.json({ success: true }))
//       .catch(err => res.status(500).json({ error: err }));
//
//   } else {
//     res.status(400).json(errors);
//   }
// });

export default router;
