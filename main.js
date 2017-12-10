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
	if (user.match(/[^a-zA-Z0-9-_]/)) return false;
	if (user.length < 3) return false;
	if (user.length > 20) return false;
	var _xhr=new XMLHttpRequest();
	_xhr.open("GET","https://api.scratch.mit.edu/users/" + user,false);
	_xhr.send();
	var parsed=JSON.parse(_xhr.responceText);
	if (parsed.code == "NotFound"){
		return false;
	} else{
		return true;
	}
}
