/* Modal Dialog Box
   * copyright 8th July 2006 by Stephen Chapman
   * http://javascript.about.com/
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function pageWidth() {
    return window.innerWidth != null? window.innerWidth: document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth:document.body != null? document.body.clientWidth:null;
}
function pageHeight() {
    return window.innerHeight != null? window.innerHeight: document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight:document.body != null? document.body.clientHeight:null;
}
function posLeft() {
    return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement && document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;
}
function posTop() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement && document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;
}
function getID(x){
    return document.getElementById(x);
}
function scrollFix(){
    var obol=getID('ol');
    obol.style.top=posTop()+'px';
    obol.style.left=posLeft()+'px'
    }
    function sizeFix(){
    var obol=getID('ol');
    obol.style.height=pageHeight()+'px';
    obol.style.width=pageWidth()+'px';
}
function kp(e){
    ky=e?e.which:event.keyCode;
    if(ky==88||ky==120)hm();
    return false
    }
    function inf(h){
//    tag=document.getElementsByTagName('select');
//    for(i=tag.length-1;i>=0;i--)tag[i].style.visibility=h;
     tag=document.getElementsByTagName('iframe');
    for(i=tag.length-1;i>=0;i--)tag[i].style.visibility=h;
    tag=document.getElementsByTagName('object');
    for(i=tag.length-1;i>=0;i--)tag[i].style.visibility=h;
}
function sm(obl, wd, ht){
    var h='hidden';
    var b='block';
    var p='px';
    var obol=getID('ol');
    var obbxd = getID('mbd');
    obbxd.innerHTML = getID(obl).innerHTML;
    obol.style.height=pageHeight()+p;
    obol.style.width=pageWidth()+p;
    obol.style.top=posTop()+p;
    obol.style.left=posLeft()+p;
    obol.style.display=b;    
    var tp=posTop()+((pageHeight()-ht)/2)-12;
    var lt=posLeft()+((pageWidth()-wd)/2)-12;
    var obbx=getID('mbox');
    obbx.style.top=(tp<0?0:tp)+p;
    obbx.style.left=(lt<0?0:lt)+p;
    obbx.style.width=wd+p;
    obbx.style.height=ht+p;
    inf(h);
    obbx.style.display=b;	
    if("IE6" == GetBrowserType())
    {
    	$("#mbd").bgiframe();
    }
    
    return false;
}
function hm(){
    var v='visible';
    var n='none';
    getID('ol').style.display=n;
    getID('mbox').style.display=n;
    inf(v);
    document.onkeypress=''
    }
    function initmb(){
    var ab='absolute';
    var n='none';
    var obody=document.getElementsByTagName('body')[0];
    var frag=document.createDocumentFragment();
    var obol=document.createElement('div');
    obol.setAttribute('id','ol');
    obol.style.display=n;
    obol.style.position=ab;
    obol.style.top=0;
    obol.style.left=0;
    obol.style.zIndex=998;
    obol.style.width='100%';
    frag.appendChild(obol);
    var obbx=document.createElement('div');
    obbx.setAttribute('id','mbox');
    obbx.style.display=n;
    obbx.style.position=ab;
    obbx.style.zIndex=999;
    var obl=document.createElement('span');
    obbx.appendChild(obl);
    var obbxd=document.createElement('div');
    obbxd.setAttribute('id','mbd');
    obl.appendChild(obbxd);
    frag.insertBefore(obbx,obol.nextSibling);
    obody.insertBefore(frag,obody.firstChild);
    window.onscroll = scrollFix;
    window.onresize = sizeFix;
}

                  