import React, { useContext, useState } from 'react'
import useFormValidation from '../authentication/useFormValidation'
import validateCreateLink from '../authentication/validateCreateLink'
import FirebaseContext from '../firebase/context'
import { Form, Container } from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Helmet} from "react-helmet";


const INITIAL_STATE = {
    snippet: "",
    title: "",
    description: "",
    thumbImg: "",

}

function CreateLink(props) {

    const { firebase, user } = useContext(FirebaseContext)

    const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink)
    const [snippet, setSnippet] = useState("")


    function handleCreateLink() {
        if(!user) {
            props.history.push('/login')
        } else {
            const { title, thumbImg, description } = values
            const newPost = {
                title,
                snippet: snippet,
                description,
                thumbImg,
                postedBy: {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email, 
                },
                starCount: 0,
                stars: [],
                comments: [],
                created: Date.now()
            }
            firebase.db.collection('snippets').add(newPost)
            props.history.push('/')
        }
    }


    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create</title>
                <meta name="description" content="In the process of creating a post."></meta>
            </Helmet>
            <br></br>
            <br></br>
            <h2 className="titulo">Publishing your snippet</h2>
            <br></br>
            <Form onSubmit={handleCreateLink} className="flex flex-column">

                <Form.Group id="Post">
                    <Form.Label>Title of the snippet</Form.Label>
                    <Form.Control
                    onChange={handleChange}
                    values={values.title}
                    name="title"
                    placeholder="title"
                    autoComplete="off"
                    type="text"
                    className={errors.title && 'error-input'} />
                </Form.Group>
                {errors.title && <p className="error-text">{errors.title}</p>}
                <br></br>
                <Form.Group id="thumb">
                    <Form.Label>Post Thumb Url</Form.Label>
                    <Form.Control
                    onChange={handleChange}
                    values={values.thumbImg}
                    name="thumbImg"
                    placeholder="Post image Url"
                    autoComplete="off"
                    type="text"
                    className={errors.thumbImg && 'error-input'} />
                </Form.Group>
                {errors.thumbImg && <p className="error-text">{errors.thumbImg}</p>}
                <br></br>
                <Form.Group id="content">
                    <Form.Label>Code snippet</Form.Label>
                    <CKEditor
                    style={{ height: 400, backgroundColor: '#fff' }}
                    className=""
                    editor={ ClassicEditor }
                    data={snippet}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setSnippet(data);
                    }}
                    />
                </Form.Group>
                {errors.text && <p className="error-text">{errors.text}</p>}
                <br></br>
                <Form.Group id="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    onChange={handleChange}
                    values={values.description}
                    name="description"
                    placeholder="Description of the snippet"
                    autoComplete="off"
                    type="text"
                    className={errors.description && 'error-input'} />
                </Form.Group>
                {errors.description && <p className="error-text">{errors.description}</p>}
                <br></br>
                <button className="" type="submit">
                    Publish
                </button>
            </Form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </Container>
    )
}

export default CreateLink