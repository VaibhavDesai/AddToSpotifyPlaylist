// from - https://cssdeck.com/labs/ql8jmgjt

function updateLog() {
    var one = $("#opt_1:checked").val() ? "On" : "Off";
    var two = $("#opt_2:checked").val() ? "On" : "Off";
    var one = $("#opt_1:checked").val() ? "On" : "Off";
    var two = $("#opt_2:checked").val() ? "On" : "Off";

    console.log(one, two);
}

$(".radio-group__option").change(updateLog);