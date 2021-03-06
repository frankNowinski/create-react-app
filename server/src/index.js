import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import stocks from './routes/stocks';

let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/stocks', stocks);

app.listen(8080, () => console.log('Listening on port 8080'));
