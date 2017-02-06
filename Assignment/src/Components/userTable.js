import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import './App.css';

var userTable = React.createClass({
	render: function() {
		return (
			<table className="UserTable">
				<tbody>
					<tr>
						<td>User Name</td>
						<td>Type</td>
						<td>User Image</td>
					</tr>
					{_.times(this.props.count, i =>
						<tr>
							<td>{this.props.data[0].login} </td>
							<td>{this.state.data[0].login} </td>
							<td>{this.state.data[0].login} </td>
						</tr>	
					)}
				</tbody>	
			</table>
		);
	}
});

export default userTable;