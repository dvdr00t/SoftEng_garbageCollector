/**
 *  UNIT TEST: itemDAO
 */

/* --------- IMPORT MODULES --------- */
const IDAO    = require('../../../db/itemDAO');
const mockDAO   = require('../Database/mockDAO');

/* --------- INITIALIZATION --------- */
const i = new IDAO(mockDAO);

/*
======================================================
||                    TESTING CASES                   ||
 ======================================================
*/
tis=[{
id:14,
description : "a new item",
price : 10.99,
SKUId : 1,
supplierId : 2
},{
id:15,
description : "another item",
price : 12.99,
SKUId : 2,
supplierId : 1
}];

tis1={
newDescription : "a new sku",
newPrice : 10.99
}

tis2={
id:6,
description : "a new sku",
price : 10.99,
SKUId : 1,
supplierId : 2
}

/*
------------------------------------------------------
|          GET  /api/items                 |
------------------------------------------------------
*/



describe('get items', ()=> { 
    beforeAll(async() => {
        mockDAO.all.mockReset();
        mockDAO.all.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject({message: "testError"});
            });
        });

})


//200
getItems("Success",Error);

})



/*
------------------------------------------------------
|          GET  /api/items/:id             |
------------------------------------------------------
*/

describe('get item by id', ()=> { 
    beforeAll(async () => {
        mockDAO.get.mockReset();
        mockDAO.get.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject({message: "testError"});
            });
        })
})



//500
<<<<<<< HEAD
getItemById("Error",tis[0].id,tis[0]);
=======
getItemById("Error",tis[0].id,tis[0].supplierId,tis[0]);
>>>>>>> delivery_changes

})



/*
------------------------------------------------------
|             POST  /api/item              |
------------------------------------------------------
*/



describe('add item', ()=> { 
    beforeAll(async () => {
        mockDAO.run.mockReset();
        mockDAO.run.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject({message: "testError"});
            });
        })
})


//201
createItem("Error",tis[0],tis[0]);

})




/*
------------------------------------------------------
|            PUT  /api/item/:id            |
------------------------------------------------------
*/



describe('edit item', ()=> { 
    beforeAll(async () => {
        mockDAO.run.mockReset();
        mockDAO.run.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject({message: "testError"});
            });
        })
})



//200
<<<<<<< HEAD
modyfyItem("error",tis2,tis[0].id,tis1);
=======
modyfyItem("error",tis2,tis[0].id,tis[0].supplierId,tis1);
>>>>>>> delivery_changes

})



/*
------------------------------------------------------
|            DELETE  /api/item/:id         |
------------------------------------------------------
*/


describe('delete item', ()=> { //
    beforeAll(async () => {
        mockDAO.run.mockReset();
        mockDAO.run.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject({message: "testError"});
            });
        })
})



//204
<<<<<<< HEAD
deleteItem("Error",tis[0],tis[0].id)
=======
deleteItem("Error",tis[0],tis[0].id,tis[0].supplierId)
>>>>>>> delivery_changes



})


/*
------------------------------------------------------
|            GET        getItemBySupSKUID              |
------------------------------------------------------
*/


describe('get item skuid an supplier', ()=> { //

    beforeAll(async () => {
        mockDAO.get.mockReset();
        mockDAO.get.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject({message: "testError"});
            });
        })
})



//204
getItemBySupSKUID("error",tis[0],tis[0].SKUId, tis[0].supplierId);



})





/*
------------------------------------------------------
|            GET        getItemBySupId              |
------------------------------------------------------
*/


describe('get item id and supplier', ()=> { //
    beforeAll(async () => {
        mockDAO.get.mockReset();
        mockDAO.get.mockImplementationOnce(() => {
            return new Promise((resolve, reject) => {
                reject({message: "testError"});
            });
        })
})



//204
getItemBySupId("error",Error,tis[0].id, tis[0].supplierId);



})


/*
======================================================================
||        DEFINITIONS OF THE TESTING FUNCTIONS TEST DESCRIPTOR        ||
======================================================================
*/


function getItems(name,expected){

test(name, async () => {
<<<<<<< HEAD
try {
let res = await i.getItems();
expect(res).toEqual(expected)
} catch (error) {
expect(error).toBeInstanceOf(expected);
}
})
}


function getItemById(name,id,expected){
=======
    try {
        let res = await i.getItems();
        expect(res).toEqual(expected)
    } catch (error) {
        expect(error).toBeInstanceOf(expected);
    }
    })
}


function getItemById(name,id,supplierId,expected){
>>>>>>> delivery_changes

test(name, async () => {

try {
<<<<<<< HEAD
let res = await i.getItemById(id);
=======
let res = await i.getItemById(id,supplierId);
>>>>>>> delivery_changes
expect(res).toEqual(expected)
} catch (error) {
expect(error).toBeInstanceOf(Error);
}
})
}


function createItem(name,expected,json){

test(name, async () => {
try {
let res = await i.createItem(json);
expect(res).toEqual(expected)
} catch (error) {
expect(error).toBeInstanceOf(Error);
}
})
}


<<<<<<< HEAD
function modyfyItem(name,expected,id,json){
=======
function modyfyItem(name,expected,id,supplierId,json){
>>>>>>> delivery_changes


test(name, async () => {
try {
<<<<<<< HEAD
let res = await i.modifyItem(id,json);
=======
let res = await i.modifyItem(id,supplierId,json);
>>>>>>> delivery_changes
expect(res).toEqual(expected)
} catch (error) {
expect(error).toBeInstanceOf(Error);
}
})
}

<<<<<<< HEAD
function deleteItem(name,expected,id){
=======
function deleteItem(name,expected,id,supplierId){
>>>>>>> delivery_changes

test(name, async () => {

try {
<<<<<<< HEAD
let res = await i.deleteItem(id);
=======
let res = await i.deleteItem(id,supplierId);
>>>>>>> delivery_changes
expect(res).toEqual(expected)
} catch (error) {
expect(error).toBeInstanceOf(Error);
}
})

}

function getItemBySupSKUID(name,expected,skuid,supplierid){

test(name, async () => {

try {
let res = await i.getItemBySupSKUID(skuid,supplierid);
expect(res).toEqual(expected)
} catch (error) {
expect(error).toBeInstanceOf(Error);
}
})

}


function getItemBySupId(name,expected,id,supplierid){

test(name, async () => {

try {
let res = await i.getItemBySupId(id,supplierid);
expect(res).toEqual(expected)
} catch (error) {
expect(error).toBeInstanceOf(expected);
}
})

}