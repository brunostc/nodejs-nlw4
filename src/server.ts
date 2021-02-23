import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

app.get('/', (req, res) => {
	return res.json({ msg: 'Hello world' });
});

app.post('/', (req, res) => {
	return res.json({ msg: 'Dados salvos com sucesso' });
});

app.listen(3333, () => console.log('server running'));
