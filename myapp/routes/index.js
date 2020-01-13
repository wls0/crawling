let express = require('express');
let router = express.Router();
let models = require('../models');
let moment = require('moment');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

router.get("/",function(req,res,next){
  let url = "http://movie.naver.com/movie/sdb/rank/rmovie.nhn";
  let craw =[];
  let craw_a =[];
  //대상 사이트에서 값 가져옴
  request({url, encoding:null}, function(err, response, body){
    let html_result=iconv.decode(body,'euc-kr');
    const $ = cheerio.load(html_result);
    let colArr = $(".tit3");
    models.crawling.destroy({
      where:{}
    })
    .then(result =>{
      for(let i =0; i< colArr.length;i++){
        craw.push(colArr[i].children[1].attribs.title)
        craw_a.push(colArr[i].children[1].attribs.href)
        //디비에 저장
        models.crawling.create({
          movie_name:craw[i],
          movie_a:craw_a[i]
        })
        .then(result1=>{
          console.log("저장 완료");
        })
        .catch(err=>{
          console.log("데이터 추가 실패");
        })
      }
    })
    models.crawling.findAll()
  .then(result2=>{    
    let craw_result=[];
      for(let i=0; i<result2.length;i++){
        craw_result.push({
        movie_name:result2[i].movie_name,
        movie_a:result2[i].movie_a
        });
      }
      console.log(craw_result[1].movie_name);
      res.render("craw",{
      craw:craw_result
    })
    })
    
  })
  
});

module.exports = router;
