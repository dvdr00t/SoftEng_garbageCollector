/**
 *      TESTING CLASS: INTERNAL ORDERS 
 * ==================================
 * 
*/
'use strict'

/* ------------ MODULE IMPORT ------------ */
const dao                   = require('../test_DB/mock_dao');
const IOController = require("../../controller/InternalOrderController");
/* ------------ INITIALIZATION ------------ */
const IO = new IOController(dao);

/**
 *  + ------------------------------------------------ +
 *  |                                                  |
 *  |            INTERNAL ORDERS                       |
 *  |                                                  |
 *  + ------------------------------------------------ +
*/
 describe('get internal order by id', () => {
    beforeEach( () => {
        dao.all.mockReset();
        dao.all.mockReturnValueOnce([
            {
              id: 7,
              issueDate: '2022/5/12 16:23',
              state: 'ISSUED',
              customerId: 4,
              SKUId: 1,
              description: 'New description',
              price: 10000,
              qty: 1
            }
          ]).mockReturnValueOnce([
            {
              id: 2,
              issueDate: '2022/5/12 16:20',
              state: 'COMPLETED',
              customerId: 4,
              SKUId: 1,
              description: 'New description',
              price: 10000,
              qty: 1
            }
          ]).mockReturnValueOnce([
            {
              SKUId: 1,
              description: 'New description',
              price: 10000,
              RFID: '12345678901234567890123456789016'
            }
          ])
    })

    
    test('get internal order by id', async() => {
        let res = await IO.getInternalOrderById(7);
        console.log(res)
        expect(res).toEqual({
            id: 7,
            issueDate: '2022/5/12 16:23',
            state: 'ISSUED',
            customerId: 4,
            products: [
              { SKUId: 1, description: 'New description', price: 10000, qty: 1 }
            ]
          });
        res = await IO.getInternalOrderById(2);
        console.log(res)
        expect(res).toEqual({
            id: 2,
            issueDate: '2022/5/12 16:20',
            state: 'COMPLETED',
            customerId: 4,
            products: [
              {
                SKUId: 1,
                description: 'New description',
                price: 10000,
                RFID: '12345678901234567890123456789016'
              }
            ]
          });
    })
    
});

 /**
  * API:
  *                GET /api/internalOrders
  * =================================================
  */

  describe('get internal orders', () => {
    beforeEach( () => {
        dao.all.mockReset();
        dao.all.mockReturnValueOnce([
            {
              id: 2,
              issueDate: '2022/5/12 16:20',
              state: 'COMPLETED',
              customerId: 4
            },
            {
              id: 3,
              issueDate: '2022/5/12 16:20',
              state: 'ACCEPTED',
              customerId: 4
            }
          ]).mockReturnValueOnce(
            [{
                SKUId: 1,
                description: 'New description',
                price: 10000,
                RFID: '12345678901234567890123456789016'
              }]
          ).mockReturnValueOnce([
            { 
                SKUId: 1, 
                description: 'New description', 
                price: 10000, 
                qty: 1 }
          ])
    })

    
    test('get internal orders', async() => {
        let res = await IO.getInternalOrders();
        console.log(res)
        expect(res.length).toEqual([{
            id: 2,
            issueDate: '2022/5/12 16:20',
            state: 'COMPLETED',
            customerId: 4,
            products: [
              {
                SKUId: 1,
                description: 'New description',
                price: 10000,
                RFID: '12345678901234567890123456789016'
              }]},
              {
                id: 3,
                issueDate: '2022/5/12 16:20',
                state: 'ACCEPTED',
                customerId: 4,
                products: [
                  { SKUId: 1, 
                    description: 'New description', 
                    price: 10000, 
                    qty: 1 }
                ]
              }].length);
        
    })
    
});

/**
 * API:
 *                GET /api/internalOrdersIssued
 * =================================================
 */

 describe('get internal orders issued', () => {
  beforeEach( () => {
      dao.all.mockReset();
      dao.all.mockReturnValueOnce(
        [
          {
            id: 7,
            issueDate: '2022/5/12 16:23',
            state: 'ISSUED',
            customerId: 4
          },
          {
            id: 8,
            issueDate: '2022/5/12 16:24',
            state: 'ISSUED',
            customerId: 4
          },
          {
            id: 9,
            issueDate: '2022/5/12 16:26',
            state: 'ISSUED',
            customerId: 4
          }
        ]).mockReturnValueOnce(
          [
            {
              id: 7,
              SKUId: 1,
              description: 'New description',
              price: 10000,
              qty: 1
            }
          ]
        ).mockReturnValueOnce([
          {
            id: 8,
            SKUId: 1,
            description: 'New description',
            price: 10000,
            qty: 1
          }
        ] ).mockReturnValueOnce(
          [
            {
              id: 9,
              SKUId: 1,
              description: 'New description',
              price: 10000,
              qty: 1
            }
          ]
        )
  })

  
  test('get internal orders issued', async() => {
      let res = await IO.getInternalOrdersIssued();
      console.log(res)
      expect(res).toEqual([
        {
          id: 7,
          issueDate: '2022/5/12 16:23',
          state: 'ISSUED',
          customerId: 4,
          products: [
            { SKUId: 1, description: 'New description', price: 10000, qty: 1 }
          ]
        },
        {
          id: 8,
          issueDate: '2022/5/12 16:24',
          state: 'ISSUED',
          customerId: 4,
          products: [
            { SKUId: 1, description: 'New description', price: 10000, qty: 1 }
          ]
        },
        {
          id: 9,
          issueDate: '2022/5/12 16:26',
          state: 'ISSUED',
          customerId: 4,
          products: [
            { SKUId: 1, description: 'New description', price: 10000, qty: 1 }
          ]
        }]);
      
  })
  
});

 /**
  * API:
  *                GET /api/internalOrdersAccepted
  * =================================================
  */

  describe('get internal orders accepted', () => {
    beforeEach( () => {
        dao.all.mockReset();
        dao.all.mockReturnValueOnce(
          [
            {
              id: 3,
              issueDate: '2022/5/12 16:20',
              state: 'ACCEPTED',
              customerId: 4
            },
            {
              id: 23,
              issueDate: '2022/5/12 17:27',
              state: 'ACCEPTED',
              customerId: 4
            }
          ]).mockReturnValueOnce(
            [
              {
                id: 3,
                SKUId: 1,
                description: 'New description',
                price: 10000,
                qty: 1
              }
            ]
          ).mockReturnValueOnce([ 
            { id: 23, 
              SKUId: 2, 
              description: '0',
              price: 0.01, 
              qty: 1 } 
        
          
        ] 
          )
    })
  
    
    test('get internal orders accepted', async() => {
        let res = await IO.getInternalOrdersAccepted();
        console.log(res)
        expect(res).toEqual([
          {
            id: 3,
            issueDate: '2022/5/12 16:20',
            state: 'ACCEPTED',
            customerId: 4,
            products: [
              { SKUId: 1, description: 'New description', price: 10000, qty: 1 }
            ]
          },
          {
            id: 23,
            issueDate: '2022/5/12 17:27',
            state: 'ACCEPTED',
            customerId: 4,
            products: [ { SKUId: 2, description: '0', price: 0.01, qty: 1 } ]
          }]);
        
    })
    
  });
  
  
/**
 * API:
 *             POST /api/internalOrders
 * =================================================
 */
 describe('create internal order', () => {
  beforeEach( () => {
      dao.get.mockReset();
      dao.get.mockReturnValueOnce({id:1}).mockReturnValueOnce({id:2});
      dao.run.mockReset();
      dao.run.mockReturnValueOnce({ id: 2 }).mockReturnValueOnce({id:3});


  })

  
  test('create internal order', async() => {

      let issueDate = "2021/11/29 09:33";
      const products= [{SKUId:12,description:"a product",price:10.99,qty:30},
                      {SKUId:180,description: "another product",price:11.99,qty:20}];
      console.log(products);
      let customerId = 1;

      let res = await IO.createInternalOrder(issueDate,products,customerId);
      console.log(res)
      expect(res).toEqual(2);

      res = await IO.createInternalOrder(issueDate,products,customerId);
      console.log(res)
      expect(res).toEqual(3);
    
  })
  
});

/**
 * API:
 *            PUT /api/internalOrders/:id
 * =================================================
 */
 describe('modify internal orders state', () => {
  beforeEach( () => {
      dao.get.mockReset();
      dao.get.mockReturnValueOnce({
        id: 1,
        issueDate: '2022/05/21 09:33',
        state: 'ISSUED',
        customerId: 1,
        SKUId: 12,
        description: 'a product',
        price: 10.99,
        RFID: null
      })
      .mockReturnValueOnce({
        id: 2,
        issueDate: '2022/05/21 09:33',
        state: 'ACCEPTED',
        customerId: 1,
        SKUId: 12,
        description: 'a product',
        price: 10.99,
        RFID: null
      })
      .mockReturnValueOnce({
        min_id : 1
      }).mockReturnValueOnce({
        min_id : 2
      }).mockReturnValueOnce(null);
        dao.run.mockReset();
        dao.run.mockReturnValueOnce({ id: 1 }).mockReturnValueOnce({id:2});
    })
        

  
  test('modify internal orders state', async() => {

     
      let res = await IO.modifyInternalOrderState(1,'CANCELED',undefined);
      console.log(res)
      expect(res).toEqual(1);

      res = await IO.modifyInternalOrderState(2,'COMPLETED',[{"SkuID":1,"RFID":"12345678901234567890123456789016"},{"SkuID":1,"RFID":"12345678901234567890123456789038"}]);
      console.log(res)
      expect(res).toEqual(2);

      res = await IO.modifyInternalOrderState(1,'CANCELED',undefined);
      console.log(res)
      expect(res).toEqual({message: "Not Found"});
    
  })
  
});

/**
 * API:
 *                DELETE /api/internalOrders/:id
 * =================================================
 */
 describe('delete internal order', () => {
  beforeEach( () => {
      dao.run.mockReset();
      dao.run.mockReturnValueOnce({ id: 1 }).mockReturnValueOnce({id:2});


  })

  
  test('delete internal order', async() => {

      let res = await IO.deleteInternalOrder(1);
      console.log(res)
      expect(res).toEqual(1);

      res = await IO.deleteInternalOrder(2);
      console.log(res)
      expect(res).toEqual(2);
    
  })
  
});