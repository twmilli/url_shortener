# url_shortener

Project to learn node js <br />
* shortens urls (would work better if domain name I deployed it on was short)
* utilizes a mongodb deployed on mlab to store URL hashes <br/>
* deployed on heroku: https://secure-crag-25604.herokuapp.com/ <br/>

Example Usage: <br/> <br/>

https://secure-crag-25604.herokuapp.com/new/http://www.foo.com <br/>
https://secure-crag-25604.herokuapp.com/new/http://www.google.com <br />
Example creation output: <br/>

{ "original_url": "http://www.google.com", "short_url": "http://secure-crag-25604.herokuapp.com/7WRqMz" }
