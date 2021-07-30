<template>
    <div hidden v-html="createTagHtml"></div>
</template>

<script>
export default {

  data: () => ({
    dataImage: null,
    categaColor: null,
    ImageToConvert: { "logo": Image, "category": CategoryName, "pin": PinImage}
  }),
    
  computed: {
    createTagHtml () {
      return `<img src='${this.ImageToConvert.logo}' id="img64"/> <img src='${this.dataImage}' id="NewCanvas"/>`
    }
  },
    
    methods: {
 //Setting the category color to the pin
    setColor () {
      switch (this.ImageToConvert.category) {
        case 'category1 ':
          this.categaColor = '#1310e3'
          break
        case 'category 2':
          this.categaColor = '#ff121e'
          break
        case 'category 3 ':
          this.categaColor = '#1e91fc'
          break
        case 'category 4':
          this.categaColor = '#ff9933'
          break
      }
      this.canvasPattern()
    },
 //Receiving image from html and creating Canvas
   async canvasPattern () {
      var imagem64 = document.getElementById('img64')
      imagem64.crossOrigin = 'Anonymous'
      var canvasPattern = document.createElement('canvas')
      canvasPattern.width = 350
      canvasPattern.height = 350
      var ctxImagem = canvasPattern.getContext('2d')
      ctxImagem.drawImage(imagem64, 13, 10, 220, 220)
      var dataImage64 = await canvasPattern.toDataURL()
      this.dataImage = dataImage64
      setTimeout(() => {
        this.createPin()
      }, 1)
    },
      
      // Create Pin in Canvas
      
      createPin () {
      var novaImagem64 = document.getElementById('NewCanvas')
      novaImagem64.crossOrigin = 'Anonymous'
      var canvas = document.createElement('canvas')
      canvas.width = 245
      canvas.height = 323
      var ctxPin = canvas.getContext('2d')
      ctxPin.beginPath()
      ctxPin.arc(123, 120, 120, 0.75, 0.76 * Math.PI, true)
      ctxPin.fillStyle = this.categaColor
      ctxPin.moveTo(32.5, 199)
      ctxPin.lineTo(122.5, 320)
      ctxPin.lineTo(213.5, 199)
      ctxPin.closePath()
      ctxPin.fill()
      // Create Mask White
      var ctxCircle = canvas.getContext('2d')
      ctxCircle.beginPath()
      ctxCircle.arc(123, 120, 110, 0, 2 * Math.PI, true)
      ctxCircle.fillStyle = '#FFFFFF'
      ctxCircle.closePath()
      ctxCircle.fill()
      this.insertImgToPin(canvas, novaImagem64)
    },
     
      //Inserting Image inside the pin Canvas
     insertImgToPin (canvas, novaImagem64) {
      var ctxLogo = canvas.getContext('2d')
      var pattern = ctxLogo.createPattern(novaImagem64, 'no-repeat')
      ctxLogo.beginPath()
      ctxLogo.fillStyle = pattern
      ctxLogo.arc(123, 120, 110, 0, 2 * Math.PI, true)
      ctxLogo.closePath()
      ctxLogo.fill()
      var data64 = canvas.toDataURL()
      this.dataImage = data64
      this.insertPin()
      return data64
    },
      // Inserting pin inside the data
    insertPin () {
      if (this.ImageToConvert.categoria) this.ImageToConvert.pin = this.dataImage
    },
      
  //Methods starts when the category and the logo are set
    watch: {
      'ImageToConvert.category' () {
      if (this.ImageToConvert.logo) {
        setTimeout(() => {
          this.setColor()
        }, 1)
      }
    },
    'ImageToConvert.logo' () {
      if (this.ImageToConvert.category) {
        setTimeout(() => {
          this.setColor()
        }, 1)
      }
    },
    }
     
   </script>
      
   
    
