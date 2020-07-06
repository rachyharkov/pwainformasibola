importScripts("/assets/js/workbox/workbox-sw.js");

if (workbox) 
{
	console.log('Workbox berhasil di load!');
}
else
{
	console.log('Workbox gagal di load :(');
}

const urlsToCache = [
	{ url: "/", revision: '1' },
	{ url: "/nav.html", revision: '1' },
	{ url: "/index.html", revision: '1' },
	{ url: "/matchdetail.html", revision: '1' },
	{ url: "/manifest.json", revision: '1' },
	{ url: "/service-worker.js", revision: '1' },
	{ url: "/assets/css/materialize.min.css", revision: '1' },
	{ url: "/assets/css/style-custom.css", revision: '1' },
	{ url: "/assets/js/materialize.min.js", revision: '1' },
	{ url: "/assets/js/api.js", revision: '1' },
	{ url: "/assets/js/db.js", revision: '1' },
	{ url: "/assets/js/href.js", revision: '1' },
	{ url: "/assets/js/idb.js", revision: '1' },
	{ url: "/assets/js/nav.js", revision: '1' },
	{ url: "/assets/js/reg-sw.js", revision: '1' },
	{ url: "/assets/js/workbox/workbox-sw.js", revision: '1' },
	{ url: "/assets/images/apple-icon192x192.png", revision: '1' },
	{ url: "/assets/images/icon192x192.png", revision: '1' },
	{ url: "/assets/images/icon24x24.png", revision: '1' },
	{ url: "/assets/images/icon512x512.png", revision: '1' },
	{ url: "/assets/images/landing-image.png", revision: '1' },
	{ url: "/pages/home.html", revision: '1' },
	{ url: "/pages/aboutus.html", revision: '1' },
	{ url: "/pages/matchlist.html", revision: '1' },
	{ url: "/pages/savedmatch.html", revision: '1' },
	{ url: "/pages/teamlist.html", revision: '1' },
	{ url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: '1' },
	{ url: "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", revision: '1' }
]

workbox.precaching.precacheAndRoute(urlsToCache, {ignoreUrlParametersMatching: [/.*/]});

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate(
  {
      cacheName: 'cache_urlAPI'
  })
);

workbox.routing.registerRoute(
  new RegExp("/assets/images/"),
  workbox.strategies.staleWhileRevalidate(
  {
      cacheName: 'cache_image_resource'
  })
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate(
  {
      cacheName: 'cache_page_resource'
  })
);

self.addEventListener('push', event =>
{
	let body;
	if (event.data) 
	{
		body = event.data.text();
	}
	else
	{
		body = 'Payload tidak bekerja...';
	}

	let options = 
	{
		body: body,
		icon: 'assets/images/icon192x192.png',
		badge: 'assets/images/icon24x24.png',
		vibrate: [100, 50, 100],
		data:
		{
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil
	(
		self.registration.showNotification('Push Notif Work!', options)
	);
});