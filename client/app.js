const $ = require('jquery');
const jQuery = $;
require('jquery.soap');
const convert = require('xml-js');

new Vue({
  el: '#app',
  data(){
    return {
      page: 1,
      news: []
    }
  },
  mounted() {
    this.changePage(1);
  },
  methods: {
    changePage(page) {
      if (!isNaN(page)) {
    $.soap({
      url: 'http://localhost:3030/soap/',
      method: 'getNews',
      appendMethodToURL: false,
      crossOrigin: false,

      data: `
        <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:helloservice">
           <soapenv:Header/>
           <soapenv:Body>
              <urn:getNews soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                 <page xsi:type="xsd:int">${page}</page>
              </urn:getNews>
           </soapenv:Body>
        </soapenv:Envelope>
      `,

      success: soapResponse => {
          this.news = convert.xml2js(soapResponse.toString())
          .elements[0]
          .elements[0]
          .elements[0]
          .elements[0]
          .elements
          .map(e => {
            const o = {};
            e.elements.forEach(p => {
              o[p.name] = p.elements ? p.elements[0].text : '';
            });
            return o;
          });
      },
      error: function (SOAPResponse) {
          console.error('E1', SOAPResponse);
      }
  });
      }
    },
  	changeMessage() {
  		this.message.hello = 'хелоу';
  	}
  }
})