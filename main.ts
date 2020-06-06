input.onButtonPressed(Button.A, function () {
    motor_ein = true
})
input.onButtonPressed(Button.B, function () {
    motor_ein = false
})
let dreh_grad_alt = 0
let drehgrad = 0
let distanz = 0
let motor_ein = false
basic.showIcon(IconNames.No)
motor_ein = true
let aktiv_distanz = 10
basic.forever(function () {
    distanz = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    )
    if (motor_ein && distanz < aktiv_distanz) {
        drehgrad = Math.map(distanz, 0, aktiv_distanz, 0, 90)
    } else {
        drehgrad = 90
    }
    serial.writeValue(convertToText(distanz), drehgrad)
    if (drehgrad != dreh_grad_alt) {
        pins.servoWritePin(AnalogPin.P0, drehgrad)
    } else {
        basic.showNumber(distanz)
        basic.pause(500)
    }
    dreh_grad_alt = drehgrad
})
