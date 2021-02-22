import express from 'express';

const app = express();

app.get('/', (req, res) => {
	return res.json({ msg: 'Hello world' });
});

app.post('/', (req, res) => {
	return res.json({ msg: 'Dados salvos com sucesso' });
});

app.listen(3333, () => console.log('server running'));
