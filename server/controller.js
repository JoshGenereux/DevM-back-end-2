const houses = require('./db.json')
let globalId = 4;

module.exports = {
    createHouse: (req, res)=> {
        const {address, price, imageURL} = req.body
        let newHouse = {
            address,
            price,
            imageURL,
            id: globalId
        }
        houses.push(newHouse)
        res.status(200).send()
        globalId++;
    },
    getHouses: (req, res) =>{
        res.status(200).send(houses)
    },
    updateHouse: (req, res)=> {
        let {id} = req.params;
        let {type} = req.body;
        let index = houses.findIndex(house => +house.id === +id)

        if(type === 'plus'){
            houses[index].price += 10000;
            console.log(`house price = ${houses[index].price}`)
            res.status(200).send(houses)
        } else if(type === 'minus' && houses[index].price >= 10001){
            houses[index].price -= 10000;
            console.log(`house price = ${houses[index].price}`)
            res.status(200).send(houses)
        }
    },
    deleteHouse: (req, res)=> {
        let id = req.params.id;
        let index = houses.findIndex(house => +house.id === +id)
        houses.splice(index, 1);
        res.status(200).send(houses)
    }
}
