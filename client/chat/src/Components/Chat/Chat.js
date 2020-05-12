import React from 'react';
import queryString from 'querystring';
import './Chat.css';
let socket;
const Chat = () => {
	const [ name, setName ] = useState('');
	const [ room, setRoom ] = useState('');
	const ENDPOINT = 'localhost:5000';
	useEffect(
		() => {
			const { name, room } = queryString.parse(location.search);
			socket = io(ENDPOINT);
			setName(name);
			setRoom(room);
			socket.emit('join', { name, room });
		},
		[ ENDPOINT, location.search ]
	);

	return <div>Chat</div>;
};

export default Chat;
