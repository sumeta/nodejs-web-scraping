module.exports = (function() {
	'use strict';
	var router = require('express').Router();
    var request = require('request');
    var cheerio = require('cheerio');

	router.get('/', function(req, res) {

        var getLast = function(callback){
            callback('SET');
        }

        function scanSet(){
            var url = 'https://marketdata.set.or.th/mkt/marketsummary.do?language=th&country=TH';

            console.log(url);

            request(url, function(error, response, html){
                if(!error){
                    var $ = cheerio.load(html);
                    var d = new Date();
                    var curr_second = d.getSeconds();
                    var curr_minute = d.getMinutes();
                    var curr_hour = d.getHours();
                    var curr_date = d.getDate();
                    var curr_month = d.getMonth() + 1;
                    var curr_year = d.getFullYear();
                    // 2017-07-30 15:48:09
                    var curr = curr_year + "-" + curr_month + "-" + curr_date + ' ' + curr_hour + ':' + curr_minute + ':' + curr_second;

                    console.log(' --> scraping start :' + curr);
                    var set = {};
                    var set50 = {};
                    var set100 = {};
                    var marketStatus = 'O';
                    $('#maincontent > div > div:nth-child(3) > div > div > table > tbody').filter(function(){
                        var pages = $(this);
                        var firstRow = pages.find('tr:nth-child(1)');
                        var seconRow = pages.find('tr:nth-child(2)');
                        var threeRow = pages.find('tr:nth-child(3)');

                        set.last = firstRow.find('td').eq(1).text().trim().replace(/,/g, '');
                        set.change = firstRow.find('td').eq(2).text().trim().replace(/,/g, '');
                        set.changePer = firstRow.find('td').eq(3).text().trim().replace(/,/g, '');
                        set.high = firstRow.find('td').eq(4).text().trim().replace(/,/g, '');
                        set.low = firstRow.find('td').eq(5).text().trim().replace(/,/g, '');
                        set.vol = firstRow.find('td').eq(6).text().trim().replace(/,/g, '');
                        set.val = firstRow.find('td').eq(7).text().trim().replace(/,/g, '');
                        console.info('--> set last : ' + set.last);

                        set50.last = seconRow.find('td').eq(1).text().trim().replace(/,/g, '');
                        set50.change = seconRow.find('td').eq(2).text().trim().replace(/,/g, '');
                        set50.changePer = seconRow.find('td').eq(3).text().trim().replace(/,/g, '');
                        set50.high = seconRow.find('td').eq(4).text().trim().replace(/,/g, '');
                        set50.low = seconRow.find('td').eq(5).text().trim().replace(/,/g, '');
                        set50.vol = seconRow.find('td').eq(6).text().trim().replace(/,/g, '');
                        set50.val = seconRow.find('td').eq(7).text().trim().replace(/,/g, '');
                        console.info('--> set50 last : ' + set50.last);

                        set100.last = threeRow.find('td').eq(1).text().trim().replace(/,/g, '');
                        set100.change = threeRow.find('td').eq(2).text().trim().replace(/,/g, '');
                        set100.changePer = threeRow.find('td').eq(3).text().trim().replace(/,/g, '');
                        set100.high = threeRow.find('td').eq(4).text().trim().replace(/,/g, '');
                        set100.low = threeRow.find('td').eq(5).text().trim().replace(/,/g, '');
                        set100.vol = threeRow.find('td').eq(6).text().trim().replace(/,/g, '');
                        set100.val = threeRow.find('td').eq(7).text().trim().replace(/,/g, '');
                        console.info('--> set100 last : ' + set100.last);

                        marketStatus = $("#maincontent > div > div:nth-child(5) > div:nth-child(1) > div:nth-child(3)").find("span").text();

                        getLast(function(data,callback){
                            console.log('Set Change ',set.change);
                        });
                        
                        res.json({'status':'scraping set start at time ' + curr});
                    });
                }
            })
        }

        scanSet();

        setInterval( () => {
            scanSet();
        },100000)

	});

	router.post('/', function(req, res) {

	});

	return router;
})();