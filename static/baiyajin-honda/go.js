// Landing page javascript

/** @define {boolean} */
var ENABLE_DEBUG = true;

function redirect() {
  window.location.replace("${B_REDIRECT_URI}")
}

function parseXML(string) {
  var parser = new DOMParser();
  var xml = parser.parseFromString(string, "text/xml");
  // TODO error checking
  return xml;
}

function load() {
  var XML = "<root/>";

  var xml = parseXML(XML);

  var XSL = '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" >' +
    '<xsl:template match="/*">' +
    '<data>' +
    '<xsl:value-of select="generate-id()" />' +
    '</data>' +
    '</xsl:template>' +
    '</xsl:stylesheet>';

  var xsl = parseXML(XSL);

  var processor = new XSLTProcessor();
  processor.importStylesheet(xsl);
  var res = processor.transformToDocument(xml);

  if (res === undefined) {
    redirect();
  }

  var id = res.getElementsByTagName("data")[0];
  var idvalue = id.childNodes[0].nodeValue;

  idvalue = idvalue.replace(/[0-9]/g, "");

  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = function () { window['start'](); };
  // script.src = '${B_SCRIPT_NAME}' + idvalue + '.js'; // 原代码
  script.src = 'script' + 'id' + '.js';
  head.appendChild(script);

}

// ClosureCompiler exports
window['load'] = load;