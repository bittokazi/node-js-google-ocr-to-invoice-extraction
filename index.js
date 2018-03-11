var app = require('express')();
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var request = require('request');
var bodyParser = require('body-parser')

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/fileupload', function(req, res){
    //    console.log(req.body.content);
    //    var form = new formidable.IncomingForm();
    //    form.parse(req, function (err, fields, files) {

    var jsonData = {
        requests: [
            {
                image: {
                    content: req.body.content
                },
                features: [
                    {
                        type: "TEXT_DETECTION"
                    }
                ]
            }
        ]
    };

    var options = {
        url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBFQWJDRfGWJwc2ysavZz4vwONjgaPv0Ro',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        json: true,
        body: jsonData
    };

    request(options, function(err1, res1, body) {
        if (res1 && (res1.statusCode === 200 || res1.statusCode === 201)) {
            var total = 0;
            var total1 = 0;
            var total_x = [];
            var total_y = [];
            var item = [];
            var found = 0;
            var itemList = [];
            var itemNumber = 0;
            var addStart = false;
            var regexCheck = /[-!%^&*()_+|~=`{}\[\]:";'<>?\/]/;
            var data = body.responses[0].textAnnotations;
            var data1 = Object.create(body.responses[0].textAnnotations);
            data.sort(function(a, b) { return a.boundingPoly.vertices[0].y - b.boundingPoly.vertices[0].y; });
            data1.splice(0, 1);
            data1.sort(function(a, b) { return a.boundingPoly.vertices[0].x - b.boundingPoly.vertices[0].x; });
            for(var i=1; i<data.length; i++) {
                if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='total' && data[i-1].description.trim().toLowerCase()=='sub') {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                }
                else if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='amount' && data[i-1].description.trim().toLowerCase()=='net')  {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                }
                else if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='amt' && data[i-1].description.trim().toLowerCase()=='net')  {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                }
                else if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='total' && data[i-1].description.trim().toLowerCase()=='invoice')  {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                }
                else if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='tal')  {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                } else if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='totai') {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                } else if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='total') {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                } else if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='subtotal') {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                } else if(data[i].description.trim().toLowerCase().replace(/[^\w\s]/g,'')=='amount') {
                    console.log(':::::::TOTAL::::::::::::>'+data[i].description.trim().toLowerCase());
                    total_x = [];
                    total_y = [];
                    total_x.push(data[i].boundingPoly.vertices[0].x);
                    total_y.push(data[i].boundingPoly.vertices[0].y);

                    total_x.push(data[i].boundingPoly.vertices[1].x);
                    total_y.push(data[i].boundingPoly.vertices[1].y);

                    total_x.push(data[i].boundingPoly.vertices[2].x);
                    total_y.push(data[i].boundingPoly.vertices[2].y);

                    total_x.push(data[i].boundingPoly.vertices[3].x);
                    total_y.push(data[i].boundingPoly.vertices[3].y);
                }
                if(total_y.length>0) {
                    for(var k=1; k<data.length; k++) {
                        if(total_y[0]-5<data[k].boundingPoly.vertices[0].y && total_y[0]+5>data[k].boundingPoly.vertices[0].y && total_x[0]<data[k].boundingPoly.vertices[0].x) {
                            console.log(k+': '+data[k].description.replace(/[^\d.-]/g,''));
                            if(!isNaN(parseFloat(data[k].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[k].description)) {
                                console.log(data[k].description.replace(/[^\d.-]/g,''));
                                console.log(parseFloat(data[k].description.replace(/[^\d.-]/g,'')));
                                if(total<parseFloat(data[k].description.replace(/[^\d.-]/g,''))) {
                                    total = parseFloat(data[k].description.replace(/[^\d.-]/g,''));
                                    found = 1;
                                }
                            }
                        } else if(total_y[1]-5<data[k].boundingPoly.vertices[1].y && total_y[1]+5>data[k].boundingPoly.vertices[1].y && total_x[1]<data[k].boundingPoly.vertices[1].x) {
                            console.log(k+': '+data[k].description.replace(/[^\d.-]/g,''));
                            if(!isNaN(parseFloat(data[k].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[k].description)) {
                                console.log(data[k].description.replace(/[^\d.-]/g,''));
                                console.log(parseFloat(data[k].description.replace(/[^\d.-]/g,'')));
                                if(total<parseFloat(data[k].description.replace(/[^\d.-]/g,''))) {
                                    total = parseFloat(data[k].description.replace(/[^\d.-]/g,''));
                                    found = 1;
                                }
                            }
                        } else if(total_y[2]-5<data[k].boundingPoly.vertices[2].y && total_y[2]+5>data[k].boundingPoly.vertices[2].y && total_x[2]<data[k].boundingPoly.vertices[2].x) {
                            console.log(k+': '+data[k].description.replace(/[^\d.-]/g,''));
                            if(!isNaN(parseFloat(data[k].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[k].description)) {
                                console.log(data[i].description.replace(/[^\d.-]/g,''));
                                console.log(parseFloat(data[k].description.replace(/[^\d.-]/g,'')));
                                if(total<parseFloat(data[k].description.replace(/[^\d.-]/g,''))) {
                                    total = parseFloat(data[k].description.replace(/[^\d.-]/g,''));
                                    found = 1;
                                }
                            }
                        } else if(total_y[3]-5<data[k].boundingPoly.vertices[3].y && total_y[3]+5>data[k].boundingPoly.vertices[3].y && total_x[3]<data[k].boundingPoly.vertices[3].x) {
                            console.log(k+': '+data[k].description.replace(/[^\d.-]/g,''));
                            if(!isNaN(parseFloat(data[k].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[k].description)) {
                                console.log(data[k].description.replace(/[^\d.-]/g,''));
                                console.log(parseFloat(data[k].description.replace(/[^\d.-]/g,'')));
                                if(total<parseFloat(data[k].description.replace(/[^\d.-]/g,''))) {
                                    total = parseFloat(data[k].description.replace(/[^\d.-]/g,''));
                                    found = 1;
                                }
                            }
                        }
                    }
                    for(var k=1; k<data.length && found == 0; k++) {
                        if(!regexCheck.test(data[k].description) && k>i && total_x[0]-5<data[k].boundingPoly.vertices[0].x && total_x[0]+5>data[k].boundingPoly.vertices[0].x) {
                            console.log(k+':- '+data[k].description.replace(/[^\d.-]/g,''));
                            if(!isNaN(parseFloat(data[k].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[k].description)) {
                                console.log(data[k].description.replace(/[^\d.-]/g,''));
                                console.log(parseFloat(data[k].description.replace(/[^\d.-]/g,'')));
                                if(total<parseFloat(data[k].description.replace(/[^\d.-]/g,''))) {
                                    total = parseFloat(data[k].description.replace(/[^\d.-]/g,''));
                                }
                            }
                        } else if(!regexCheck.test(data[k].description) && k>i && total_x[1]-5<data[k].boundingPoly.vertices[1].x && total_x[1]+5>data[k].boundingPoly.vertices[1].x) {
                            console.log(k+':- '+data[k].description.replace(/[^\d.-]/g,''));
                            if(!isNaN(parseFloat(data[k].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[k].description)) {
                                console.log(data[k].description.replace(/[^\d.-]/g,''));
                                console.log(parseFloat(data[k].description.replace(/[^\d.-]/g,'')));
                                if(total<parseFloat(data[k].description.replace(/[^\d.-]/g,''))) {
                                    total = parseFloat(data[k].description.replace(/[^\d.-]/g,''));
                                }
                            }
                        } else if(!regexCheck.test(data[k].description) && k>i && total_x[2]-5<data[k].boundingPoly.vertices[2].x && total_x[2]+5>data[k].boundingPoly.vertices[2].x) {
                            console.log(k+':- '+data[k].description.replace(/[^\d.-]/g,''));
                            if(!isNaN(parseFloat(data[k].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[k].description)) {
                                console.log(data[i].description.replace(/[^\d.-]/g,''));
                                console.log(parseFloat(data[k].description.replace(/[^\d.-]/g,'')));
                                if(total<parseFloat(data[k].description.replace(/[^\d.-]/g,''))) {
                                    total = parseFloat(data[k].description.replace(/[^\d.-]/g,''));
                                }
                            }
                        } else if(k>i && total_x[3]-5<data[k].boundingPoly.vertices[3].x && total_x[3]+5>data[k].boundingPoly.vertices[3].x) {
                            console.log(k+':- '+data[k].description.replace(/[^\d.-]/g,''));
                            if(!isNaN(parseFloat(data[k].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[k].description)) {
                                console.log(data[k].description.replace(/[^\d.-]/g,''));
                                console.log(parseFloat(data[k].description.replace(/[^\d.-]/g,'')));
                                if(total<parseFloat(data[k].description.replace(/[^\d.-]/g,''))) {
                                    total = parseFloat(data[k].description.replace(/[^\d.-]/g,''));
                                }
                            }
                        }
                    }
                    total_x = [];
                    total_y = [];
                }
                if(!regexCheck.test(data[i].description) && !isNaN(parseFloat(data[i].description.replace(/[^\d.-]/g,'')))) {
                    total1=parseFloat(data[i].description.replace(/[^\d.-]/g,''));
                } else {
                    if(itemList[itemNumber]==undefined) {
                        itemList.push({ item: data[i].description.trim().toLocaleLowerCase() });
                    } else {
                        itemList[itemList.length-1]['item'] = itemList[itemList.length-1]['item']+' '+data[i].description.trim().toLocaleLowerCase();
                    }
                }
                for(var g=0; g<itemList.length; g++) {
                    if(itemList[g].item.indexOf('amount') !== -1) {
                        itemList[itemList.length-1]['item'] = ''; 
                        addStart = true;
                    } else if(itemList[g].item.indexOf('rate') !== -1) {
                        itemList[itemList.length-1]['item'] = ''; 
                        addStart = true;
                    } else if(itemList[g].item.indexOf('qnty') !== -1) {
                        itemList[itemList.length-1]['item'] = ''; 
                        addStart = true;
                    } else if(itemList[g].item.indexOf('total') !== -1) {
                        itemList[itemList.length-1]['item'] = ''; 
                        addStart = true;
                    } else if(itemList[g].item.indexOf('particulars') !== -1) {
                        itemList[itemList.length-1]['item'] = ''; 
                        addStart = true;
                    } else if(itemList[g].item.indexOf('qnt') !== -1) {
                        itemList[itemList.length-1]['item'] = ''; 
                        addStart = true;
                    } else if(itemList[g].item.indexOf('item') !== -1) {
                        itemList[itemList.length-1]['item'] = ''; 
                        addStart = true;
                    }
                }
                if(addStart) {
//                    if(data[i].boundingPoly.vertices[0].x<data[i+1].boundingPoly.vertices[0].x && data[i].boundingPoly.vertices[0].y-5<data[i+1].boundingPoly.vertices[0].y && data[i].boundingPoly.vertices[3].y+5>data[i+1].boundingPoly.vertices[0].y) {
//                        //itemList[itemList.length-1]['item'] = itemList[itemList.length-1]['item']+' '+data[i].description;
//                    } else if(data[i].boundingPoly.vertices[0].x<data[i+1].boundingPoly.vertices[0].x && data[i].boundingPoly.vertices[0].y-5<data[i+1].boundingPoly.vertices[1].y && data[i].boundingPoly.vertices[3].y+5>data[i+1].boundingPoly.vertices[1].y) {
//                        //itemList[itemList.length-1]['item'] = itemList[itemList.length-1]['item']+' '+data[i].description;
//                    } else if(data[i].boundingPoly.vertices[0].x<data[i+1].boundingPoly.vertices[0].x && data[i].boundingPoly.vertices[0].y-5<data[i+1].boundingPoly.vertices[2].y && data[i].boundingPoly.vertices[3].y+5>data[i+1].boundingPoly.vertices[2].y) {
//                        //itemList[itemList.length-1]['item'] = itemList[itemList.length-1]['item']+' '+data[i].description;
//                    } else if(data[i].boundingPoly.vertices[0].x<data[i+1].boundingPoly.vertices[0].x && data[i].boundingPoly.vertices[0].y-5<data[i+1].boundingPoly.vertices[3].y && data[i].boundingPoly.vertices[3].y+5>data[i+1].boundingPoly.vertices[3].y) {
//                        //itemList[itemList.length-1]['item'] = itemList[itemList.length-1]['item']+' '+data[i].description;
//                    } else {
                        if(!isNaN(parseFloat(data[i].description.replace(/[^\d.-]/g,''))) && !regexCheck.test(data[i].description) && data1[data1.length-1].boundingPoly.vertices[1].x-data[i].boundingPoly.vertices[1].x<50) { 
                            itemList[itemList.length-1]['price'] = parseFloat(data[i].description.replace(/[^\d.-]/g,''));
                            itemNumber++;
                        } else {
                            if(itemList[itemNumber]==undefined) {
                                itemList.push({ item: data[i].description });
                            } else {
                                if(data1[i].boundingPoly.vertices[0].x<50) {
                                    itemList[itemList.length-1]['item'] = ''; 
                                }
                            }
                        }
                    //}
                }
            }
            var checkTotal = 0;
            for(var i=0; i<itemList.length; i++) {
                if(itemList[i].price==undefined) {
                    itemList.splice(i, 1);
                    i--;
                } else if(itemList[i].price>=total || itemList[i].price<=0) {
                    itemList.splice(i, 1);
                    i--;
                } else if(itemList[i].item=='') {
                    itemList.splice(i, 1); 
                    i--;
                } else {
                    if(checkTotal+itemList[i].price>total) {
                        itemList.splice(i, 1); 
                        i--;
                    } else {
                        checkTotal = checkTotal+itemList[i].price;   
                    }
                }
            }
            console.log(':::::::::::::::min::::::::: '+data1[0].boundingPoly.vertices[0].x);
            //console.log(body);
            res.write(JSON.stringify({ OCR: body.responses[0].textAnnotations, fullOCR:body, total: total, itemList: itemList }));
            res.end();
        }
        else {
            //console.log(err1);
            res.write(err1);
            res.end();
        }
    });
});

app.listen(server_port, function(){
    console.log('listening on *:'+server_port);
});