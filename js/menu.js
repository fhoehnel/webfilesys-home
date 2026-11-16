var req;

var selectedMenuItemId;

function xmlRequest(url, callBackFunction)
{
    req = false;
    
    if (window.XMLHttpRequest) 
    {
    	try 
    	{
	    req = new XMLHttpRequest();
        } 
        catch (e) 
        {
	    req = false;
        }
    } 
    else
    {
        // branch for IE/Windows ActiveX version
        if (window.ActiveXObject) 
        {
       	    try 
       	    {
        	req = new ActiveXObject("Msxml2.XMLHTTP");
      	    } 
      	    catch (e) 
      	    {
        	try 
        	{
          	    req = new ActiveXObject("Microsoft.XMLHTTP");
        	} 
        	catch (e) 
        	{
          	    req = false;
        	}
	    }
        }
    }
        
    if (req) 
    {
	req.onreadystatechange = callBackFunction;
	req.open("GET", url, true);
	req.send("");
    }
    else
    {
        alert('Your browser does not support the XMLHttpRequest');
    }
}

function loadMenu(selectedItemId)
{
    selectedMenuItemId = "menuItem" + selectedItemId;

    var url = "menu.html";
    // var url = "http://www.webfilesys.de/webfilesys-home/menu.html";
    // var url = "http://127.0.0.1:8080/webfilesys/servlet/D:/Projekte/webfilesys-distrib/mivitec/homepage-ajax/menu.html";

    xmlRequest(url, showMenu);
}

function showMenu()
{
    if (req.readyState == 4)
    {
        if (req.status == 200)
        {
             var menuTable = req.responseText;

             var menuContent = document.getElementById("menuContent");
             
             menuContent.innerHTML = menuTable;
             
             for (i = 0; i <= 10; i++)
             {
                 var menuLink = document.getElementById("menuItem" + i);
                 menuLink.className = "menuItem";
             }
             
             var selectedMenuLink = document.getElementById(selectedMenuItemId);
             
             selectedMenuLink.className = "menuItemActive";
        }
    }
}

