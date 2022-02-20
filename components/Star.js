function Star({ rate, isFilled, onClickStar }) {
    return (
        <div id='rating'>
            <span className={isFilled ? 'filled' : ''} onClick={(event) => clickedStar(event)}></span>

            <style jsx>{`
                #rating span {
                    font-size: 15px;
                }
                #rating span::before {
                    content: '★';
                }
                .filled {
                    color: orange;
                }
            `}</style>
        </div>
    );

    function clickedStar(event) {
        event.preventDefault();

        onClickStar(rate);
    }
}

export default Star;
