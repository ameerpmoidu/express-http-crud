// import express from 'express'; // for ESM (EcmaScript Module)
const express = require('express'); // for CJS (Common JS Modle)
// as your package type by default it is CJS

const app = express();
const port = process.env.port || 3000;
const bodyParser=require('body-parser')
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/items', (req, res) => {
    res.json(items);
});

// Read (GET): Get a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
})
app.post('/items', (req, res) => {
    const { name } = req.body;
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});


app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    item.name = req.body.name; 
    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});
