
/*

*/



function getCellDataOnTableClick(){
var table = document.getElementById(table_id);
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = 
            function(row) 
            {
                return function() { 
                    var cell = row.getElementsByTagName("td")[0];
					var div = cell.getElementsByTagName("div")[0];
		
					var html = arrayToTable(data1).html();
					div.innerHTML = html;
                };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}