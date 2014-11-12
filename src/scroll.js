    window.onscroll = function(location, called, posX){
        if (window.pageYOffset>150 && !called){
            
            if (window.pageYOffset>location){
            posX+=window.pageYOffset/100000
            called=true;
            }else{
                posX-=window.pageYOffset/100000
            }
            location=window.pageYOffset;
        }
        if (window.pageYOffset>1000){
            called=false;
        }

            
        


      console.log('hellos')

       modifier.transformFrom(Transform.rotateX(posX));


    };