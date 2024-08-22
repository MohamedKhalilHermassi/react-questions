import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeMovie, dislikeMovie } from '../redux/MovieSlice';

function LikeButton({movieId}) {
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);

        if (checked) {
            dispatch(likeMovie(movieId));
        } else {
            dispatch(dislikeMovie(movieId));
        }
    };

    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={`flexSwitchCheckDefault-${movieId}`}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`flexSwitchCheckDefault-${movieId}`}>
                {isChecked ? 'Liked' : 'Not Liked'}
            </label>
        </div>
    );
}

export default LikeButton;
