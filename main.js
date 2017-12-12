/*
    Copyright (C) 2017  apple502j

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

var WikiSettings={
	"user":true,
	"scratcher":true,
	"days":180,
	"comment":true,
	"match":false,
	"wikiapi":"https://jp.scratch-wiki.info/w/api.php"
};

function isCommentOpen(user){
	var _xhr=new XMLHttpRequest();
	_xhr.open("GET","http://scratch.mit.edu/users/" + user,false);
	_xhr.send();
	return _xhr.responceText.match(/template-feature-off comments-off/) != null;
}

function isUser(user){
	if (user.match(/[^a-zA-Z0-9-_]/)) return false; // Only A-Z,a-z,0-9,-,_ is available
	if (user.length < 3) return false; // Username must be 3 or more than.
	if (user.length > 20) return false;// Username must be 20 or less than.
	var _xhr=new XMLHttpRequest();
	_xhr.open("GET","https://api.scratch.mit.edu/users/" + user,false);
	_xhr.send();
	if (_xhr.status == 404) {
		return false;
	} else {
		return true;
	}
}

function isScratcher(user){
	var _xhr=new XMLHttpRequest();
	_xhr.open("GET","https://scratch.mit.edu/users/" + user,false);
	_xhr.send();
	return _xhr.responseText.match(/<span class="group">\n +Scratcher/) != null;
}

function howLongByNow(user){
	var _xhr=new XMLHttpRequest();
	_xhr.open("GET","https://api.scratch.mit.edu/users/" + user,false);
	_xhr.send();
	var dic = JSON.parse(_xhr.responseText);
	var theday = new Date(dic.history.joined);
	var now = new Date();
	return Math.ceil( (now.getTime() - theday.getTime()) / 1000 / 60 / 60 / 24 );
}

function wikiMatch(user){
	var _xhr=new XMLHttpRequest();
	_xhr.open("GET",WikiSettings.wikiapi + "?action=query&format=json&list=allusers&auprefix=" + user.charAt(0).toUpperCase(),false);
	_xhr.send();
	var dic = JSON.parse(_xhr.responseText);
	var users=dic.query.allusers;
	for(var i=0;i<users.length;i++){
	if(users[i].name.toUpperCase().indexOf(user.toUpperCase()) != -1) {
			return true;
		}
	}
	return false;
}
	
