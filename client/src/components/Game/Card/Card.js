import React from 'react';

const Card = ({ id, card }) => {
  return (
    <div class="card-scene">
      <div id={id} class="card">
        <div class="card-face card-backing">
          <div class="grain-overlay"></div>

          <div class="top-banner">Click to Flip</div>
          <div class="back-main">
            <div class="pipboy">
              <div class="twelve-point-star"></div>
              <img src="/images/cat_cover.png" alt="card cover" />
            </div>
          </div>
        </div>
        <div class="card-face card-front">
          <h1>{card}</h1>
          <div class="main-pane">
            <img class="slugger" src={`/images/${card}.png`} alt="card front" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
