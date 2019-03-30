var marvel = {
    render: function() {   
        var url = "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=b5dd158dd0e856443db7fb726fbc6bc9&hash=80182fcb24c6426319114b9e34eafed6";
        var message = document.getElementById("message");
        var footer = document.getElementById("footer");
        var marvelContainer = document.getElementById("marvel-container");            
    
        $.ajax({
            url: url,
            type: "GET",
            beforeSend: function() {
                message.innerHTML ='Cargando...  <i class="fas fa-spinner fa-spin"></i>';
            },
            complete: function() {
                message.innerHTML = "";
            },
            success: function(data){
                footer.innerHTML = data.attributionHTML;
                var string ="";
                string += "<div class='row'>";
                for(var i = 0; i<data.data.results.length; i++)
                {
                    
                    var element = data.data.results[i];                   
                    string += '<div class="col-md-3">';                 
                    string += "<img src='"+element.thumbnail.path +"/portrait_fantastic."+element.thumbnail.extension+"'/>";
                    string += '<div align="left">';
                    string += '<button class="btn btn-success likes-button"><i class="fas fa-thumbs-up"></i> | <span class="likes" data-likes="0">0</span></button>';
                    string += '<button class="btn btn-danger dislikes-button"><i class="fas fa-thumbs-down"></i> | <span class="dislikes" data-dislikes="0">0</span></button>'
                    string += '</div>';
                    string += "<h3>"+element.title + "</h3>";                                                  
                    string += "</div>";                   
                    if((i+1) % 4 ==0) 
                    {
                        string += "</div>";
                        string += "<div class='row'>";
                    }
                }
                marvelContainer.innerHTML = string;

                //CONTADOR DE BOTON DE LIKES
                document.querySelectorAll('.likes-button, .likes').forEach(function(likeButton){
                    likeButton.addEventListener('click', incrementLikes);
                  });
                  function incrementLikes (e) {
                    e.stopPropagation();                    
                    var likes = e.target.querySelector('.likes') || e.target;
                    var incrementedLikes = parseInt(likes.dataset.likes) + 1;
                    likes.dataset.likes = incrementedLikes.toString();
                    likes.innerText = incrementedLikes;
                  }

                  //CONTADOR DE BOTON DE DISLIKE
                  document.querySelectorAll('.dislikes-button, .dislikes').forEach(function(dislikeButton){
                    dislikeButton.addEventListener('click', incrementDislikes);
                  });
                  function incrementDislikes (e) {
                    e.stopPropagation();
                    var dislikes = e.target.querySelector('.dislikes') || e.target;
                    var incrementedDislikes = parseInt(dislikes.dataset.dislikes) + 1;
                    dislikes.dataset.dislikes = incrementedDislikes.toString();
                    dislikes.innerText = incrementedDislikes;
                  }
            },
            error: function(){
                message.innerHTML = "We are sorry!";
            }
        });
    }

    
};

marvel.render();

