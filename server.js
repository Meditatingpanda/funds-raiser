const express = require('express');
const db = require('./newData.json');
require('dotenv').config();
const app = express();
const cors = require('cors')
const Fuse = require('fuse.js')
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())

const options = {
    // includeScore: true,
    // Search in `author` and in `tags` array
    minMatchCharLength: 3,
    keys: ['category', 'state', 'city']
}
const fuse = new Fuse(db, options)
//get data on basis of city , state or all datas and category
app.get('/', (req, res, next) => {
    const filters = req.query;
    let filteredUsers = db;
    if (filters.category) {
        filteredUsers = fuse.search(filters.category)
        filteredUsers=filteredUsers.map((data)=>{
           return data.item;

        })
    }
    filteredUsers = filteredUsers.filter(user => {
        let isValid = true;
        for (key in filters) {
            // console.log(key, user[key], filters[key]);
            if (key == 'category') {
                continue;
            }
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
        if (item.state === state && city.indexOf(item.city) === -1) {
            city.push(item.city);
        }

    })
    res.json(city);

})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})