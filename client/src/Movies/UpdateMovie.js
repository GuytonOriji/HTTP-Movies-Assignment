import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';









const UpdateMovie = props =>{





    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    const { id } = useParams();

    useEffect(() => {
        const movieToUpdate = props.movies.find(movie => `${movie.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, id])

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res);
                props.setUpdate(props.update + 1)
            })
            .catch(err => console.log(err));
    }
    
    return (
        <div>
            <h2>Update Movie</h2>

           


             <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input  type='text'
                    name='title'
                    onChange={handleChange}
                    placeholder='title'
                    value={movie.title} />
      </FormGroup>
       <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input   type='text'
                    name='director'
                    onChange={handleChange}
                    placeholder='director'
                    value={movie.director} />
      </FormGroup>
       <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input  type='text'
                    name='metascore'
                    onChange={handleChange}
                    placeholder='metascore'
                    value={movie.metascore} />
      </FormGroup>
       <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type='text'
                    name='stars'
                    onChange={handleChange}
                    placeholder='stars'
                    value={movie.stars}/>
      </FormGroup>
    
      <Button color='info'>Submit</Button>
    </Form>
        </div>
    )
}

export default UpdateMovie;