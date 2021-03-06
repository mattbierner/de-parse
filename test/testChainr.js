define(['parse/parse', 'parse/lang', 'parse/text'],
function(parse, parse_lang, parse_text){
    var add = parse.next(parse_text.character('+'), parse.always(function(x, y){ return x + y; }));
    var mul = parse.next(parse_text.character('*'), parse.always(function(x, y){ return x * y; }));
    var op = parse.either(add, mul);
    
    var num = parse.bind(parse_text.digit, function(x){ return parse.always(parseInt(x)); });
    
    return {
        'module': "parse_lang.chainr*",
        'tests': [
            ["chainr1",
            function(){
                var a = parse_lang.chainr1(op, num);
                
                assert.deepEqual(parse.run(a, "1"), 1);
                assert.deepEqual(parse.run(a, "1+2"), 3);
                assert.deepEqual(parse.run(a, "1+2*3"), 7);
                assert.deepEqual(parse.run(a, "1*2+3"), 5);
            }],
            ["chainr",
            function(){
                var a = parse_lang.chainr(op, 30, num);
                
                assert.deepEqual(parse.run(a, ""), 30);
                assert.deepEqual(parse.run(a, "+"), 30);
                assert.deepEqual(parse.run(a, "1"), 1);
                assert.deepEqual(parse.run(a, "1+2"), 3);
                assert.deepEqual(parse.run(a, "1+2*3"), 7);
                assert.deepEqual(parse.run(a, "1*2+3"), 5);
            }],
        ],
    };
});
