const helper = require('../lib/helper');
const test = require('tape')
test('adds 1 + 2 to equal 3', (t) => {
  t.equal(helper.sum(1, 2),3);
  t.end();
});

test('convertObjectIntoSortedArray to return an array',(t)=>{
    t.equal(Array.isArray( helper.convertObjectIntoSortedArray({b:12,c:"JAN","a":3})),true)
    t.end();
})

// helper.convertObjectIntoSortedArray({b:12,c:"JAN","a":3})