let isSended;
let timeOut;
let timeLeft = 30000;

function timer(callback, delay) {
    var id, started, remaining = delay, running
    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }
    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }
    this.getTimeLeft = function() {
        if (running) {
            this.pause()
            this.start()
        }
        return remaining
    }
    this.getStateRunning = function() {return running}
    this.start()
}

$( document ).ready(function() {
    $("#phone").mask("+380(99) 999-99-99");
    /*function maskPhone() {
      var country = $('#country option:selected').val();
      switch (country) {
        case "ru":
          $("#phone").mask("+7(999) 999-99-99");
          break;
        case "ua":
          $("#phone").mask("+380(99) 999-99-99");
          break;
        case "by":
          $("#phone").mask("+375(999) 999-99-99");
          break;          
      }
    }
    maskPhone();
    $('#country').change(function() {
      maskPhone();
    });*/

    $("#btn").click(
		function(){
            if (!localStorage.getItem('isSended')) {
                localStorage.setItem('isSended', false);
            }
            isSended = JSON.parse(localStorage.getItem('isSended'));
            if (!isSended) {
                sendUserInfo('ajax_form', './bot/bot.php');
            } else {
                let timerId = setInterval(() => {
                    if (Math.round(timeOut.getTimeLeft()/1000) >= 0) {
                        $('#btn_text').html('Подождите ' + Math.round(timeOut.getTimeLeft()/1000) + ' секунд!')
                    } else {
                        $('#btn_text').html('Отправить')
                        clearInterval(timerId);
                    }
                }, 1000);
            }
            return false;
		}
	);
});

function sendUserInfo(ajax_form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: $("#"+ajax_form).serialize(),
        success: function(response) {
            $('.responseMessage').removeClass('error');
            $('.responseMessage').removeClass('success');
            if (response['success']){
                $('.responseMessage').addClass('success');
                $('.responseMessage').html('Отправлено!');
                localStorage.setItem('isSended', true);
                timeOut = new timer(function() {
                    localStorage.setItem('isSended', false);
                }, timeLeft);
            } else {            
                $('.responseMessage').addClass('error');
                $('.responseMessage').html(response['message']);               
            }
            $('.responseMessage').removeClass('hide');
    	},
    	error: function(response) {
            
    	}
 	});
}