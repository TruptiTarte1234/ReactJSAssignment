import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import './App.css';


class App extends Component {
//var App = React.createClass({
	/*
	getInitialState() {
		return {
			JsonData: [],
			count: 0
		};
	}*/
	
	constructor(){
		super();
		this.state = {
			JsonData: [],
			filteredData: [],
			count: 0,
			rowClicked: false,
			user: []
		}
	}
	componentDidMount() {
		//$("#root").html("Hello World");
		$.ajax({
		   url: 'https://api.github.com/search/users?q=tom',
		   error: function() {
			  $('#root').html('<p>An error has occurred</p>');
		   },
		   dataType: 'jsonp',
		   success: function(data) {
				data = JSON.stringify(data);
				//console.log("data==="+data);
				var user_data = JSON.parse(data);
				//console.log("Inside Success!!!"+user_data.data.items);
				this.setState({
					JsonData: user_data.data.items,
					filteredData: user_data.data.items,
					count: user_data.data.items.length
				});
				console.log("In ajax call=="+typeof(this.state.filteredData));
		   }.bind(this),
		   type: 'GET'
		});
	}
	
	doSearch(event)
	{
		this.setState({
			filteredData: [],
			count: 0
		});
		var queryText = event.target.value || '';
		var queryResult= [];
		this.state.JsonData.forEach(function(user){
			if(user.login.indexOf(queryText)!=-1 || queryText === '')
				queryResult.push(user);
		});			
		this.setState({
			filteredData: queryResult,
			count: queryResult.length
		});			
	}
	
	showUserDetails(userData,event)
	{
		$(".mainPage").hide();
		$(".userDetailPage").show();
		this.setState({
			rowClicked : true,
			user : userData
		});
	}
	
	backToHome(event)
	{
		$(".mainPage").show();
		$(".userDetailPage").hide();
	}
	
	render() {
		
		var content = "";
		var userDetailContent= "";
		if(this.state.count > 0)
		{
			console.log("Inside count > 0");
			content = (
				<div className="userTableContainer">
					<table className="UserTable">
						<tbody>
							<tr className="firstRow">
								<td>User Name</td>
								<td>Type</td>
								<td>User Image</td>
							</tr>
							{_.times(this.state.count, i =>
								<tr onClick={this.showUserDetails.bind(this,this.state.filteredData[i])}>
									<td>{this.state.filteredData[i].login} </td>
									<td>{this.state.filteredData[i].type} </td>
									<td><img className="userImg" src={this.state.filteredData[i].avatar_url} /> </td>
								</tr>	
							)}
						</tbody>	
					</table>
				</div>
			)
		}
		if(this.state.rowClicked == true)
		{
			userDetailContent = (
				<div>
				<img className="userImg1" src={this.state.user.avatar_url} />
				<div className="userDetail">
					<p className="fieldName">User Name:</p> <p className="fieldValue">{this.state.user.login}</p>
					<p className="fieldName">avatar_url:</p> <p className="fieldValue"> <a href={this.state.user.avatar_url}>{this.state.user.avatar_url}</a></p>
					<p className="fieldName">url:</p> <p className="fieldValue"> <a href={this.state.user.url}>{this.state.user.url}</a></p>
					<p className="fieldName">html_url:</p> <p className="fieldValue"> <a href={this.state.user.html_url}>{this.state.user.html_url}</a></p>
					<p className="fieldName">gists_url:</p> <p className="fieldValue"> <a href={this.state.user.gists_url}>{this.state.user.gists_url}</a></p>
					<p className="fieldName">subscriptions_url:</p> <p className="fieldValue"> <a href={this.state.user.subscriptions_url}>{this.state.user.subscriptions_url}</a></p>
					<p className="fieldName">organizations_url:</p> <p className="fieldValue"> <a href={this.state.user.organizations_url}>{this.state.user.organizations_url}</a></p>
					<p className="fieldName">repos_url:</p> <p className="fieldValue"> <a href={this.state.user.repos_url}>{this.state.user.repos_url}</a></p>
					<p className="fieldName">events_url:</p> <p className="fieldValue"> <a href={this.state.user.events_url}>{this.state.user.events_url}</a></p>
					<p className="fieldName">received_events_url:</p> <p className="fieldValue"> <a href={this.state.user.received_events_url}>{this.state.user.received_events_url}</a></p>
				</div>
				</div>
			);
		}
		return(
			<div className="App"> 
				<div className="mainPage">
					<input className="searchBox" onChange={this.doSearch.bind(this)} type="text" placeholder="Search By User Name" />
					{content}
				</div>
				<div className="userDetailPage">
					<div className="backBtn" onClick={this.backToHome.bind(this)}>Back To Main Page</div>
					{userDetailContent}
				</div>
			</div>
		)
		return (
			<div className="App"> 
				
			</div>
		);
	}
}	
//});

export default App;
