var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });
    describe('Virtuals',function(){
        describe('created',function(){
            it('returns time order placed',function(){
                var order = new Order();
                expect(order.created).to.be.instanceof(Date);
            })
        })

    });
    describe('methods',function(){
        var order;
        beforeEach(function(done){
            order = new Order({
                sessionId:'test',
            });
            order.save(done);
        })
        describe('updateOrderState',function(){
            it('should update order state accordingly',function(done){
                expect(order.orderState).to.be.equal('Created');
                order.updateOrderState('Processing');
                expect(order.orderState).to.be.equal('Processing');
                order.updateOrderState('Cancelled');
                expect(order.orderState).to.be.equal('Cancelled');
                order.updateOrderState('Completed');
                expect(order.orderState).to.be.equal('Completed');    
                done();
            })
        })
    })
});





