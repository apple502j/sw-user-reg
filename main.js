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
	_xhr.open("GET","http://scratch.mit.edu/users/" + user,false);
	_xhr.send();
	return _xhr.responceText.match(/<span class="group">\n +Scratcher/) != null;
}

function howLongByNow(user){
	var _xhr=new XMLHttpRequest();
	_xhr.open("GET","https://api.scratch.mit.edu/users/" + user,false);
	_xhr.send();
	var theday = _xhr.responceText.match(/\"joined\": \"20[0-9][0-9]-(0|1)[1-9]-[0-3][0-9]/);
}
