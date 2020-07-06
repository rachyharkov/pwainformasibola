var dbPromised = idb.open("dbSoccerData2", 1, function(upgradeDb) 
{
  	var matchesObjectStore = upgradeDb.createObjectStore("tblmatchfav", {
    keyPath: "match.id"
  });
  matchesObjectStore.createIndex("match.homeTeam.name","match.homeTeam.name",{unique: false});
});


function saveMatch(matches)
{
	dbPromised
		.then(function(db)
		{
			var tx = db.transaction("tblmatchfav", "readwrite");
			var store = tx.objectStore("tblmatchfav");
			store.put(matches);
			return tx.complete;
		})
		.then(function() //berhasil
		{
			M.toast({html: 'Berhasil Disimpan!'});
			console.log("Match berhasil disimpan!");
		})
}

function getAll() 
{
  return new Promise(function(resolve, reject) 
  {
    dbPromised
      	.then(function(db) 
      	{
        	var tx = db.transaction("tblmatchfav", "readonly");
        	var store = tx.objectStore("tblmatchfav");
        	return store.getAll();
      	})
      	.then(function(matches) 
      	{
        	resolve(matches);
      	});
  	});
}