/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import { useReset } from './hooks'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'

import Notification from './components/Notification'
//import Success from './components/Success'

import BlogForm from './components/BlogForm'

import {
  createNewErrorNotification, hideNotification,
  createDeleteErrorNotification, createLikeErrorNotification,
  createNewSuccessNotification, createDeleteSuccessNotification,
  createLikeSuccessNotification
} from './reducers/notificationReducer'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'


import { Table, Form, Button, Navbar, Nav } from 'react-bootstrap'

function App(props) {

  const padding = { padding: 5 }

  const store = props.store
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  let username = useField('text')
  let password = useField('text')

  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const reset = useReset('text')

  //const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [blogFormVisible, setBlogFormVisible] = useState(false)


  const handleLogin = async event => {
    event.preventDefault()
    //alert(username.value)
    try {
      // muutettu hookia käyttävän lomakkeen mukaan: value erilleen:
      username = username.value
      password = password.value

      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      //reset()
      //setUsername('')
      //setPassword('')
    } catch (error) {
      console.log(error)
      //createErrorNotification()
      //setErrorMessage(errorMessage+' ERROR: wrong username or password')
      setTimeout(() => {
        //setErrorMessage(null)
        //hideNotification()
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    // eslint-disable-next-line linebreak-style
    setSuccessMessage('You have logged out.')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs.sort((a, b) => {
          return (a.likes - b.likes)
        }))
      })

  }, [])
  //console.log(blogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user._id
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //setSuccessMessage(`A new blog called ${newTitle} was created by ${newAuthor}.`)
        store.dispatch(createNewSuccessNotification(newTitle))
        console.log(store.getState())
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        //alert(user.name)
        setTimeout(() => {
          store.dispatch(hideNotification())
          //setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        store.dispatch(createNewErrorNotification())
        console.log(error)
        console.log(store.getState())
        //setErrorMessage('ERROR: blog could not be created')
        setTimeout(() => {
          store.dispatch(hideNotification())
          // setErrorMessage(null)
        }, 5000)
      })

  }

  const updateLikes = (id) => {
    const blog = blogs.find(b => b.id === id)
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user._id
    }

    blogService
      .update(id, blogObject)
      .then(returnedBlogs => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlogs))
        //alert(user.name)
        store.dispatch(createLikeSuccessNotification(blog.title))
        setTimeout(() => {
          store.dispatch(hideNotification())
        }, 5000)
      })

      .catch(error => {
        console.log(error)
        store.dispatch(createLikeErrorNotification())
        //setErrorMessage('ERROR: can\'t like this')
        setTimeout(() => {
          store.dispatch(hideNotification())
          //setErrorMessage(null)
        }, 5000)
      })

  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)

    blogService
      .deleteBlog(id)
      .then(returnedBlogs => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlogs))
        store.dispatch(createDeleteSuccessNotification(blog.title))
        //setSuccessMessage(`The blog called ${blog.title} was deleted.`)
        setTimeout(() => {
          store.dispatch(hideNotification())
          //setSuccessMessage(null)
        }, 5000)
        // setUser(user)
      })

      .catch(error => {
        console.log(error)
        store.dispatch(createDeleteErrorNotification())
        //setErrorMessage('ERROR: can\'t delete this blog')
        setTimeout(() => {
          store.dispatch(hideNotification())
          //setErrorMessage(null)
        }, 5000)
      })

  }


  const loginForm = () => {
    // console.log(username)
    return (
      <div>
        <h2>Log in to application</h2>
        <Form onSubmit={handleLogin} onClick={() => reset}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control key="username"
              {...username}
            />
            <Form.Label>password</Form.Label>
            <Form.Control
              {...password}
            />
            <Button variant="primary" type="submit" >submit</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const blogForm = () => {
    // näkyvyyden muuttaminen sen mukaan onko blogFormVisible false vai true
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenHidden = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button variant="primary" onClick={() => { setBlogFormVisible(true) }}>Create new blog</Button>
        </div>
        <div style={showWhenHidden}>
          <BlogForm
            title={newTitle}
            author={newAuthor}
            url={newUrl}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            handleSubmit={addBlog}
          />
          <Button variant="primary" onClick={() => { setBlogFormVisible(false) }}>Cancel</Button>
        </div>
      </div>
    )
  }

  // message={errorMessage}
  //message={successMessage}

  const Users = () => {
    useEffect(() => {
      userService
        .getAllUsers()
        .then(users => {
          setUsers(users)
        }
        )
    }, [])
    //console.log(users)
    return (
      <div>
        <h2>Users</h2>
        <Table striped>
          <thead>
            <td>User name</td>
            <td>Blogs</td>
          </thead>

          {users.map(user =>
            <tbody key={user.id} >
              <td>
                <Link to={`users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tbody>
          )
          }
        </Table>
      </div>
    )

  }

  const User = ({ user }) => {
    if (user === undefined) {
      return null
    }
    return (
      <div>
        <h2>{user.name}</h2>

        <h4>added blogs</h4>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  }

  const userById = (id) =>
    users.find(a => a.id === id)

  const blogById = (id) =>
    blogs.find(a => a.id === id)

  const BlogView = ({ blog }) => {
    if (blog === undefined) {
      return null
    }

    return (
      <div>
        <h2>{blog.title}</h2>
        <p>Author: {blog.author}
          <a href={blog.url}></a>
          {blog.likes}
          <button type="submit" onClick={() => updateLikes(blog.id)}> like </button><br />
          Added by {blog.user.name}</p>
        <h4>Comments</h4>
        {blog.comments}
      </div>
    )
  }

  const Home = () => {

    if (user === null) {
      return loginForm()
    } else {
      return (
        <div>
          <p className="userLogged">{user.name} is logged in
            <Button variant="primary" type="submit" onClick={handleLogOut}>logout</Button>
          </p>

          <h2>Blogs</h2>

          {blogForm()}
          <div className="blogItems">
            {blogs.map(blog =>

              <Blog
                key={blog.id} blog={blog} user={user.name} handleVisible={props.toggleVisibility}
                updateLikes={(e) => { e.stopPropagation(); updateLikes(blog.id) }}
                deleteBlog={(e) => { e.stopPropagation(); deleteBlog(blog.id) }}
              />
            )}
          </div>
        </div>
      )
    }
  }

  return (

    <div className="container">

      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">Users</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route exact path="/" render={() =>
            <div>
              <Notification
                store={props.store}
              />
              <Home
                user={user}
                blogs={blogs}
              />
            </div>
          } />

          <Route exact path="/users" render={() => <Users />} />

          <Route exact path="/users/:id" render={({ match }) =>
            <User
              user={userById(match.params.id)}
              blogs={blogs}

            />} />

          <Route exact path="/blogs/:id" render={({ match }) =>
            <BlogView
              blog={blogById(match.params.id)}
            />} />

        </div>
      </Router>


      {/*
      {user === null ?

        loginForm() :

        <div>
          <p className="userLogged">{user.name} is logged in
            <button type="submit" onClick={handleLogOut}>logout</button>
          </p>

          <h2>Blogs</h2>

          {blogForm()}
          <div className="blogItems">
            {blogs.map(blog =>

              <Blog
                key={blog.id} blog={blog} user={user.name} handleVisible={props.toggleVisibility}
                updateLikes={(e) => { e.stopPropagation(); updateLikes(blog.id) }}
                deleteBlog={(e) => { e.stopPropagation(); deleteBlog(blog.id) }}
              />

            )}
          </div>
        </div>
      }
*/}

    </div>
  )

}

export default App


