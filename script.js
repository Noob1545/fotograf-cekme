document.getElementsByTagName("button")[0].onclick = 

function foto(event){
        event.preventDefault();
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                const videoElement = document.getElementsByTagName("video")[0];
                videoElement.srcObject = stream;
                document.getElementsByTagName("button")[0].textContent = "Fotoğraf çek!";
                
                document.getElementsByTagName("button")[0].onclick = function(){
                    const canvas = document.createElement("canvas");
                    canvas.width = videoElement.videoWidth;
                    canvas.height = videoElement.videoHeight;
                    const context = canvas.getContext('2d');
                    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

                    canvas.toBlob(function(event){
                        console.log(event);
                        const reeder = new FileReader()
                        reeder.onload = function(){
                            const create = document.createElement("img")
                            create.src = this.result
                            document.body.append(create)
                        }
                        reeder.readAsDataURL(event)
                    },"image/png")
                    stream.getTracks().forEach(track => track.stop());
                    
                    document.getElementsByTagName("button")[0].textContent = "Tekrar çek!";
                    document.getElementsByTagName("button")[0].onclick = foto
                }
            })
            .catch(function (error) {
                if (error.name === "PermissionDeniedError") {
                    alert("Kamera izni vermedin!");
                } else if (error.name === "NotAllowedError") {
                    alert("Kamera erişimine izin verilmedi!");
                } else if (error.name === "NotFoundError") {
                    alert("Kamera tespit edilemedi!");
                } else {
                    console.error("Kamera erişim hatası:", error);
                }
            });
    };