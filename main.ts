radio.onReceivedNumber(function (receivedNumber) {
    if (Sender == 0) {
        if (receivedNumber != Local_Status_Code) {
            if (receivedNumber == 0) {
                Local_Status_Code = 0
            } else {
                Local_Status_Code = receivedNumber
            }
            Xmit_Latest(receivedNumber)
            Update_Screen(Local_Status_Code)
        }
    }
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
        Update_Screen(Status_Code)
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
input.onButtonPressed(Button.AB, function () {
    for (let index = 0; index < 4; index++) {
        knight_rider_led()
    }
})
function Update_Screen (val: number) {
    basic.clearScreen()
    if (val % 2 == 0) {
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
}
input.onButtonPressed(Button.B, function () {
    if (Sender == 1) {
        basic.showNumber(Status_Code)
    } else {
        basic.showNumber(Local_Status_Code)
    }
})
let new_status = 0
let Local_Status_Code = 0
let Status_Code = 0
let Sender = 0
let Send_cycles = 0
radio.setGroup(12)
Send_cycles = 5
// earth's magnetic field is about 50 ut.   If a magnet is present, then device switches to sender mode
if (Math.abs(input.magneticForce(Dimension.Strength)) > 350) {
    Sender = 1
    Xmit_Latest(Status_Code)
    for (let index = 0; index < 3; index++) {
        knight_rider_led()
    }
} else {
    basic.showIcon(IconNames.Happy)
    basic.pause(100)
    basic.clearScreen()
}
Update_Screen(1)
basic.forever(function () {
    if (Sender == 1) {
        new_status = pins.digitalReadPin(DigitalPin.P0)
        if (new_status == 1 && Status_Code % 2 == 0) {
            Status_Code += 1
            Update_Screen(Status_Code)
            Xmit_Latest(Status_Code)
        }
        if (new_status == 0 && Status_Code % 2 != 0) {
            Status_Code += 1
            Update_Screen(Status_Code)
            Xmit_Latest(Status_Code)
        }
    }
})
