document.addEventListener("DOMContentLoaded", function()
{
	// Activate sidebar nav
	const elems = document.querySelectorAll(".sidenav"); //perbaikan dari var ke const karena era ES6
	M.Sidenav.init(elems);
	loadNav();

	function loadNav()
	{
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function()
		{
			if(this.readyState === 4) //harus === agar akurat
			{
				if (this.status != 200)
				{
					return;
				}
				//muat daftar tautan
				document.querySelectorAll(".topnav, .sidenav").forEach(function(elm)
				{
					elm.innerHTML = xhttp.responseText;
				});

				//Daftarkan event listener untuk setiap tautan menu/terapkan event listenernya
				document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm)
				{
					elm.addEventListener("click", function(event)
					{
						//tutup sidenav
						var sidenav = document.querySelector(".sidenav");
						M.Sidenav.getInstance(sidenav).close();

						//Muat konten halaman yang dipanggil
						page = event.target.getAttribute("href").substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}



	var page = window.location.hash.substr(1);
	if(page === "")
	{
		page = "home";
	}
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
			if(this.readyState == 4)
			{
				if (page === "home") 
				{
					getKlasemenInggris();
					document.getElementById("logo-container").innerHTML = "<span style='font-size: 20px;'>SoccerInfo.id</span>";
				}
				else if(page === "matchlist")
				{
					getPertandinganList();
					document.getElementById("logo-container").innerHTML = "<span style='font-size: 18px;'>Daftar Pertandingan</span>";
				}
				else if(page === "teamlist")
				{
					getTeamList();
					document.getElementById("logo-container").innerHTML = "<span style='font-size: 20px;'>Team List</span>";
				}
				else if(page === "savedmatch")
				{
					dapatkanMatchTersimpan();
					document.getElementById("logo-container").innerHTML = "<span style='font-size: 20px;'>Match Favorit</span>";
				}
				else if(page === "aboutus")
				{
					document.getElementById("logo-container").innerHTML = "About";
				}

				// ---

				var content = document.querySelector("#body-content");
				if(this.status == 200)
				{
					content.innerHTML = xhttp.responseText;
				}
				else if(this.status == 404)
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

});