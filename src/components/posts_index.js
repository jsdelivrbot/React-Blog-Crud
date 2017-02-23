import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {

	componentWillMount (){
		this.props.fetchPosts();
	}

	renderPosts (){

		return this.props.posts.map((post) => {
			return (
				<li key={post.id} className="list-group-item">
					<Link to={"post/"+ post.id}>
						<span className="pull-xs-right">{post.categories}</span>
						<strong>{post.title}</strong>
					</Link>
				</li>
			);
		});
	}

	render () {
		return (
			<div>
				<div className="text-xs-right">
					<Link to="/post/new" className="btn btn-primary">Add a Post </Link>
				</div>
				<h3>Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps (state){
	return { posts: state.posts.all };
};

function mapDispatchToProps (dispatch){
	return bindActionCreators({ fetchPosts }, dispatch);
};


//connect have two parameters and the first parameter is mapStateToProps and the mapDispatchToProps, in this case we only have mapDispatchToProps and we assign null for the first parameter because we dont have that function.
export default connect (mapStateToProps, mapDispatchToProps)(PostsIndex);
