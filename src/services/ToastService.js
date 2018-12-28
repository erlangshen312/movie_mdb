import React from "react";
import ReactDOM from "react-dom";
import {ToastContainer, toast} from 'react-toastify';
import translate from "./translate";

export default class ToastService extends React.Component {
	
	static toast(title, msg, delay, code) {
		toast(() => <div>
			<strong>{translate.get(title)}</strong>
			<p>{translate.get(msg)}</p>
			<p>{code}</p>
		</div>);
		ReactDOM.render(<ToastContainer autoClose={delay ? delay : 3000}/>, document.getElementById('toasts'));
	}
	
	static info(title, msg, delay, code) {
		toast.info(() => <div>
			<strong>{translate.get(title)}</strong>
			<p>{translate.get(msg)}</p>
			<p>{code}</p>
		</div>);
		ReactDOM.render(<ToastContainer autoClose={delay ? delay : 3000}/>, document.getElementById('toasts'));
	}
	
	static warn(title, msg, delay, code) {
		toast.warn(() => <div>
			<strong>{translate.get(title)}</strong>
			<p>{translate.get(msg)}</p>
			<p>{code}</p>
		</div>);
		ReactDOM.render(<ToastContainer autoClose={delay ? delay : 3000}/>, document.getElementById('toasts'));
	}
	
	static success(title, msg, delay, code) {
		toast.success(() => <div>
			<strong>{translate.get(title)}</strong>
			<p>{translate.get(msg)}</p>
			<p>{code}</p>
		</div>);
		ReactDOM.render(<ToastContainer autoClose={delay ? delay : 3000}/>, document.getElementById('toasts'));
	}
	
	static error(title, msg, delay, code) {
		toast.error(() => <div>
			<strong>{translate.get(title)}</strong>
			<p>{translate.get(msg)}</p>
			<p>{code}</p>
		</div>);
		ReactDOM.render(<ToastContainer autoClose={delay ? delay : 3000}/>, document.getElementById('toasts'));
	}
	
	static message(fullname, msg, avatar) {
		toast(() => <div className="msg-toast">
			<div className="msg-toast-avatar">{avatar && <img src={avatar} alt={fullname}/>}</div>
			<div className="msg-toast-body"><strong>{fullname}</strong> <br/> {msg}</div>
		</div>);
		ReactDOM.render(<ToastContainer position="bottom-right"
		                                closeOnClick
		                                autoClose={3000}/>, document.getElementById('toasts'));
	}
}


