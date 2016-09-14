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
    res.send(JSON.stringify(userStocks));
  }).catch(function(err) {
    res.status(401).json({ error: 'Error querying stocks' });
  });

  // Stock.query({
  //   where: { userId: userId }
  // }).fetch().then(stocks => {
  //   console.log(stocks);
  // })

  // console.log(knex.select().from('stocks').where('userId', userId));
  // jwt.verify(token), config.jwtSecret, (err, decoded) => {
  //   console.log(decoded);
  // };
  // if (token) {
  //   jwt.verify(token, config.jwtSecret, (err, decoded) => {
  //     if (err) {
  //       res.status(401).json({ error: 'Failed to authenticate' });
  //     } else {
  //       User.query({
  //         where: { id: decoded.id },
  //         select: [ 'email', 'id', 'username' ]
  //       }).fetch().then(user => {
  //         if (!user) {
  //           res.status(401).json({ error: 'No such user' });
  //         } else {
  //           req.currentUser = user;
  //           next();
  //         }
  //       });
  //     }
  //   });
  // } else {
  //   res.status(403).json({
  //     error: 'No token provided'
  //   });
  // }
  // res.status(201).json({ success: true });
});

router.post('/', authenticate, (req, res) => {
  const { symbol, shares, userId } = req.body;

  Stock.forge({
    symbol, shares, userId
  }, { hasTimestamps: true }).save()
    .then(stock => res.json({ stock }))
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
