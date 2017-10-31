import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { updatePostVote, fetchComments, delPost } from './actions'
import Categories from './components/Categories'
import Posts from './components/Posts'
import Post from './components/Post'
import Home from 'react-icons/lib/fa/home'
import './App.css';


/*The main component of the App. It uses the Route component 
to ensure that a user can clearly navigate through the app using URLs*/

/*This component uses composing to call components likes Posts, Category and Categories*/
class App extends Component {

  render() {
    return (
      <div className="App">
        <h2 className="my-header">
          React and Redux Readable Application
        </h2>
        <Route exact path="/:category" render={({ history, match }) => (
          <div>
            <br/>
            <Link to='/'>
              <Home size={30} />
            </Link>
{/*The Category Component gets rendered here*/}
            <h4>Category: {match.params.category}</h4>
            <h3>Posts</h3>
{/*The Posts Component gets rendered here*/}
            <Posts posts={this.props.posts} category={match.params.category} onVote={this.props.onVote} onDeletePost={this.props.onDeletePost} />
          </div>
        )} />
        <Route exact path="/:category/:post_id" render={({ history, match }) => (
          <div>
{/* The Post Component gets rendered here*/}
            <Post id={match.params.post_id}
              category={match.params.category}
              onDeletePost={this.props.onDeletePost} />
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div>
            <h3>Existing Categories</h3>
{/*(The Categories Component gets rendered here)*/}
            <Categories categories={this.props.categories} />
            <h3>Existing Posts on the various Categories</h3>
            <Posts posts={this.props.posts} onVote={this.props.onVote} onDeletePost={this.props.onDeletePost} category='' />
          </div>
        )} />
      </div>
    );
  }
}


/*Binds the Components' state to its' properties*/
const mapStateToProps = (state) => ({
  categories: state.category.categories ? state.category.categories : [],
  posts: state.post.posts ? state.post.posts : []
})

/*Here, the method mapDispatchToProps maps the dispatch function
to the properties of the Component Post. The various actions are been executed 
by the dispatch function and the results assinged to the properties */

const mapDispatchToProps = dispatch => {
  return {
    onVote: (id, vote) => {
      dispatch(updatePostVote(id, vote))
    },
    loadPostComments: id => {
      dispatch(fetchComments(id))
    },
    onDeletePost: id => {
      dispatch(delPost(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App)
