import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount(){
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick (){
    this.props.deletePost(this.props.params.id)
    .then(() => {
      this.context.router.push("/");
    });
  }

  render (){
    const post = this.props.post;
    if (!this.props.post){
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories:{post.categories}</h6>
        <p>{post.content}</p>
        <Link to="/" className="btn btn-primary">Back To Index</Link>
        <button 
        className="btn btn-danger pull-xs-right"
        onClick={this.onDeleteClick.bind(this)} >
        Delete Post</button>
      </div>
    )
  };

}

function mapStateToProps (state){
  return {
    post: state.posts.post
  };
}


function mapDispatchToProps (dispatch){
  return bindActionCreators( { fetchPost, deletePost }, dispatch);
};


export default connect ( mapStateToProps, mapDispatchToProps)(PostsShow) ;