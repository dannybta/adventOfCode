window.addEventListener('load', async () => {
    const input = await fetch('input.txt')
    const text = await input.text()

    console.log(text.replace('\r\n\r\n', ",").split(","))
    document.querySelector(".answer1").innerHTML = JSON.stringify(input.body)
})