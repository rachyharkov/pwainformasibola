const webPush = require('web-push');
 
const vapidKeys = 
{
   "publicKey": "BIJ8FZH0Whtk1sDX4xEmZQ9Z-GEmHY3L5hxUwcuGJUW_xtpAoBo6J39tN6NkB1k0ria5KEqlMJG_-i0VBzWnzGI",
   "privateKey": "Q1n3_jnOoq1yyPlZ-l45gT1Lpcxl6i8Y9KCa13jCHF0"
};
 
 
webPush.setVapidDetails(
   'mailto:rachy@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d_sFhu3-VKo:APA91bGNzN1gODAW7eqL9_8GEKpO9WS-NVYoa-t6Ba7HVCmIRZcnM-DOcfZ6SjDFTM3uo_cyX_ZMRQIiSZA6NlUB5VKm-RPFivjAQJh5zn0L8NNY35NctLw9NN-zyvg5lPkcaPcOCAQN",
   "keys": {
       "p256dh": "BHuJU4GAp8NejoYAhI6EyDIvePtaVi4rgwMdD4d/hHOpM4zGxv1EAdKyJfQQ5kq69SIlX9LP2GIPxKqd6edrNCo=",
       "auth": "Q0EdDwGZrmfneVd8KFxXDw=="
   }
};
var payload = 'This notification works very well...';
 
var options = {
   gcmAPIKey: '513496835487',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);