function loadLamanDaftarPertandingan()
{
	const page = document.getElementById("tombolBeranda").getAttribute("href").substr(1);
    loadPage(page);

    function loadPage(page)
	{
		var xhttp = new XMLHttpRequest();

		xhttp.onloadstart = function () 
        {
            var content = document.querySelector("#body-content");
            content.innerHTML = " <div class='container' style='text-align:center;'><div class='progress'><div class='indeterminate'></div></div></div>";
        }

		xhttp.onreadystatechange = function()
		{
			if(this.readyState === 4)
			{
				var content = document.querySelector("#body-content");
				if(this.status === 200)
				{
					getPertandinganList();
					content.innerHTML = xhttp.responseText;
				}
				else if(this.status === 404)
				{
					content.innerHTML = "<p>Halaman yang anda cari tidak ditemukan :(</p>";
				}
				else
				{
					content.innerHTML = "<p>Ups.. Halaman yang anda inginkan tidak dapat diakses! :(</p>";
				}
			}
		};
		xhttp.open("GET", "pages/" + page + ".html", true);
		xhttp.send();
	}
}