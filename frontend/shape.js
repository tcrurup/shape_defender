class Shape{

    static equilateralTriangle(){
        let element = document.createElement('canvas')
        element.className = 'userShape'
        element.setAttribute('width', 50)
        element.setAttribute('height', 50)

        let context = element.getContext("2d")
        context.beginPath();
        context.moveTo(10,40)
        context.lineTo(25,10)
        context.lineTo(40,40)
        context.closePath()

        context.lineWidth = 5;
        context.strokeStyle = '#666666';
        context.stroke()

        context.fillStyle = "#FFCC00";
        context.fill();

        return element
    }

    static line(width, height){
        let element = document.createElement('canvas')
        element.className = 'projectile'
        element.setAttribute('width', width)
        element.setAttribute('height', height)

        let context = element.getContext("2d")
        context.beginPath();
        context.moveTo(width/2 ,0)
        context.lineTo(width/2, height)

        context.lineWidth = 1;
        context.strokeStyle = '#666666';
        context.stroke()

        return element
    }
}