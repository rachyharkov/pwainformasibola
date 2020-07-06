//Lakukan register SERVICE-WORKER
if("serviceWorker" in navigator)
{
	window.addEventListener("load",function()
	{
		navigator.serviceWorker
		.register('/pwainformasibola/service-worker.js')
		.then(function()
		{
			console.log("Service Worker Berhasil di Inisialisasi! (SW_INITIALIZE_SUCCESS)");
		})
		.catch(function()
		{
			console.log("Service Worker gagal di Inisialisasi (FAILED_TO_INITIALIZE)");
		});
	});
}
else
{
	console.log("Service Worker belum didukung pada browser ini (SW_NOT_SUPPORTED_IN_TB)");
}

// Request API
document.addEventListener("DOMContentLoaded", function()
{
	getKlasemenInggris();
});


if ("Notification" in window) 
{
  	requestPermission();
} 
else 
{
	console.error("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
function requestPermission() 
{
	Notification.requestPermission().then((result) =>
	{
		if (result === "denied") 
		{
	  		console.log("Fitur notifikasi not allowed.");
	  		return;
		} 
	        else if (result === "default") 
		{
		console.error("User closed notification window.");
			return;
		}

		navigator.serviceWorker.ready.then(()=>
		{
			if (('PushManager' in window)) 
			{
				navigator.serviceWorker.getRegistration().then((registration) =>
				{
					registration.pushManager.subscribe(
					{
						userVisibleOnly: true,
						applicationServerKey: urlBase64ToUint8Array("BIJ8FZH0Whtk1sDX4xEmZQ9Z-GEmHY3L5hxUwcuGJUW_xtpAoBo6J39tN6NkB1k0ria5KEqlMJG_-i0VBzWnzGI")
			    	})
					.then(function(subscribe) 
					{
						console.log('Sambungan ke endpoint sukses!: ', subscribe.endpoint);
						console.log('p256dh key: ', btoa(String.fromCharCode.apply(
						null, new Uint8Array(subscribe.getKey('p256dh')))));
				            console.log('Auth key: ', btoa(String.fromCharCode.apply(
						null, new Uint8Array(subscribe.getKey('auth')))));
					})
						.catch(function(e) 
					{
						    console.error('Tidak dapat melakukan subscribe ', e.message);
					});
				});
			}
		});
	});
}
function urlBase64ToUint8Array(base64String) 
{
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) 
    {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}