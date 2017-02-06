import React, { Component } from 'react';
import _ from 'lodash';

//var userTable = React.createClass({
class userTable extends Component {
	showUserDetails(userData,event)
	{
		console.log("Row clicked!!");
		console.log(userData.login);
		$(".mainPage").hide();
		$(".userDetailPage").show();
	}
	
	render() {
		//console.log("Inside userTable render");
		//console.log("data==="+this.props.data[0].login);
		//console.log("count==="+this.props.count);
		return (
			<div className="userTableContainer">
				<table className="UserTable">
					<tbody>
						<tr>
							<td>User Name</td>
							<td>Type</td>
							<td>User Image</td>
						</tr>
						{_.times(this.props.count, i =>
							<tr onClick={this.showUserDetails.bind(this,this.props.data[i])}>
								<td>{this.props.data[i].login} </td>
								<td>{this.props.data[i].type} </td>
								<td><img className="userImg" src={this.props.data[i].avatar_url} /> </td>
							</tr>	
						)}
					</tbody>	
				</table>
			</div>	
		);
	}
}	
//});

export default userTable;