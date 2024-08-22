import { useEffect, useState } from 'react';
import { movies$ } from '../../movies'; 
import { Col, Container, Row, Button } from 'react-bootstrap';
import Movie from './Movie';
import { useDispatch, useSelector } from 'react-redux';
import { removeMovieFromList, setMoviesState } from '../redux/MovieSlice';

function MoviesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(4); 
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const moviesState = useSelector((state) => state.movies.movies);

    useEffect(() => {
        const setMoviesRedux = async () => {
            movies$
                .then((data) => {
                    dispatch(setMoviesState(data));
                    updateCategories(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        setMoviesRedux();
    }, [dispatch]);

    const updateCategories = (movies) => {
        const categorySet = new Set(movies.map(movie => movie.category));
        setCategories([...categorySet]);
    };

    const filteredMovies = selectedCategory === 'All'
        ? moviesState
        : moviesState.filter(movie => movie.category === selectedCategory);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleMoviesPerPageChange = (e) => {
        setMoviesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const removeMovie = (id) => {
        dispatch(removeMovieFromList(id));
        const updatedMovies = moviesState.filter(movie => movie.id !== id);
        updateCategories(updatedMovies);
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <h1>Movies List</h1>
            </div>

            <div className="d-flex justify-content-center mb-3">
                <label htmlFor="moviesPerPage" className="mr-2">Movies per page:</label>
                <select id="moviesPerPage" value={moviesPerPage} onChange={handleMoviesPerPageChange}>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                </select>
            </div>

            <div className="d-flex justify-content-center mb-3">
                <fieldset>
                    <legend>Filter by Category:</legend>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="allCategories"
                            name="category"
                            value="All"
                            checked={selectedCategory === 'All'}
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label" htmlFor="allCategories">
                            All
                        </label>
                    </div>
                    {categories.map((category) => (
                        <div className="form-check" key={category}>
                            <input
                                className="form-check-input"
                                type="radio"
                                id={category}
                                name="category"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={handleCategoryChange}
                            />
                            <label className="form-check-label" htmlFor={category}>
                                {category}
                            </label>
                        </div>
                    ))}
                </fieldset>
            </div>

            <Container>
                <Row>
                    {currentMovies.map((element) => (
                        <Col key={element.id} md={3}>
                            <Movie movie={element} />
                            <Button className='btn btn-danger mt-2' onClick={() => removeMovie(element.id)}>
                                Supprimer
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Container>

            <div className="d-flex justify-content-center mt-4">
                <Button 
                    variant="secondary" 
                    onClick={handlePrevious} 
                    disabled={currentPage === 1}
                >
                    Précédent
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <Button
                        key={number}
                        variant={currentPage === number ? "primary" : "secondary"}
                        className="mx-1"
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </Button>
                ))}
                <Button 
                    variant="secondary" 
                    onClick={handleNext} 
                    disabled={currentPage === totalPages}
                >
                    Suivant
                </Button>
            </div>
        </div>
    );
}

export default MoviesList;
