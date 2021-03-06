var fs = require('fs');
var config = {};

// IMPORTANT: In order to be able to launch the musiqpad server, set this to true
config.setup = true;

/*
 Set this flag to false to disable web server hosting or true to enable web server hosting.
 This is useful if you want to host static files in another web server such as nginx.

 If you are only hosting the socket and want musiqpad to host the frontend set this to false.
*/
config.hostWebserver = true;

config.socketServer = {
	host: '',     // Host name or IP that the socket server is located at. Leave blank to bind to process IP address
	port: '8082', // Leave blank to bind to process PORT
};

config.webServer = {
	address: '', // Leave blank to bind to process IP address
	port: '443' // Leave blank to bind to process PORT
};

config.useSSL = true;

config.certificate = {
key: fs.readFileSync('/home/ubuntu/keys/domain.key'),
cert: fs.readFileSync('/home/ubuntu/keys/domain.crt')
};

config.room = {
	name: 'kexodus.fm', // This is your pad name. It is shown as a user friendly description on the lounge and tab name.
	slug: 'kexodus', // Slugs are used to identify your pad when connecting to musiqpad! This slug must be unique and all in lowecase.
	greet: 'wb',
	//bg: 'http://i.imgur.com/5aJAD4Z.jpg', // Background image file path. Accepts external images. If this is undefined the default background will be used.
	maxCon: 0,
	ownerEmail: 'goat.partie@gmail.com', // This needs to be set, then the server restarted to take effect.
	guestCanSeeChat: true,
	bannedCanSeeChat: false,
	lastmsglimit: 6, // How many messages a user can see after joining.
	signupcd: 0, // How many miliseconds the user cannot do certain things after they sign up.
	allowemojis: true,
  allowrecovery: false,
	recaptcha: true,
	queue: {
		cycle: true,
		lock: false,
		limit: 50,
	},
	history: {
		limit_save: 0,
		limit_send: 50,
	},
	email: {
		confirmation: false, // Whether to force user to confirm his email address before he is able to do anything
		sender: 'your@email.tld',
		/*
			description: Email server setup, please refer to https://github.com/nodemailer/nodemailer documention on what the options are, supports xOAuth 2.0
			default: {}
		*/
		options: {},
	},
	description: '\
				 <h1>Description</h1>\
				 Welcome to kexodus. Where all the lads have class wanks to hot bitches with hot tits and fannies.\
				 ',
};

config.apis = {
	YT: {
		key: 'AIzaSyA9PIsRSkZx2oPN05UB4aEXzmGOyahbS0E', // Required api key in order for YouTube search to work.
		restrictSearchToMusic: false,
	},
	SC: {
		key: '',
	},
	reCaptcha: {
		key: '6LesaxwTAAAAACUqeK0endUa0KmWCVHhuMPx2Z01',
		secret: '6LesaxwTAAAAAEHNRmboCCUtp-WRG2GSiBbY_cVV',
	},
	musiqpad: {
		key: '826a46c5-6a87-c37a-77ba-83b3a9dabbe7', // This is required in order for your socket to update the musiqpad lounge. Request an API Key here: https://musiqpad.com/lounge
		sendLobbyStats: true,
	},
};

// The amount of time users stay logged in for before having to login again in days.
// 0 = login every time;
config.loginExpire = 7;

// Database config
config.db = {
	dbType: 		'level',   				// Values "level" for LevelDB and "mysql" for MySQL
	dbDir: 			'./socketserver/db',	// Only used for LevelDB. Directory to save databases.  Default is ./socketserver/db
	mysqlUser: 		'',     				// Only used for MySQL.  Database username
	mysqlPassword: 	'', 					// Only used for MySQL.  Database password
	mysqlHost: 		'',  					// Only used for MySQL.  Host address
	mysqlDatabase: 	'', 					// Only used for MySQL.  Database being used
};

/*
	'djqueue.join': Ability to join queue
	'djqueue.joinlocked': Ability to join locked queue
	'djqueue.leave': Ability to leave queue
	'djqueue.skip.self': Ability to skip self
	'djqueue.skip.other': Ability to skip others
	'djqueue.lock': Ability to lock/unlock queue
	'djqueue.limit': Ability to change waitlist limit
	'djqueue.cycle': Ability to enable/disable queue cycle
	'djqueue.move': Ability to move, swap, add and remove people in the queue
	'djqueue.playLiveVideos': Ability to play live videos with undefined duration
	'chat.send': Abilty to send chat messages
	'chat.delete': Ability to delete others' chat messages
	'chat.specialMention': Ability to use @everyone, @guest and @djs as mention
	'chat.broadcast': Ability to send a highlighted broadcast message
	'chat.private': Ability to send PMs
	'chat.staff': Ability to send and receive special staff chat
	'playlist.create': Ability to create playlists
	'playlist.delete': Ability to delete playlists
	'playlist.rename': Ability to rename playlists
	'playlist.import': Ability to import playlists
	'playlist.shuffle': Ability to shuffle playlists
	'room.grantroles': Ability to change user roles (requires canGrantPerms property)
	'room.banUser': Ability to ban and unban users
	'room.ratelimit.bypass': Will bypass ratelimit
    'room.whois': Possibility to request additional information about a user

	NOTE: Changing the PROPERTY NAME will break role assignments.  Title can be changed
	without breaking things, but property name must stay the same.
*/

// Defines the order that roles will appear on the user list
// PROPERTY names.  NOT title. (case-sensitive)
config.roleOrder = ['dev', 'top lad', 'lad', 'deep sea diver-looking cunt', 'bot', 'regular', 'weeb','default'];


// Defines which roles are 'staff' members
// PROPERTY names.  NOT title. (case-sensitive)
config.staffRoles = ['dev', 'top lad', 'lad', 'deep sea diver-looking cunt', 'bot','weeb'];


/*

Role Options:

rolename:{
	title: '',				// This is the title that gets displayed on the frontend.
	showtitle: true/false,	// This is whether or not to display the title on the frontend.
	badge: '',				// This can be any icon from the mdi package. A list of the icons is available here: https://materialdesignicons.com
	style: {},				// This can be used to set specific styles to the Username of a user with this role.
	permissions: [],		// A list of permissions a user with this role is allowed to use.
	canGrantRoles: [],		// A list of the roles that a user with this role can grant. I.e. an owner should be able to grant manager.
	mention: ''				// A custom mention. I.e. 'owner' would mention this group when someone typed @owner.
}

Below are a list of roles we suggest using.

*/

// Defines roles and permissions
config.roles = {
	owner: { // REQUIRED ROLE
		title: 'Owner',
		showtitle: true,
		style: {
			'color': '#F46B40'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.limit',
			'djqueue.move',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.broadcast',
			'chat.delete',
			'chat.specialMention',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.grantroles',
			'room.banUser',
			'room.ratelimit.bypass',
            'room.whois',
		],
		canGrantRoles: [
			'dev',
			'coowner',
			'supervisor',
			'bot',
			'regular',
			'default',
		],
	},
	dev: { // OPTIONAL ROLE - FOR MUSIQPAD DEVELOPERS
		title: 'Dev',
		showtitle: true,
		style: {
			'color': '#A77DC2'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.limit',
			'djqueue.move',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.broadcast',
			'chat.delete',
			'chat.specialMention',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.grantroles',
			'room.banUser',
			'room.ratelimit.bypass',
            'room.whois',
		],
		canGrantRoles: [
			'dev',
			'coowner',
			'supervisor',
			'bot',
			'regular',
      'weeb',
			'default'
		],
		mention: 'devs',
    badge:'worker',
	},
	coowner: {
		title: 'Co-owner',
		showtitle: true,
		style: {
			'color': '#89BE6C'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.limit',
			'djqueue.move',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.delete',
			'chat.specialMention',
			'chat.broadcast',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.grantroles',
			'room.banUser',
			'room.ratelimit.bypass',
            'room.whois',
		],
		canGrantRoles: [
			'supervisor',
			'bot',
			'regular',
			'default',
		],
	},
	supervisor: {
		title: 'Supervisor',
		showtitle: true,
		style: {
			'color': '#009CDD'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.move',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.delete',
			'chat.specialMention',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.grantroles',
			'room.banUser',
			'room.ratelimit.bypass',
            'room.whois',
		],
		canGrantRoles: [
			'regular',
			'default'
		],
	},
	bot: {
		title: 'Bot',
		showtitle: true,
		badge: 'android',
		style: {
			'color': '#964B74'
		},
		permissions: [
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.move',
			'chat.send',
			'chat.delete',
			'chat.specialMention',
			'room.banUser',
			'room.ratelimit.bypass',
		],
		canGrantRoles: [],
	},
	regular: {
		title: 'Regular',
		showtitle: false,
		style: {
			'color': '#925AFF'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'chat.send',
			'djqueue.skip.self',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
		],
		canGrantRoles: [],
	},
  weeb: {
		title: 'fucking weeb',
		showtitle: true,
		style: {
			'color': '#009CDD'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'chat.send',
			'djqueue.skip.self',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
		],
		canGrantRoles: [],
    badge:'emoticon-sad',
	},
	default: { // REQUIRED ROLE
		title: 'Default',
		showtitle: false,
		style: {
			'color': '#ffffff'
		},
		permissions: [
			'djqueue.join',
			'djqueue.leave',
			'chat.send',
			'djqueue.skip.self',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
		],
		canGrantRoles: [],
	}
};

module.exports = config;
