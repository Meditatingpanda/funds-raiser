const express = require('express');
const db = require('./newData.json');
require('dotenv').config();
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())


//get data on basis of city and state
app.get('/', (req, res, next) => {
    const filters = req.query;
    const filteredUsers = db.filter(user => {
        let isValid = true;
        for (key in filters) {
            // console.log(key, user[key], filters[key]);
            isValid = isValid && user[key] == filters[key];
        }
        return isValid;
    });
    res.json(filteredUsers);
});

//get all availabe state and cities
app.get('/state', (req, res) => {
    let state = [];
    db.map((item, id) => {
        if (state.indexOf(item.state) === -1) {
            state.push(item.state);
        }
    }
    )
    res.json(state);
})
app.get('/city', (req, res) => {
    const state = req.query.state;
    let city = [];
    db.map((item, id) => {
        if (item.state === state) {
            city.push(item.city);
        }

    })
    res.json(city);

})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})