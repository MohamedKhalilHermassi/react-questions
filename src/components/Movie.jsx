import  { useState } from 'react'
import {Card } from 'react-bootstrap'
import LikeButton from './LikeButton';

function Movie(props) {
    const [movie, setMovie] = useState(props.movie)
    const [likesBarValue,setLikesBarValue] = useState(0);
   
    useState(()=>{
        setLikesBarValue(movie.likes/(movie.likes+movie.dislikes)*100);
    },[movie])
  return (
    <Card className='mt-3'>
    <Card.Img src={movie.img} variant="top" height={250} />

    <Card.Body>
        <Card.Title> <b>{movie.title}</b> </Card.Title>
        <Card.Text>
            {movie.category}
        </Card.Text>
            <LikeButton movieId={movie.id} />

    
    
        <div className="progress">
    <div className="progress-bar bg-primary" role="progressbar" style={{width: `${likesBarValue}%`}} aria-valuemin={0} aria-valuemax={100} />
</div>
<div className='d-flex justify-content-start'>

</div>

    </Card.Body>
</Card>
  )
}

export default Movie
