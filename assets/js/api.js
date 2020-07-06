const myHeaders = new Headers();
myHeaders.append("X-Auth-Token", "17ab215c6a164d3bad67be2993da28ff");
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const base_url_inggris = "https://api.football-data.org/v2/competitions/2021/standings/";
const base_url_jadwal = "https://api.football-data.org/v2/matches/";
const base_url = "https://api.football-data.org/v2/";	
const base_url_teamlist = "https://api.football-data.org/v2/teams/";

function status(response)
{
	if(response.status !== 200)
	{
		console.log(`Error : ${response.status}`);
		return Promise.reject(new Error(response.statusText));
	}
	else
	{
		return Promise.resolve(response);
	}
}

function json(response)
{
	return response.json();
}

function error(error)
{
	console.log(`Error : ${error}`);
}

function getKlasemenInggris()
{
	if ('caches' in window) 
	{
		caches.match(base_url_inggris).then(function(response)
		{
			if(response)
			{
				response.json().then(function(data)
				{
					var daftarklasemen = "";
					data.standings[0].table.forEach(function(urutan)
					{
						daftarklasemen += `
						<tr>
								<td>${urutan.position}</td>
								<td><img src="${urutan.team.crestUrl}" width="20" height="20"></td>
								<td>${urutan.team.name}</td>
								<td>${urutan.won}</td>
								<td>${urutan.draw}</td>
								<td>${urutan.lost}</td>
								<td>${urutan.points}</td>
						</tr>
						`;
					})
				document.getElementById("data-klasemen-inggris").innerHTML = daftarklasemen;
				});
			}
		});
	}

	fetch(base_url_inggris, requestOptions)
		.then(status)
		.then(json)
		.then(function(data)
		{
				var daftarklasemen = "";
					data.standings[0].table.forEach(function(urutan)
					{
						daftarklasemen += `
						<tr >
								<td>${urutan.position}</td>
								<td><img src="${urutan.team.crestUrl}" width="20" height="20"></td>
								<td>${urutan.team.name}</td>
								<td>${urutan.won}</td>
								<td>${urutan.draw}</td>
								<td>${urutan.lost}</td>
								<td>${urutan.points}</td>
						</tr>
						`;
					});
				document.getElementById("data-klasemen-inggris").innerHTML = daftarklasemen;	
		})			
}

function getPertandinganList()
{
	if ('caches' in window) 
	{
		caches.match(base_url_jadwal).then(function(response)
		{
			if(response)
			{
				response.json().then(function(data)
				{
					var matchList = "";
					data.matches.forEach(function(list)
					{


						matchList +=`
						<tr onclick="window.location.href='./matchdetail.html?id=${list.id}';" style="cursor:pointer;">
							<td><img src="assets/images/icon24x24.png"></td>
							<td>${list.homeTeam.name}</td>
							<td>VS<br><span class="badge blue" id="bdgests" style="font-size: 8px; color: white;">${list.status}</span></td>
							<td>${list.awayTeam.name}</td>
							<td><img src="assets/images/icon24x24.png"></td>					
							<td class="actionhide"><a class="waves-effect waves-light btn-small" id="btndetailpertandingan" href="./matchdetail.html?id=${list.id}"><i class="material-icons">more_horiz</i></a></td>
						</tr>
						`;
					})

					document.getElementById("matchlist").innerHTML = matchList;
				});
			}
		});
	}
	fetch(base_url_jadwal, requestOptions)
		.then(status)
		.then(json)
		.then(function(data)
		{
			var matchList = "";
			data.matches.forEach(function(list)
			{


				matchList +=`
				<tr onclick="window.location.href='./matchdetail.html?id=${list.id}';" style="cursor:pointer;">
					<td><img src="assets/images/icon24x24.png"></td>
					<td>${list.homeTeam.name}</td>
					<td>VS<br><span class="badge blue" id="bdgests" style="font-size: 8px; color: white;">${list.status}</span></td>
					<td>${list.awayTeam.name}</td>
					<td><img src="assets/images/icon24x24.png"></td>					
					<td class="actionhide"><a class="waves-effect waves-light btn-small" id="btndetailpertandingan" href="./matchdetail.html?id=${list.id}"><i class="material-icons">more_horiz</i></a></td>
				</tr>
				`;
			})

			document.getElementById("matchlist").innerHTML = matchList;
		})
}

function getTeamList()
{
	if ('caches' in window) 
	{
		caches.match(base_url_teamlist).then(function(response)
		{
			if(response)
			{
				response.json().then(function(data)
				{
					var teamList = "";
						data.teams.forEach(function(team)
						{
							let link = `http://wikipedia.org/wiki/${team.name}`;
							var parsedLink = link.split(' ').join('_');
							teamList +=`
							<tr onclick="if(window.confirm('Akan membuka laman Wikipedia ${team.name}, Lanjutkan?')){window.location.href='${parsedLink}';}else{ return }" style="cursor:pointer;">
								<td><img src="${team.crestUrl}" width="24" height="24"></td>
								<td>${team.name}</td>
								<td>${team.area.name}</td>					
								<td class="actionhide"><a class="waves-effect waves-light btn-small" id="btndetailpertandingan" href="./matchdetail.html?id=${team.id}"><i class="material-icons">more_horiz</i></a></td>
							</tr>
							`;
						})

						document.getElementById("teamlist").innerHTML = teamList;
				});
			}
		});
	}
	fetch(base_url_teamlist, requestOptions)
		.then(status)
		.then(json)
		.then(function(data)
		{
			var teamList = "";
			data.teams.forEach(function(team)
			{
				let link = `http://wikipedia.org/wiki/${team.name}`;
				var parsedLink = link.split(' ').join('_');
				teamList +=`
				<tr onclick="if(window.confirm('Akan membuka laman Wikipedia ${team.name}, Lanjutkan?')){window.location.href='${parsedLink}';}else{ return }" style="cursor:pointer;">
					<td><img src="${team.crestUrl}" width="24" height="24"></td>
					<td>${team.name}</td>
					<td>${team.area.name}</td>					
					<td class="actionhide"><a class="waves-effect waves-light btn-small" id="btndetailpertandingan" href="./matchdetail.html?id=${team.id}"><i class="material-icons">more_horiz</i></a></td>
				</tr>
				`;
			})

			document.getElementById("teamlist").innerHTML = teamList;
		})
}


function getMatchById()
{
	return new Promise(function(resolve, reject)
	{
		var urlParams = new URLSearchParams(window.location.search);
		var idParam = urlParams.get("id");

		if("caches" in window)
		{
			caches.match(base_url + "matches/" + idParam, requestOptions).then(function(response)
			{
				if(response)
				{
					response.json().then(function(data)
					{
						//Menyusun komponen card artikel secara dinamis

						var dtlMatch = `
						<tr>
							<td><img src="assets/images/icon24x24.png"></td>							
							<td>${data.match.homeTeam.name}</td>
							<td>VS</td>
							<td>${data.match.awayTeam.name}</td>
							<td><img src="assets/images/icon24x24.png"></td>					
						</tr>
						<tr>
							<td></td>
							<td>${data.head2head.homeTeam.wins}</td>
							<td>Wins</td>
							<td>${data.head2head.awayTeam.wins}</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td>${data.head2head.homeTeam.draws}</td>
							<td>Draw</td>
							<td>${data.head2head.awayTeam.draws}</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td>${data.head2head.homeTeam.losses}</td>
							<td>Lose</td>
							<td>${data.head2head.awayTeam.losses}</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td><b>${data.head2head.numberOfMatches}</b></td>
							<td>Jumlah Main</td>
							<td><b>${data.head2head.numberOfMatches}</b></td>
							<td></td>
						</tr>
						`;

						let tanggalMatch = `${data.match.utcDate}`;
						let tanggalMatchParsed = tanggalMatch.substring(0, 10);

						var dtlMatch2 = `
						<tr>
							<td>Divisi</td>
							<td>:</td>
							<td><img src="${data.match.competition.area.ensignUrl}" width="22" height="14"> ${data.match.competition.name}</td>
						</tr>
						<tr>
							<td>Stadion</td>
							<td>:</td>
							<td>${data.match.competition.name}</td>
						</tr>
						<tr>
							<td>Status</td>
							<td>:</td>
							<td><span class="badge blue" id="stsbadge" style="font-size: 8px; color: white;">${data.match.status}</span></td>
						</tr>
						<tr>
							<td>Mulai</td>
							<td>:</td>
							<td>${tanggalMatchParsed}</td>
						</tr>
						`

						//sisipkan komponen diatas kedalam elemen dengan id #body-content
						document.getElementById("matchdetail1").innerHTML = dtlMatch;
						//sisipkan komponen diatas kedalam elemen dengan id #body-content
						document.getElementById("matchdetail2").innerHTML = dtlMatch2;

						var x = document.getElementById('stsbadge');

						if (data.match.status === "POSTPONED") 
						{
							x.className = "badge red";
						}
						else
						{
							x.className = "badge blue";
						}

						//Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
						resolve(data);			
					});
				}
			});
		}
	
	  fetch(base_url + "matches/" + idParam, requestOptions)
		.then(status)
		.then(json)
		.then(function(data)
		{
			var dtlMatch = `
				<tr>
					<td><img src="assets/images/icon24x24.png"></td>							
					<td>${data.match.homeTeam.name}</td>
					<td>VS</td>
					<td>${data.match.awayTeam.name}</td>
					<td><img src="assets/images/icon24x24.png"></td>					
				</tr>
				<tr>
					<td></td>
					<td>${data.head2head.homeTeam.wins}</td>
					<td>Wins</td>
					<td>${data.head2head.awayTeam.wins}</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td>${data.head2head.homeTeam.draws}</td>
					<td>Draw</td>
					<td>${data.head2head.awayTeam.draws}</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td>${data.head2head.homeTeam.losses}</td>
					<td>Lose</td>
					<td>${data.head2head.awayTeam.losses}</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td><b>${data.head2head.numberOfMatches}</b></td>
					<td>Jumlah Main</td>
					<td><b>${data.head2head.numberOfMatches}</b></td>
					<td></td>
				</tr>
				`;

			let tanggalMatch = `${data.match.utcDate}`;
			let tanggalMatchParsed = tanggalMatch.substring(0, 10);

			var dtlMatch2 = `
				<tr>
					<td>Divisi</td>
					<td>:</td>
					<td><img src="${data.match.competition.area.ensignUrl}" width="22" height="14"> ${data.match.competition.name}</td>
				</tr>
				<tr>
					<td>Stadion</td>
					<td>:</td>
					<td>${data.match.venue}</td>
				</tr>
				<tr>
					<td>Status</td>
					<td>:</td>
					<td><span class="badge blue" id="stsbadge" style="font-size: 8px; color: white;">${data.match.status}</span></td>
				</tr>
				<tr>
					<td>Mulai</td>
					<td>:</td>
					<td>${tanggalMatchParsed}</td>
				</tr>
				`;
				
			document.getElementById("matchdetail1").innerHTML = dtlMatch;
			document.getElementById("matchdetail2").innerHTML = dtlMatch2;
			var x = document.getElementById('stsbadge');

			if (data.match.status === "POSTPONED") 
			{
				x.className = "badge red";
			}
			else
			{
				x.className = "badge blue";
			}
			//Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
			resolve(data);
		});
	});
}

function dapatkanMatchTersimpan()
{
	getAll().then(function(matches)
	{
		console.log(matches);
		//Menyusun komponen card artikel secara dinamis
		var daftarMatchTersimpan = "";
		matches.forEach(function(list)
		{
			daftarMatchTersimpan +=`
			<tr onclick="window.location.href='./matchdetail.html?id=${list.match.id}&saved=true';" style="cursor:pointer;">
				<td><img src="assets/images/icon24x24.png"></td>
				<td>${list.match.homeTeam.name}</td>
				<td>VS<br><span class="badge blue" id="bdgests" style="font-size: 8px; color: white;">${list.match.status}</span></td>
				<td>${list.match.awayTeam.name}</td>
				<td><img src="assets/images/icon24x24.png"></td>					
				<td class="actionhide"><a class="waves-effect waves-light btn-small" id="btndetailpertandingan" href="./matchdetail.html?id=${list.match.id}&saved=true"><i class="material-icons">more_horiz</i></a></td>
			</tr>
			`;
		})
		// Sisipkan komponen card kedalam elemen dengan id #body-content
		document.getElementById("savedmatchlist").innerHTML = daftarMatchTersimpan;
	});
}

function dapatkanMatchTersimpanById()
{
	var urlParams = new URLSearchParams(window.location.search);
	var idParam = urlParams.get("id");

	getById(idParam).then(function(data)
	{
		var dtlMatch = `
				<tr>
					<td><img src="assets/images/icon24x24.png"></td>							
					<td>${data.match.homeTeam.name}</td>
					<td>VS</td>
					<td>${data.match.awayTeam.name}</td>
					<td><img src="assets/images/icon24x24.png"></td>					
				</tr>
				<tr>
					<td></td>
					<td>${data.head2head.homeTeam.wins}</td>
					<td>Wins</td>
					<td>${data.head2head.awayTeam.wins}</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td>${data.head2head.homeTeam.draws}</td>
					<td>Draw</td>
					<td>${data.head2head.awayTeam.draws}</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td>${data.head2head.homeTeam.losses}</td>
					<td>Lose</td>
					<td>${data.head2head.awayTeam.losses}</td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td><b>${data.head2head.numberOfMatches}</b></td>
					<td>Jumlah Main</td>
					<td><b>${data.head2head.numberOfMatches}</b></td>
					<td></td>
				</tr>
				`;
			let tanggalMatch = `${data.match.utcDate}`;
			let tanggalMatchParsed = tanggalMatch.substring(0, 10);

			var dtlMatch2 = `
				<tr>
					<td>Divisi</td>
					<td>:</td>
					<td><img src="${data.match.competition.area.ensignUrl}" width="22" height="14"> ${data.match.competition.name}</td>
				</tr>
				<tr>
					<td>Stadion</td>
					<td>:</td>
					<td>${data.match.venue}</td>
				</tr>
				<tr>
					<td>Status</td>
					<td>:</td>
					<td><span class="badge blue" id="stsbadge" style="font-size: 8px; color: white;">${data.match.status}</span></td>
				</tr>
				<tr>
					<td>Mulai</td>
					<td>:</td>
					<td>${tanggalMatchParsed}</td>
				</tr>
				`;
				
			document.getElementById("matchdetail1").innerHTML = dtlMatch;
			document.getElementById("matchdetail2").innerHTML = dtlMatch2;
			var x = document.getElementById('stsbadge');

			if (data.match.status === "POSTPONED") 
			{
				x.className = "badge red";
			}
			else
			{
				x.className = "badge blue";
			}
	});
}

function getById(id)
{
	return new Promise(function(resolve, reject)
	{
		dbPromised
			.then(function(db)
			{
				var tx = db.transaction("tblmatchfav", "readonly");
				var store = tx.objectStore("tblmatchfav");
				return store.get(parseInt(id));
			})
			.then(function(data)
			{
				console.log(data);
				resolve(data);
			});
	});
}

function hapusMatchFav()
{
	var urlParams = new URLSearchParams(window.location.search);
	var idParam = urlParams.get("id");

	deleteMatchById(idParam).then(function(data)
	{
		alert('Berhasil Menghapus!');
	})
}

function deleteMatchById(id)
{
	return new Promise(function(resolve, reject)
	{
		dbPromised
			.then(function(db)
			{
				var tx = db.transaction("tblmatchfav", "readwrite");
				var store = tx.objectStore("tblmatchfav");
				return store.delete(parseInt(id));
			})
			.then((data) =>
			{
				window.location.href = './#savedmatch';
			})
	});
}