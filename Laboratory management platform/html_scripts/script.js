$(document).ready(function(){
    $('.login_form').submit(function(e) {
        e.preventDefault(e)
        var data = {}
        $('.login_form').serializeArray().map(x => data[x.name] = x.value.trim())
        if(!data.email || !data.pass) return false
            
        $.post("/html_pages/login", data)
        .done(function(resp){
            if(resp.error) {
                return Swal.fire("Error", resp.error, 'error')
            }
            Swal.fire("Success", resp.success, 'success').then(_ => {
                window.location.href = '/dash'
            })
        })

        return false
    })
}