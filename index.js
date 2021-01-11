const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let skuEmpty = {}
// Where we will keep books
let sku = {
    "basket": [
        {
            "productId": 1226739,
            "skuId": 301526,
            "deliveryTime": "Dit product ontvang je direct in je mailbox",
            "fulfillmentType": "VOUCHER",
            "phoneNumberRequired": false,
            "ageRestriction": false,
            "title": "My first voucher",
            "price": 0,
            "availableStock": 1,
            "mediaUrl": "/punten/media/file/19470777.jpg",
            "quantity": 1,
            "extraCostValue": 0
        },
        {
            "productId": 1007404,
            "skuId": 302396,
            "deliveryTime": "Binnen 5 werkdagen in huis",
            "fulfillmentType": "DROP_SHIP",
            "phoneNumberRequired": false,
            "ageRestriction": false,
            "title": "Kneipp Home Fragrances Pakket",
            "price": 26,
            "availableStock": 4,
            "mediaUrl": "/punten/media/file/23547936.jpg",
            "quantity": 1,
            "extraCostValue": 0
        },
        {
            "productId": 1006739,
            "skuId": 301586,
            "deliveryTime": "Dit product ontvang je direct in je mailbox",
            "fulfillmentType": "VOUCHER",
            "phoneNumberRequired": false,
            "ageRestriction": false,
            "title": "Philips Hue 20% kortingsvoucher",
            "price": 0,
            "availableStock": 301,
            "mediaUrl": "/punten/media/file/19470777.jpg",
            "quantity": 1,
            "extraCostValue": 0
        }
    ],
    "basketSummary": {
        "quantity": 2,
        "price": 26,
        "extraCostValue": 0,
        "totalPrice": 26
    }
}

let accountData = {
    "accounts": [
        {
            "number": "5248123456781234",
            "name": "Manjunath Mallya Konaje",
            "amount": 27
        }
    ]
}

let addressData = {
    "correspondenceName":"Hr J Ritsma",
    "addresses":[
        {
            "addressIndex":1,
            "street":"Pietje puk straat",
            "houseNumber":"6",
            "houseNumberAddition":"",
            "postalCode":"1335HK",
            "city":"Almere"
        }
    ],
    "personalEmailAddress":"j.ritsma@ing.com",
    "phoneNumber":"0031-123456789"
}


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/getSku', (req, res) => {
    res.json(sku);
});

app.get('/getAddress', (req, res) => {
    res.json(addressData);
});

app.get('/getAccountData', (req, res) => {
    res.json(accountData);
});

app.post('/updateAccountBalance', (req, res) => {
    // We will be coding here
    const addressRequest = req.body;
    for (const account of accountData.accounts) {
        if (account.number === addressRequest.number) {
            account.amount -= addressRequest.basketPrice
        }
    }
    res.send(accountData);
});

app.post('/updateAddress', (req, res) => {
    // We will be coding here
    const accountRequest = req.body;
    addressData.correspondenceName = accountRequest.name
    addressData.addresses[0].postalCode = accountRequest.postalCode
    addressData.addresses[0].street = accountRequest.street
    addressData.addresses[0].city = accountRequest.city
    addressData.addresses[0].houseNumber = accountRequest.houseNumber
    addressData.phoneNumber = accountRequest.phone
    res.send(addressData);
});

app.post('/updateSku', (req, res) => {
    // We will be coding here
    const basketdata = req.body;
    for(const data of basketdata) {
        for (const [index,skuItem] of sku.basket.entries()) {
            if (skuItem.productId === data.productId) {
                skuItem.availableStock -= data.quantity
                if(skuItem.availableStock == 0) {
                    sku.basket.splice(index,1)
                }
            }
        }
    }
    res.send(sku);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
