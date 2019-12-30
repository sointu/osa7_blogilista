import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <h4>Create new blog</h4>
        <Form.Label> Title:</Form.Label>
        <Form.Control
          type="text"
          value={newTitle}
          onChange={() => handleTitleChange}
        />
        <br />
        <Form.Label> Author:</Form.Label>
        <Form.Control
          input="type"
          value={newAuthor}
          onChange={() => handleAuthorChange}
        />
        <br />
        <Form.Label>Url:</Form.Label> 
        <Form.Control
          type="text"
          value={newUrl}
          onChange={() => handleUrlChange}
        />
        <br />
        <Button variant="primary" type="submit">Create</Button>
      </Form.Group>
    </Form>)
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string,
  newAuthor: PropTypes.string,
  newUrl: PropTypes.string
}

export default BlogForm