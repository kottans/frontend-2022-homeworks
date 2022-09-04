export default class CustomRange {
  constructor(glob) {
    this.input01 = glob.rangeAge01
    this.input02 = glob.rangeAge02
    this.track = glob.trackAge
    this.values = glob.valuesAge
    this.colorPrimary = glob.colorPrimary
    this.colorMan = glob.colorMan
    this.colorWoman = glob.colorWoman
    this.gradienrOffset = 2

    this.inputs = new Map()
    this.inputs.set(this.input01, this.input02)
    this.inputs.set(this.input02, this.input01)
  }

  changeCustomRange(that) {
    if (+this.input01.value <= +this.input02.value) {
      this.inputs.get(that).style.zIndex = '1'
      that.style.zIndex = '2'
      this.changeRangeValuesInHTML()
      this.fillRangeTrack()
    }
    else that.value = this.inputs.get(that).value
  }

  changeRangeValuesInHTML() {
    this.values.innerText = `${this.input01.value} - ${this.input02.value}`
  }

  fillRangeTrack(){
    let percent01 = this.input01.value / this.input01.max * 100 - this.gradienrOffset
    let percent02 = this.input02.value / this.input02.max * 100 + this.gradienrOffset

    this.track.style.background = `linear-gradient(to right, ${this.colorPrimary} ${percent01}% , ${this.colorMan} ${percent01}% , ${this.colorWoman} ${percent02}%, ${this.colorPrimary} ${percent02}%)`
  }
}
