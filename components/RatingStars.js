import { useState } from "react"
import Star from "./Star"

function RatingStars({ rate, isEnabledChange, onChange }) {
    const [ ratingValue, setRatingValue ] = useState(rate)

    return (
        <div className="container">
            <Star rate={1} isFilled={5.0 - ratingValue < 5.0} onClickStar={rate => clickedStar(rate)}></Star>
            <Star rate={2} isFilled={5.0 - ratingValue < 4.0} onClickStar={rate => clickedStar(rate)}></Star>
            <Star rate={3} isFilled={5.0 - ratingValue < 3.0} onClickStar={rate => clickedStar(rate)}></Star>
            <Star rate={4} isFilled={5.0 - ratingValue < 2.0} onClickStar={rate => clickedStar(rate)}></Star>
            <Star rate={5} isFilled={5.0 - ratingValue == 0.0} onClickStar={rate => clickedStar(rate)}></Star>

            <style jsx>{`
            .container {
                display: flex;
                flex-direction: row;
            }
            `}</style>
        </div>
    )

    function clickedStar(rate) {
        if (isEnabledChange === true) {
            setRatingValue(rate)
            onChange(rate)
        }
    }
}

export default RatingStars
