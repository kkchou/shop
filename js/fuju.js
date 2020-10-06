/*
  
*/

/*
  common
*/

function getURL(){
    return location.href;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function tableFromJson(jsonData,table_id,content_id,show_header){
    var col = [];
	
    for (var i = 0; i < jsonData.length; i++) {
        for (var key in jsonData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    
	//建立table dom
    var table = document.createElement("table");
	table.id = table_id;
	table.className = 'table table-hover table-bordered';

	
	//是否產生tabel header
	if(show_header){
	    var tr = table.insertRow(-1); 
	    for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // table header.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
	}

	//產生table資料
	for (var i = 0; i < jsonData.length; i++) {
        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonData[i][col[j]];
        }
    }
	
	//append到哪個元件下
	var content = document.getElementById(content_id);
    content.innerHTML = "";
    content.appendChild(table);
}

function arrayToTable(tableData) {
    var table = $('<table class=\"table table-hover table-bordered\" id=\"list2\"></table>');
    $(tableData).each(function (i, rowData) {
        var row = $('<tr></tr>');
        $(rowData).each(function (j, cellData) {
            row.append($('<td>'+cellData+'</td>'));
        });
        table.append(row);
    });
    return table;
}

function getCellValueOnClick(table_id){
	$('#'+table_id).find('td').click(function(){
		var value = $(this).text();
		console.log(value);
        return value;
    });
}

function showPopup(popup_id){
	$('#'+popup_id).popup('show');
}

function addTableRowPopupEvent(table_id,popup_id) {
    var table = document.getElementById(table_id);
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = 
            function(row) 
            {
                return function() { 
				    //var cell = row.getElementsByTagName("td")[1];
                    //var id = cell.innerHTML;
                    showPopup(popup_id);
                };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}

/*
  cookie
*/

function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    
    for (var i=0, l=cookieAry.length; i<l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    
    return cookieObj;
}

function createCookie(name,value){
	document.cookie = name+'='+value;
}

function modifyCookie(name,value){
	createCookie(name,value)
}

function removeCookieByName(name){
	document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }

    return value;
}
//getCookieByName('username')。



/* 購物 */
/* 資料 */
//產品類別
var categories = [
	   {"category_id":"1","category_name":"處理器(CPU)"}
	  ,{"category_id":"2","category_name":"主機板(MB)"}
	  ,{"category_id":"3","category_name":"記憶體(RAM)"}
	  ,{"category_id":"4","category_name":"硬碟(HD/SSD)"}
	  ,{"category_id":"5","category_name":"顯示卡(VGA)"}
	  ,{"category_id":"6","category_name":"機殼(case)"}
	  ,{"category_id":"7","category_name":"電源(Power Supply)"}
	  ,{"category_id":"8","category_name":"滑鼠與鍵盤"}
];
//產品型別
var types = [
     {"category_id":"1","type_id":"1","type_name":"Intel"}
	,{"category_id":"1","type_id":"2","type_name":"AMD"}
	
	,{"category_id":"2","type_id":"1","type_name":"Intel"}
	,{"category_id":"2","type_id":"2","type_name":"AMD"}
	
	,{"category_id":"3","type_id":"1","type_name":"桌上型記憶體"}
	,{"category_id":"3","type_id":"2","type_name":"筆記型記憶體"}
	
	,{"category_id":"4","type_id":"1","type_name":"2.5吋"}
	,{"category_id":"4","type_id":"2","type_name":"3.5吋"}
	,{"category_id":"4","type_id":"3","type_name":"SSD"}

	
	,{"category_id":"5","type_id":"1","type_name":"AMD"}
	,{"category_id":"5","type_id":"2","type_name":"NVIDIA"}
	
	,{"category_id":"6","type_id":"1","type_name":"ATX"}
	,{"category_id":"6","type_id":"2","type_name":"Micro-ATX"}
	,{"category_id":"6","type_id":"3","type_name":"Mini-ITX"}
	
	,{"category_id":"7","type_id":"1","type_name":"400W以下"}
	,{"category_id":"7","type_id":"2","type_name":"400W - 500W"}
	,{"category_id":"7","type_id":"3","type_name":"500W - 650W"}
	,{"category_id":"7","type_id":"4","type_name":"600W以上"}
	
	,{"category_id":"8","type_id":"1","type_name":"鍵盤"}
	,{"category_id":"8","type_id":"2","type_name":"鍵鼠組"}
];
//產品種類
var kinds = [
     {"category_id":"1","type_id":"1","kind_id":"1","kind_name":"Intel 1151腳位，第八代14nm【Coffee Lake平台】"}
	,{"category_id":"1","type_id":"1","kind_id":"2","kind_name":"Intel 1151腳位，第九代14nm【Coffee Lake平台】"}
	,{"category_id":"1","type_id":"1","kind_id":"3","kind_name":"Intel 1200腳位，第十代14nm【Comet Lake平台】"}
	,{"category_id":"1","type_id":"1","kind_id":"4","kind_name":"Intel Xeon 2011腳位(伺服器等級，X99通用)"}
	,{"category_id":"1","type_id":"1","kind_id":"5","kind_name":"Intel 2066腳位(Kaby Lake-X)，適用X299"}
	,{"category_id":"1","type_id":"1","kind_id":"6","kind_name":"Intel 2066腳位(Skylake-X)，適用X299"}
	,{"category_id":"1","type_id":"2","kind_id":"1","kind_name":"AMD AM4 Ryzen 4000系列7nm(內建7nmVega內顯)-限DIY組裝出貨，不零售"}
	,{"category_id":"1","type_id":"2","kind_id":"2","kind_name":"AMD AM4 Ryzen 3000系列7nm PCIe4.0 Ryzen5/Ryzen7/Ryzen9"}
	,{"category_id":"1","type_id":"2","kind_id":"3","kind_name":"AMD Ryzen RX 40系列7nm"}
	
	,{"category_id":"2","type_id":"1","kind_id":"1","kind_name":"Intel 1151 C246晶片組/DDR4"}
	,{"category_id":"2","type_id":"1","kind_id":"2","kind_name":"Intel 1151 H310晶片組/DDR4/含顯示【八代Coffee Lake平台】"}
	,{"category_id":"2","type_id":"1","kind_id":"3","kind_name":"Intel 1151 B360/B365晶片組/DDR4/含顯示【八代Coffee Lake平台】"}
	,{"category_id":"2","type_id":"1","kind_id":"4","kind_name":"Intel 1151 H370晶片組/DDR4/含顯示【八代Coffee Lake平台】"}
	,{"category_id":"2","type_id":"1","kind_id":"5","kind_name":"Intel 1151 Z390晶片組/DDR4/含顯示【適用intel 八代與九代平台】"}
	,{"category_id":"2","type_id":"1","kind_id":"6","kind_name":"Intel 1200 B460 晶片組/DDR4"}
	,{"category_id":"2","type_id":"1","kind_id":"7","kind_name":"Intel 1200 H410 晶片組/DDR4"}
	,{"category_id":"2","type_id":"1","kind_id":"8","kind_name":"Intel 1200 H470 晶片組/DDR4"}
	,{"category_id":"2","type_id":"1","kind_id":"9","kind_name":"Intel 1200 Z490 晶片組/DDR4"}
	,{"category_id":"2","type_id":"1","kind_id":"10","kind_name":"Intel 1151 H110晶片組/DDR4/含顯示【Skylake平台】"}
	,{"category_id":"2","type_id":"1","kind_id":"11","kind_name":"Intel 1150 H81晶片組"}
	,{"category_id":"2","type_id":"1","kind_id":"12","kind_name":"Intel 2066 X299 晶片組 支援Intel® Core™ X系列處理器"}
	,{"category_id":"2","type_id":"1","kind_id":"13","kind_name":"Intel 3647 C621晶片組/DDR4"}
	,{"category_id":"2","type_id":"2","kind_id":"14","kind_name":"AMD A320晶片組/DDR4/AM4腳位"}
	,{"category_id":"2","type_id":"2","kind_id":"15","kind_name":"AMD A520晶片組/DDR4/AM4腳位"}
	,{"category_id":"2","type_id":"2","kind_id":"16","kind_name":"AMD B450晶片組/DDR4/AM4腳位"}
	,{"category_id":"2","type_id":"2","kind_id":"17","kind_name":"AMD B550晶片組/DDR4/AM4腳位"}
	,{"category_id":"2","type_id":"2","kind_id":"18","kind_name":"AMD X370晶片組/DDR4/AM4腳位"}
	,{"category_id":"2","type_id":"2","kind_id":"19","kind_name":"AMD X470晶片組/DDR4/AM4腳位"}
	,{"category_id":"2","type_id":"2","kind_id":"20","kind_name":"AMD X570晶片組/DDR4/AM4腳位"}
	,{"category_id":"2","type_id":"2","kind_id":"21","kind_name":"AMD TRX40 晶片組"}
	,{"category_id":"2","type_id":"2","kind_id":"22","kind_name":"AMD X399 晶片組"}
	,{"category_id":"2","type_id":"2","kind_id":"23","kind_name":"主機板配件"}
	
	,{"category_id":"3","type_id":"1","kind_id":"2","kind_name":"桌上型記憶體 DDR4 雙通道/四通道/八通道"}
	,{"category_id":"3","type_id":"1","kind_id":"3","kind_name":"桌上型記憶體 DDR4"}
	,{"category_id":"3","type_id":"2","kind_id":"4","kind_name":"筆記型記憶體 DDR4"}
	,{"category_id":"3","type_id":"2","kind_id":"5","kind_name":"筆記型記憶體 DDR3"}
	
	,{"category_id":"4","type_id":"1","kind_id":"1","kind_name":"2.5吋 家用型硬碟"}
	,{"category_id":"4","type_id":"2","kind_id":"2","kind_name":"3.5吋 家用型硬碟"}
	,{"category_id":"4","type_id":"2","kind_id":"3","kind_name":"3.5吋 NAS專用硬碟"}
	,{"category_id":"4","type_id":"2","kind_id":"4","kind_name":"3.5吋 監控用硬碟"}
	,{"category_id":"4","type_id":"2","kind_id":"5","kind_name":"3.5吋 企業級硬碟"}
	,{"category_id":"4","type_id":"3","kind_id":"6","kind_name":"SSD SATA固態硬碟"}
	,{"category_id":"4","type_id":"3","kind_id":"7","kind_name":"SSD M.2 PCIe 固態硬碟"}
	,{"category_id":"4","type_id":"3","kind_id":"8","kind_name":"SSD M.2 SATA 固態硬碟"}

	,{"category_id":"5","type_id":"1","kind_id":"1","kind_name":"AMD RX570"}
	,{"category_id":"5","type_id":"1","kind_id":"2","kind_name":"AMD RX580/RX590"}
	,{"category_id":"5","type_id":"1","kind_id":"3","kind_name":"AMD RX5500XT"}
	,{"category_id":"5","type_id":"1","kind_id":"4","kind_name":"AMD RX5600XT"}
	,{"category_id":"5","type_id":"1","kind_id":"5","kind_name":"AMD RX5700"}
	,{"category_id":"5","type_id":"1","kind_id":"6","kind_name":"AMD RX5700XT"}
	,{"category_id":"5","type_id":"2","kind_id":"7","kind_name":"GeForce GT710 晶片組"}
	,{"category_id":"5","type_id":"2","kind_id":"8","kind_name":"GeForce GT730 晶片組"}
	,{"category_id":"5","type_id":"2","kind_id":"9","kind_name":"GeForce GT 1030 晶片組"}
	,{"category_id":"5","type_id":"2","kind_id":"10","kind_name":"GeForce GTX 1650(DDR5)"}
	,{"category_id":"5","type_id":"2","kind_id":"11","kind_name":"GeForce GTX 1650(DDR6)"}
	,{"category_id":"5","type_id":"2","kind_id":"12","kind_name":"GeForce® GTX1650 SUPER"}
	,{"category_id":"5","type_id":"2","kind_id":"13","kind_name":"GeForce® GTX1660"}
	,{"category_id":"5","type_id":"2","kind_id":"14","kind_name":"GeForce® GTX1660 SUPER"}
	,{"category_id":"5","type_id":"2","kind_id":"15","kind_name":"GeForce® RTX 2060"}
	,{"category_id":"5","type_id":"2","kind_id":"16","kind_name":"GeForce® RTX 2060 SUPER"}
	,{"category_id":"5","type_id":"2","kind_id":"17","kind_name":"GeForce® RTX 2070"}
	,{"category_id":"5","type_id":"2","kind_id":"18","kind_name":"GeForce® RTX 2070 SUPER"}
	,{"category_id":"5","type_id":"2","kind_id":"19","kind_name":"GeForce® RTX 2080 SUPER"}
	,{"category_id":"5","type_id":"2","kind_id":"20","kind_name":"GeForce® RTX 2080TI"}
	,{"category_id":"5","type_id":"2","kind_id":"21","kind_name":"GeForce® RTX 3080"}
	,{"category_id":"5","type_id":"2","kind_id":"22","kind_name":"GeForce® RTX 3090"}
	
	,{"category_id":"6","type_id":"1","kind_id":"1","kind_name":"ASUS / ROG / TUF 華碩"}
	,{"category_id":"6","type_id":"1","kind_id":"2","kind_name":"MSI 微星"}
	,{"category_id":"6","type_id":"2","kind_id":"3","kind_name":"GIGABYTE / AORUS 技嘉"}
	,{"category_id":"6","type_id":"2","kind_id":"4","kind_name":"ABKONCORE【韓國電競品牌】"}
	,{"category_id":"6","type_id":"2","kind_id":"5","kind_name":"AeroCool 愛樂酷"}
	,{"category_id":"6","type_id":"2","kind_id":"6","kind_name":"aigo 愛國者 / darkFlash"}
	,{"category_id":"6","type_id":"3","kind_id":"7","kind_name":"Antec 安鈦克"}
	,{"category_id":"6","type_id":"3","kind_id":"8","kind_name":"Apexgaming 美商艾湃電競"}
	
	,{"category_id":"7","type_id":"1","kind_id":"1","kind_name":"CoolerMaster 酷碼"}
	,{"category_id":"7","type_id":"1","kind_id":"2","kind_name":"CORSAIR 海盜船"}
	,{"category_id":"7","type_id":"3","kind_id":"3","kind_name":"COUGAR 美洲獅"}
	,{"category_id":"7","type_id":"4","kind_id":"4","kind_name":"Chicony群光"}
	,{"category_id":"7","type_id":"5","kind_id":"5","kind_name":"CWT僑威"}
	
	,{"category_id":"8","type_id":"1","kind_id":"1","kind_name":"Logitech 羅技鍵盤"}
	,{"category_id":"8","type_id":"1","kind_id":"2","kind_name":"Logitech 微軟鍵盤"}
	,{"category_id":"8","type_id":"2","kind_id":"3","kind_name":"Logitech 羅技滑鼠"}
	,{"category_id":"8","type_id":"2","kind_id":"4","kind_name":"Razer 雷蛇"}
];
//商品
var goods = [
    {"category_id":"1","type_id":"1","kind_id":"1","product_id":"1","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"1","product_id":"2","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"1","product_id":"3","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"1","product_id":"4","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"2","product_id":"5","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"3","product_id":"6","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"3","product_id":"7","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"4","product_id":"8","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"5","product_id":"8","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"6","product_id":"8","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"6","product_id":"8","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"1","kind_id":"6","product_id":"8","product_name":"微星 MAG B460M MORTAR 主機板","product_desc":"◆ 支援CPU ：1200腳位","price":"NT$ 5,000","max":""}
	
	
    ,{"category_id":"1","type_id":"2","kind_id":"1","product_id":"1","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"2","kind_id":"1","product_id":"2","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"2","kind_id":"1","product_id":"3","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"2","kind_id":"1","product_id":"4","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"2","kind_id":"2","product_id":"5","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"2","kind_id":"2","product_id":"6","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"2","kind_id":"2","product_id":"7","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"2","kind_id":"2","product_id":"8","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	,{"category_id":"1","type_id":"2","kind_id":"2","product_id":"9","product_name":"華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","product_desc":"◆ 支援CPU ：AM4 腳位","price":"NT$ 5,000","max":""}
	
];

/* end 資料 */

/* 功能 */
function genCategoryTab(){
	var html = "";
	
	for(var i=0;i<categories.length;i++){
		var category_name = categories[i]["category_name"];
		if(i==0){
			html += "<li class=\"nav-item\"><a class=\"nav-link active\" id=\"pills-home-tab\" data-toggle=\"pill\" href=\"#pills-home\" role=\"tab\" aria-controls=\"pills-home\" aria-selected=\"true\">"+category_name+"</a></li>";
		}else{
		    html += "<li class=\"nav-item\"><a class=\"nav-link \" id=\"pills-home-tab\" data-toggle=\"pill\" href=\"#pills-home\" role=\"tab\" aria-controls=\"pills-home\" aria-selected=\"true\">"+category_name+"</a></li>";
		}
	}
	
	document.write(html);
}

function GetCategory(category_id){
	var html = "";
	
	for(var i=0;i<types.length;i++){
		var cur_category_id = types[i]["category_id"];
		if(cur_category_id == category_id){
			var type_id =  types[i]["type_id"];
			var type_name = types[i]["type_name"];
			html += GetLevel1Category(category_id,type_id,type_name);
		}
	}
	
	html = "<div class=\"catagories-menu\"><ul id=\"menu-content2\" class=\"menu-content collapse show\">"+html+"</ul></div>";
	return html;
}

function GetLevel1Category(category_id,type_id,type_name){
	var html = "";
	
	
	//html = "<li data-toggle=\"collapse\" data-target=\"#"+"type"+type_id+"\"><a href=\"#\">"+type_name+"</a>"+GetLevel2Category(category_id,type_id)+"</li>"
	html = "<li ><a href=\"#\">"+type_name+"</a>"+GetLevel2Category(category_id,type_id)+"</li>"
	
	return html;
}

function GetLevel2Category(category_id,type_id){
	var html = "";
	
	for(var i=0;i<kinds.length;i++){
		var cur_category_id = kinds[i]["category_id"];
		var cur_type_id = kinds[i]["type_id"];
		if(category_id==cur_category_id && type_id==cur_type_id){
			var kind_id = kinds[i]["kind_id"];
			var kind_name= kinds[i]["kind_name"];
			var parameter = "category_id="+category_id+"&type_id="+type_id+"&kind_id="+kind_id;
			//var url = "./product.html?"+parameter;
			var url = "javascript:GenProducts('products','"+category_id+"','"+type_id+"','"+kind_id+"');";
			//alert(url);
			var label = kind_name;
			html += GetLevel2CategoryItem(url,label);
		}
	}
	
	html = "<ul class=\"sub-menu collapse show\" id=\""+"type"+type_id+"\">"+html+"</ul>";
	return html;
}

function GetLevel2CategoryItem(url,label){
	return "<li><a href=\""+url+"\">"+label+"</a></li>";
}

function GenProducts(contain_id,category_id,type_id,kind_id){
	document.getElementById(contain_id).innerHTML = GetProducts(category_id,type_id,kind_id);
}

function GetProducts(category_id,type_id,kind_id){
	var html = "";
	
	var count = 0;
	for(var i=0;i<goods.length;i++){
		var cur_category_id = goods[i]["category_id"];
		var cur_type_id = goods[i]["type_id"];
		var cur_kind_id = goods[i]["kind_id"];
		if(cur_category_id == category_id && cur_type_id == type_id && cur_kind_id == kind_id){
			var img_src = "./img/product-img/"+category_id+"/"+type_id+".png";
			var product_id = goods[i]["product_id"];
			var product_name = goods[i]["product_name"];
			var product_desc = goods[i]["product_desc"];
			var price = goods[i]["price"];
			var url = "#";
			html += GetProduct(img_src,product_id,product_name,product_desc,price,url);
			count++;
		}
	}
	
	//alert(count);
	return html;
}

function GetProduct(img_src,product_id,product_name,product_desc,price,url){
	var html = "";
	
	
	html += "<div class=\"col-12 col-sm-6 col-lg-4\">";
	html += "<div class=\"single-product-wrapper\">";
    //Product Image -->
	html += "<div class=\"product-img\">";
	html += "<img src=\""+img_src+"\" alt=\"\">";
    //Hover Thumb -->
	//html += "<img class=\"hover-img\" src=\"img/product-img/product-2.jpg\" alt=\"\">";

    //Product Badge -->
	//html += "<div class=\"product-badge offer-badge\">";
	//html += "<span>-30%</span>";
	//html += "</div>";
    //Favourite -->
	//html += "<div class=\"product-favourite\">";
	//html += "<a href=\"#\" class=\"favme fa fa-heart\"></a>";
	//html += "</div>";
	html += "</div>";

    //Product Description -->
	html += "<div class=\"product-description\">";
	html += "<span>"+product_name+"</span>";
	html += "<a href=\""+url+"\">";
	html += "<h6>"+product_desc+"</h6>";
	html += "</a>";
	//html += "<p class=\"product-price\"><span class=\"old-price\">$75.00</span> $55.00</p>";
	html += "<p class=\"product-price\"> "+price+"</p>";

    //Hover Content -->
	html += "<div class=\"hover-content\">";
    //Add to Cart -->
	html += "<div class=\"add-to-cart-btn\">";
	html += "<a href=\"#\" class=\"btn essence-btn\">Add to Cart</a>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	
	return html;
}

/* end 功能 */

/* end 購物 */




/* 購物車 */

/* 資料 */

/* end 資料 */

/* 功能 */
function addToShoppingCart(){
	
	
}

function removeToShoppingCart(){
	
	
}

function showShoppingCart(cart){
	
}

function showBill(cart){
	
}
/* end 功能*/

/* end 購物車 */

/*
  data
*/ 



//
//  購物車結構
//  seq，category_id,category_name,goods_id,goods_name,goods_desc,price,quantity,subtotal
//

//
//  合計結構
//  bill_no,items,amount,delivery,discount,total
//

//
//  結帳結構
//  bill_no,amout,pay_date,way,way_desc,status,invoice
//

var cart = [

];





var type = [
    {"處理器(CPU)":[]}
	,{"主機板(MB)":[]}
	,{"記憶體(RAM)":[]}
	,{"硬碟(HD/SSD)":[]}
	,{"顯示卡(VGA)":[]}
	,{"機殼(case)":[]}
	,{"電源(Power Supply)":[]}
	,{"滑鼠與鍵盤":[]}
];


var kind = [
    
];


//function 
/*
  menu structure
*/

var menu1 = [
    {"parent":"","menu_id":"m1000","menu_label":"電腦零組件","menu_icon":"","menu_url":"#","menu_order":"","isMega":"0"}
	,{"parent":"","menu_id":"m3000","menu_label":"線上估價","menu_icon":"","menu_url":"./estimate.html","menu_order":"","isMega":"0"}
];

/*
var menu2 = [
    {"parent":"m1000","group":"m1100","menu_id":"","menu_label":"CPU","menu_icon":"","menu_url":"","menu_order":""}
	,{"parent":"m1000","group":"m1100","menu_id":"m1101","menu_label":"Intel","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1100","menu_id":"m1102","menu_label":"AMD","menu_icon":"","menu_url":"shop.html","menu_order":""}
	
	,{"parent":"m1000","group":"m1200","menu_id":"","menu_label":"主機板","menu_icon":"","menu_url":"","menu_order":""}
	,{"parent":"m1000","group":"m1200","menu_id":"m1201","menu_label":"主機板 + CPU","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1200","menu_id":"m1202","menu_label":"Intel平台","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1200","menu_id":"m1203","menu_label":"AMD平台","menu_icon":"","menu_url":"shop.html","menu_order":""}

	
	,{"parent":"m1000","group":"m1300","menu_id":"","menu_label":"記憶體","menu_icon":"","menu_url":"","menu_order":""}
	,{"parent":"m1000","group":"m1300","menu_id":"m1301","menu_label":"桌上型","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1300","menu_id":"m1302","menu_label":"筆電型","menu_icon":"","menu_url":"shop.html","menu_order":""}
	
	,{"parent":"m1000","group":"m1400","menu_id":"","menu_label":"顯示卡","menu_icon":"","menu_url":"","menu_order":""}
	,{"parent":"m1000","group":"m1400","menu_id":"m1401","menu_label":"AMD晶片","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1400","menu_id":"m1402","menu_label":"NVIDIA晶片","menu_icon":"","menu_url":"shop.html","menu_order":""}
	
	,{"parent":"m1000","group":"m1500","menu_id":"","menu_label":"硬碟 / SSD","menu_icon":"","menu_url":"","menu_order":""}
	,{"parent":"m1000","group":"m1500","menu_id":"m1501","menu_label":"傳統硬碟","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1500","menu_id":"m1502","menu_label":"SSD","menu_icon":"","menu_url":"shop.html","menu_order":""}
	
	,{"parent":"m1000","group":"m1600","menu_id":"","menu_label":"機殼","menu_icon":"","menu_url":"","menu_order":""}
	,{"parent":"m1000","group":"m1600","menu_id":"m1601","menu_label":"ITX","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1600","menu_id":"m1602","menu_label":"Mini ITX","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1600","menu_id":"m1603","menu_label":"Micro ITX","menu_icon":"","menu_url":"shop.html","menu_order":""}
	
	,{"parent":"m1000","group":"m1700","menu_id":"","menu_label":"電源供應器","menu_icon":"","menu_url":"","menu_order":""}
	,{"parent":"m1000","group":"m1700","menu_id":"m1701","menu_label":"400W以下","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1700","menu_id":"m1702","menu_label":"400W - 600W","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m1000","group":"m1700","menu_id":"m1703","menu_label":"600W以上","menu_icon":"","menu_url":"shop.html","menu_order":""}
	
	,{"parent":"m2000","group":"","menu_id":"m2101","menu_label":"Home","menu_icon":"","menu_url":"index.html","menu_order":""}
	,{"parent":"m2000","group":"","menu_id":"m2102","menu_label":"Shop","menu_icon":"","menu_url":"shop.html","menu_order":""}
	,{"parent":"m2000","group":"","menu_id":"m2103","menu_label":"Product Details","menu_icon":"","menu_url":"single-product-details.html","menu_order":""}
	
];
*/
var menu2 = [
    {"parent":"m1000","group":"","menu_id":"","menu_label":"處理器(CPU)","menu_icon":"","menu_url":"./shop.html?category=1","menu_order":""}
	,{"parent":"m1000","group":"","menu_id":"","menu_label":"主機板(MB)","menu_icon":"","menu_url":"./shop.html?category=2","menu_order":""}
	,{"parent":"m1000","group":"","menu_id":"","menu_label":"記憶體(RAM)","menu_icon":"","menu_url":"./shop.html?category=3","menu_order":""}
	,{"parent":"m1000","group":"","menu_id":"","menu_label":"硬碟(HD/SSD)","menu_icon":"","menu_url":"./shop.html?category=4","menu_order":""}
	,{"parent":"m1000","group":"","menu_id":"","menu_label":"顯示卡(VGA)","menu_icon":"","menu_url":"./shop.html?category=5","menu_order":""}
	,{"parent":"m1000","group":"","menu_id":"","menu_label":"機殼(case)","menu_icon":"","menu_url":"./shop.html?category=6","menu_order":""}
	,{"parent":"m1000","group":"","menu_id":"","menu_label":"電源(Power Supply)","menu_icon":"","menu_url":"./shop.html?category=7","menu_order":""}
	,{"parent":"m1000","group":"","menu_id":"","menu_label":"滑鼠與鍵盤","menu_icon":"","menu_url":"./shop.html?category=8","menu_order":""}
];

var estimate_data = [
    ["品項","彙總","數量","價錢"],
    ["處理器 CPU","全部商品 100 現在下殺 30 降價商品 40 嚴選推薦 55 新品到貨 66","",""],
    ["主機板","全部商品 100 現在下殺 30 降價商品 40 嚴選推薦 55 新品到貨 66","",""],
    ["記憶體","全部商品 100 現在下殺 30 降價商品 40 嚴選推薦 55 新品到貨 66","",""],
    ["硬碟(M.2/SSD/傳統)","全部商品 100 現在下殺 30 降價商品 40 嚴選推薦 55 新品到貨 66","",""],
    ["顯示卡","全部商品 100 現在下殺 30 降價商品 40 嚴選推薦 55 新品到貨 66","",""],
    ["電腦機殼","全部商品 100 現在下殺 30 降價商品 40 嚴選推薦 55 新品到貨 66","",""],
    ["電源供應器","全部商品 100 現在下殺 30 降價商品 40 嚴選推薦 55 新品到貨 66","",""],
    ["滑鼠與鍵盤","全部商品 100 現在下殺 30 降價商品 40 嚴選推薦 55 新品到貨 66","",""]
];

var GoodsCPUCategory = [
    ["Intel 1151腳位，第八代14nm【Coffee Lake平台】"],
    ["Intel 1151腳位，第九代14nm【Coffee Lake平台】"],
    ["Intel 1200腳位，第十代14nm【Comet Lake平台】"],
    ["Intel Xeon 2011腳位(伺服器等級，X99通用)"],
    ["Intel 2066腳位(Kaby Lake-X)，適用X299"],
    ["Intel 2066腳位(Skylake-X)，適用X299"],
    ["AMD AM4 Ryzen 4000系列7nm(內建7nmVega內顯)-限DIY組裝出貨，不零售"],
    ["AMD AM4 Ryzen 3000系列7nm PCIe4.0 Ryzen5/Ryzen7/Ryzen9"],
    ["AMD Ryzen RX 40系列7nm"]
];

function GenLogo(){
	var html = "";
 
    html+="<a class=\"nav-brand\" href=\"./index.html\"><img src=\"./img/core-img/logo.png\" alt=\"富聚購物車\"></a>";

    document.write(html); 
}

function GenMenu(){
    var html = "";
 
    html += "<div class=\"classynav\">";
    html += "<ul>";

    for(var i=0;i<menu1.length;i++){
        html += "<li>";
		html += "<a href=\""+menu1[i].menu_url+"\">"+menu1[i].menu_label+"</a>";
		
		var isMega = false;
		if(menu1[i].isMega == "1") isMega = true;
		html += GetSubMenu(menu1[i].menu_id,isMega);
		
		html +="</li>";
	}
	
    html += "</ul>";
	html += "</div>";
	
    document.write(html);  
}

function GetSubMenu(parent,isMega){
	var html = "";
	var isGroup = false;
	
	var last_group = "";
	for(var i=0;i<menu2.length;i++){
		if(menu2[i].parent == parent){
			if(isMega){
			    if(html == ""){
				    last_group = menu2[i].group;
				    html += "<ul class=\"single-mega cn-col-4\">";
			    }    
				
			    if(last_group != menu2[i].group){
			        html += "</ul>";
					last_group = menu2[i].group;
				    html += "<ul class=\"single-mega cn-col-4\">";
			    }
				
				if(menu2[i].menu_id==""){
					html += GetMenuTitle(menu2[i].menu_label);
				}else{
					html += GetMenuItem(menu2[i].menu_label,menu2[i].menu_url);
				}
			}else{
				if(html == "") html += "<ul class=\"dropdown\">";
				
				html += GetMenuItem(menu2[i].menu_label,menu2[i].menu_url);
			}
		}
	}
	if(html!=""){
		html += "</ul>";
		
		if(isMega){
		    html = "<div class=\"megamenu\">"+html+"</div>";
	    }
	}
	
	
	return html;
}

function GetMenuItem(label,url){
	return "<li><a href=\""+url+"\">"+label+"</a></li>";
}

function GetMenuTitle(label){
	return "<li class=\"title\">"+label+"</li>";
}

/*
  cart
*/

var quantity = 3;
function GenCart(){
	var html = "";
	
	html += "<div class=\"cart-area\">";
	html += "<a href=\"#\" id=\"essenceCartBtn\"><img src=\"./img/core-img/bag.svg\" alt=\"\"> <span>"+quantity+"</span></a>";
	html += "</div>";
	document.write(html);
}

function GenCartArea(){
	var html = "";
	
	
	
    //Cart Button -->
    html += "<div class=\"cart-button\">";
    html += "<a href=\"#\" id=\"rightSideCart\"><img src=\"img/core-img/bag.svg\" alt=\"\"> <span>3</span></a>";
    html += "</div>";

    html += "<div class=\"cart-content d-flex\">";

    //Cart List Area -->
    html += "<div class=\"cart-list\">";
	
    //Single Cart Item -->
	html += GetSingleCartItem("./img/product-img/1/1.png","微星 MAG B460M MORTAR 主機板","◆ 支援CPU ：1200腳位","NT$ 5,000");
    
	html += GetSingleCartItem("./img/product-img/2/1.png","華碩 ROG STRIX B550-F GAMING WIFI 6 AX AMD 主機板","◆ 支援CPU ：AM4 腳位","NT$ 5,000");
	
	html += GetSingleCartItem("./img/product-img/1/1.png","微星 MAG B460M MORTAR 主機板","◆ 支援CPU ：1200腳位","NT$ 5,000");

    html += "</div>";   
    //end Cart List Area -->
	
	
    // Cart Summary -->
    html += "<div class=\"cart-amount-summary\">";

    html += "<h2>Summary</h2>";
    html += "<ul class=\"summary-table\">";
    html += "<li><span>小計:</span> <span>NT$ 15,000</span></li>";
    html += "<li><span>運費:</span> <span>Free</span></li>";
    html += "<li><span>折扣:</span> <span>-15%</span></li>";
    html += "<li><span>總計:</span> <span>NT$ 12,750</span></li>";
    html += "</ul>";
    html += "<div class=\"checkout-btn mt-100\">";
    html += "<a href=\"#\" class=\"btn essence-btn\">check out</a>";
	html += "</div>";
	
    html += "</div>";
	// end Cart Summary -->
	
    html += "</div>";
    html += "</div>";
    
	document.write(html);
}

function GetSingleCartItem(img_src,product_name,product_desc,price){
	var html = "";
	
    html += "<div class=\"single-cart-item\">";
	
    html += "<a href=\"#\" class=\"product-image\">";
    html += "<img src=\""+img_src+"\" class=\"cart-thumb\" alt=\"\">";
	
    // Cart Item Desc -->
    html += "<div class=\"cart-item-desc\">";
    html += "<span class=\"product-remove\"><i class=\"fa fa-close\" aria-hidden=\"true\"></i></span>";
    html += "<span class=\"badge\">"+product_name+"</span>";
    html += "<h6>"+product_desc+"</h6>";
    html += "<p class=\"price\">"+price+"</p>";
    html += "</div>";
	
    html += "</a>";
	
    html += "</div>";
    
	
	return html;
}
/*
  footer
*/
function GenFooter(){
	var html = "";
	
	html += "<footer class=\"footer_area clearfix\">";
	html += "<div class=\"container\">";
	
	
	html += GetFoorterMenu();
	html += GetCommunity();
	html += GetStatement();
	
	
	html += "</div>";
	html += "</footer>";
	
	document.write(html);
}

function GetFoorterMenu(){
	var html = "";
	
	html += "<div class=\"row\">";
	html += "<div class=\"col-12 col-md-6\">";
	html += "<div class=\"single_widget_area d-flex mb-30\">";
	//logo
	html += "<div class=\"footer-logo mr-50\">";
	html += "<a href=\"#\"><img src=\"./img/core-img/logo2.png\" alt=\"\"></a>";
	html += "</div>";
    //foot menu			
	html += "<div class=\"footer_menu\">";
	html += "<ul>";
	html += "<li><a href=\"#\">Shop</a></li>";
	html += "<li><a href=\"#\">Blog</a></li>";
	html += "<li><a href=\"#\">Contact</a></li>";
	html += "</ul>";
	html += "</div>";					
	html += "</div>";
	html += "</div>";
    //
	html += "<div class=\"col-12 col-md-6\">";
	html += "<div class=\"single_widget_area mb-30\">";
	html += "<ul class=\"footer_widget_menu\">";
	html += "<li><a href=\"#\">Order Status</a></li>";
	html += "<li><a href=\"#\">Payment Options</a></li>";
	html += "<li><a href=\"#\">Shipping and Delivery</a></li>";
	html += "<li><a href=\"#\">Guides</a></li>";
	html += "<li><a href=\"#\">Privacy Policy</a></li>";
	html += "<li><a href=\"#\">Terms of Use</a></li>";
	html += "</ul>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	
	return html;
}

function GetCommunity(){
	var html = "";
	
	html += "<div class=\"row align-items-end\">";
	html += "<div class=\"col-12 col-md-6\">";
	html += "<div class=\"single_widget_area\">";
	html += "<div class=\"footer_heading mb-30\">";
	html += "<h6>Subscribe</h6>";
	html += "</div>";
	html += "<div class=\"subscribtion_form\">";
	html += "<form action=\"#\" method=\"post\">";
	html += "<input type=\"email\" name=\"mail\" class=\"mail\" placeholder=\"Your email here\">";
	html += "<button type=\"submit\" class=\"submit\"><i class=\"fa fa-long-arrow-right\" aria-hidden=\"true\"></i></button>";
	html += "</form>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "<div class=\"col-12 col-md-6\">";
	html += "<div class=\"single_widget_area\">";
	html += "<div class=\"footer_social_area\">";
	html += "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Facebook\"><i class=\"fa fa-facebook\" aria-hidden=\"true\"></i></a>";
	html += "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Instagram\"><i class=\"fa fa-instagram\" aria-hidden=\"true\"></i></a>";
	html += "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Twitter\"><i class=\"fa fa-twitter\" aria-hidden=\"true\"></i></a>";
	html += "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Pinterest\"><i class=\"fa fa-pinterest\" aria-hidden=\"true\"></i></a>";
	html += "<a href=\"#\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Youtube\"><i class=\"fa fa-youtube-play\" aria-hidden=\"true\"></i></a>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	
	return html;
}

function GetStatement(){
    var html = "";

    html += "<div class=\"row mt-5\">";
    html += "<div class=\"col-md-12 text-center\">";
	html += "<p>";
	html += "Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i> by <a href=\"#\" target=\"_blank\">Colorlib</a>";
	html += "</p>";
	html += "</div>";
	html += "</div>";
	
    return html;	
}


/*
  carousel
*/

function GenCarousel(){
	var html = "";
	
	html += "<section class=\"new_arrivals_area section-padding-80 clearfix\">";
	
	//html += GetCarouselTitle();
	
	html += "<div class=\"container\">";
	html += "<div class=\"row\">";
	html += "<div class=\"col-12\">";
	html += "<div class=\"popular-products-slides owl-carousel\">";
	
	html += GetCarouselItem("./img/carousel-img/p01.png","./img/carousel-img/p01.png","Lenovo","#","ThinkPad X210","NT$31,000",true,true,true,"3折");
	html += GetCarouselItem("./img/carousel-img/p02.png","./img/carousel-img/p02.png","Lenovo","#","ThinkPad X220","NT$32,000",true,true,true,"70% off");
	html += GetCarouselItem("./img/carousel-img/p03.png","./img/carousel-img/p03.png","Lenovo","#","ThinkPad X230","NT$33,000",true,true,true,"新品");
	html += GetCarouselItem("./img/carousel-img/p04.png","./img/carousel-img/p04.png","Lenovo","#","ThinkPad X240","NT$34,000",true,true,true,"new");
	html += GetCarouselItem("./img/carousel-img/p05.png","./img/carousel-img/p05.png","Lenovo","#","ThinkPad X250","NT$35,000",true,true,true,"new");
	
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</section>";
	document.write(html);
}

function GetCarouselTitle(){
    var html = "";

    html += "<div class=\"container\">";
	html += "<div class=\"row\">";
	html += "<div class=\"col-12\">";
	html += "<div class=\"section-heading text-center\">";
	html += "<h2>Popular Products</h2>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	
	return html;
}

function GetCarouselItem(normal_image,hover_image,title,url,name,amount,addFavouriteButton,addCartButton,addBadgeButton,badge){
	var html = "";
	
	html += "<div class=\"single-product-wrapper\">";
	
    //Carousel Image
	html += "<div class=\"product-img\">";
	html += "<img src=\""+normal_image+"\" alt=\"\">";
    //Hover Thumb
	if(hover_image!=""){
	    html += "<img class=\"hover-img\" src=\""+hover_image+"\" alt=\"\">";
	}
	//Badge
	if(addBadgeButton){
	    html += "<div class=\"product-badge new-badge\">";
	    html += "<span>"+badge+"</span>";
	    html += "</div>";
	}
	
    //Favourite
	if(addFavouriteButton){
	    html += "<div class=\"product-favourite\">";
	    html += "<a href=\"#\" class=\"favme fa fa-heart\"></a>";
	    html += "</div>";
	}
	//end Favourite
	html += "</div>";
	//end Carousel Image
	
    //Carousel Description
	html += "<div class=\"product-description\">";
	html += "<span>"+title+"</span>";
	html += "<a href=\""+url+"\">";
	html += "<h6>"+name+"</h6>";
	html += "</a>";
	html += "<p class=\"product-price\">"+amount+"</p>";
    //Hover Content
	html += "<div class=\"hover-content\">";
    //Add to Cart
	if(addCartButton){
	    html += "<div class=\"add-to-cart-btn\">";
	    html += "<a href=\"#\" class=\"btn essence-btn\">Add to Cart</a>";
	    html += "</div>";
	}
	//end Add to Cart
	html += "</div>";
	html += "</div>";
	//end Carousel Description
	
	html += "</div>";
	
	return html;
}


/*
  shop
*/

function GenShoppingTitle(title){
	var html = "";
	
	html += "<div class=\"breadcumb_area bg-img\" style=\"background-image: url(img/bg-img/breadcumb.jpg);\">";
	html += "<div class=\"container h-100\">";
	html += "<div class=\"row h-100 align-items-center\">";
	html += "<div class=\"col-12\">";
	html += "<div class=\"page-title text-center\">";
	html += "<h2>"+title+"</h2>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	html += "</div>";
	
	document.write(html);
}