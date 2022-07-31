export function createGameCard(cardDetails) {
  const cardElement = document.createElement('div');
  cardElement.innerHTML = `
  	<div class="game__card"
	  data-game-card-is-opened="false"
	  data-game-card-name="${cardDetails.imageName}"
		>
  		<div class="game__card-flipper">
	 		<div class="game__card-front">
				<span class="game__card-icon">?</span>
	 		</div>
	 	<div class="game__card-back">
			<img src="${cardDetails.src}" alt="" class="game__card-image"
			/>
	 	</div>
  		</div>
	</div>
	 `;
  return cardElement;
}
