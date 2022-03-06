let isSended;
let timeOut;
let timeEnd;
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
    $("#btn").click(
		function(){
            if (!localStorage.getItem('isSended')) {
                localStorage.setItem('isSended', JSON.stringify({type: false}));
            }
            isSended = JSON.parse(localStorage.getItem('isSended'));
            if (!isSended.type) {
                sendUserInfo('ajax_form', '/bot/bot.php');
            } else {
                timeEnd = isSended.date + 30;
                let timerId = setInterval(() => {
                    let seconds = timeEnd - Math.round(new Date() / 1000);
                    if (seconds >= 0) {
                        $('#btn_text').html('Подождите ' + seconds + ' секунд!')
                    } else {
                        localStorage.setItem('isSended', JSON.stringify({type: false}));
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
            $('.form-tooltip').tooltip('hide');
            $('.form-tooltip').removeClass('error');
            if (response['success']){
                Swal.fire({
                  icon: 'success',
                  title: 'Успешно!',
                  text: response['message']
                });
                $("#"+ajax_form)[0].reset();
                localStorage.setItem('isSended', JSON.stringify({type: true, date: Math.round(new Date() / 1000)}));
            } else {
                if (response['message']) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Упс...',
                      text: response['message']
                    });
                }
                if (response['errorMessage'] !== '') {
                    $(response['element']).addClass('error');
                    $(response['element']).tooltip({
                        title: response['errorMessage'],
                        placement: 'top'
                    });
                    $(response['element']).tooltip('show');
                }
            }
    	},
    	error: function(response) {
    	}
 	});
}