// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
document.getElementById("searchInput").addEventListener('click', function () {
	document.getElementById("searchInput").value = "";
});


function FillSearch(index) {
	var searchBar = document.getElementById("searchInput");
	searchBar.value = document.getElementById(index).innerHTML.substr(1);
	document.getElementById("searchForm").submit();
}