'use strict'
var model = {
    winningValues: [7, 56, 73, 84, 146, 273, 292, 448] 
   ,allFieldsSum: 511
  ,fieldsValues: [1, 2, 4, 8, 16, 32, 64, 128, 256]
};

var view = {
    elements: {
        fields: [].slice.call(document.getElementsByClassName('field'))
        ,playersInfo: document.getElementById('players-info')
    }
    ,templates: {
        reset: '<button class="reset-btn" onclick="viewModel.reset()">Play Again</button>'
    }
};

var viewModel = {
    players: {
        X: {
           score: 0
        }
        ,O: {
            score: 0
        }
    }
   ,xTurn: true
   ,gameOver: false

   ,changeInnerHTML: function(el , val){
        el.innerHTML = '<p>'+ val +'</p>';
   }
   ,sumScore: function(whoseTurn, fieldVal){
       this.players[whoseTurn].score += fieldVal;
   }
   ,togglePlayer: function(){
       this.xTurn = !this.xTurn;
       view.elements.playersInfo.innerHTML = (this.xTurn? 'X' : 'O') + '\'s Turn'       
   }
   ,fieldClickHandler: function(){
        viewModel.play(this);
    }
   ,getFieldVal: function(index){
       return model.fieldsValues[index]
   }
   ,checkWins: function(whoseTurn){
        model.winningValues.map(function(winningValue) {
            if((viewModel.players[whoseTurn].score & winningValue) === winningValue){
                view.elements.playersInfo.innerText = whoseTurn + ' won!!'
                viewModel.gameOver = true;
            }
        })
        
   }
   ,checkDraw: function(){
        if((viewModel.players.X.score + viewModel.players.O.score) === model.allFieldsSum && !this.gameOver){
            view.elements.playersInfo.innerText = 'Draw!!';
            this.gameOver = true;
        }
   }
   ,reset: function(){
       viewModel.players = {
            X: {
              score: 0
            }
            ,O: {
               score: 0
            }
        }
        viewModel.xTurn = true;
        viewModel.gameOver = false;

        view.elements.fields.map(function(field){
            field.innerHTML = '';
        })
        viewModel.init();
   }
   ,addResetButton: function(){
        view.elements.playersInfo.insertAdjacentHTML("beforeend" , view.templates.reset )
   }
   ,play: function(el){    
        if(this.gameOver) return;

        var elIndex = view.elements.fields.indexOf(el);
        var fieldVal = this.getFieldVal(elIndex);
        var whoseTurn = this.xTurn? 'X' : 'O';
        this.changeInnerHTML(el, whoseTurn);
        this.sumScore(whoseTurn , fieldVal);
        el.removeEventListener('click', viewModel.fieldClickHandler);
        this.togglePlayer();
        this.checkWins(whoseTurn)
        this.checkDraw();
        if (this.gameOver) {
            this.addResetButton()
        }
    }
    ,init: function(){
        view.elements.playersInfo.innerHTML = 'X\'s Turn';
        for(var i = 0; i < view.elements.fields.length; i++){
         view.elements.fields[i].addEventListener('click' , viewModel.fieldClickHandler)
        }
    }
};
viewModel.init();
