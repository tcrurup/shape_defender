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
}