import express from 'express';
import jwtDecode from 'jwt-decode';
import config from '../config';
import knex from 'knex'
import authenticate from '../middlewares/authenticate';

import Stock from '../models/stock';

let router = express();

router.get('/', authenticate, (req, res) => {
  let userId = req.currentUser.id;

  Stock.where('userId', userId).fetchAll().then(userStocks => {
    res.json( userStocks );
  }).catch(function(err) {
    res.status(401).json({ error: 'Error querying stocks' });
  });

});

router.post('/', authenticate, (req, res) => {
  const { symbol, shares } = req.body;
  let userId = req.currentUser.id;

  Stock.forge({
    symbol, shares, userId
  }, { hasTimestamps: true }).save()
    .then(stock => res.json( stock ))
    .catch(err => res.status(500).json({ error: err }));
});

router.delete('/:id', authenticate, (req, res) => {
  Stock.query().where('id', req.params.id).del()
  .then(stock => res.json( req.params.id ))
  .catch(err => res.status(500).json({ error: err}));
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
