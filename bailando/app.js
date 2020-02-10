var stato = '1'

function dance() {
  var img = document.getElementById('sickyDance')
  img.onclick = ''
  setInterval(function() {
    stato = toggle(stato)
    let imgName = stato
    img.src = './media/' + imgName + '.jpg'
    console.log('cambio avvenuto')
  }, 357.1428)
}

function toggle(value) {
  if (value === '1') {
    return '0'
  }
  return '1'
}
