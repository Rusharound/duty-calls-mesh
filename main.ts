input.onPinPressed(TouchPin.P0, function () {
    Status_Code += 0.5
    knight_rider_led()
    Xmit_Latest(Status_Code)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (Sender == 0) {
        if (receivedNumber != Local_Status_Code) {
            if (receivedNumber == 0) {
                Local_Status_Code = 0
            } else {
                Local_Status_Code = receivedNumber
            }
            basic.clearScreen()
            if (Local_Status_Code % 2 == 0) {
                basic.showLeds(`
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    # # # # #
                    `)
            } else {
                led.plot(2, 2)
            }
            Xmit_Latest(receivedNumber)
        }
    }
})
input.onPinReleased(TouchPin.P0, function () {
    Status_Code += 0.5
    knight_rider_led()
    Xmit_Latest(Status_Code)
})
function Xmit_Latest (num: number) {
    for (let index = 0; index < Send_cycles; index++) {
        radio.sendNumber(num)
        basic.pause(200)
    }
}
input.onButtonPressed(Button.A, function () {
    if (Sender == 1) {
        Status_Code += 1
        knight_rider_led()
        Xmit_Latest(Status_Code)
    }
})
function knight_rider_led () {
    for (let index = 0; index <= 4; index++) {
        led.plot(index, 0)
        basic.pause(100)
    }
    basic.clearScreen()
}
input.onButtonPressed(Button.B, function () {
    if (Sender == 1) {
        basic.showNumber(Status_Code)
    } else {
        basic.showNumber(Local_Status_Code)
    }
})
let Local_Status_Code = 0
let Status_Code = 0
let Door_status = 0
let Sender = 0
let Send_cycles = 0
radio.setGroup(12)
Send_cycles = 5
// earth's magnetic field is about 50 ut.   If a magnet is present, then device switches to sender mode
if (input.magneticForce(Dimension.X) > 100) {
    Sender = 1
    Door_status = 1
    Xmit_Latest(Status_Code)
    knight_rider_led()
}
