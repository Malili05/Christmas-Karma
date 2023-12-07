const getData= async () => {
    const response = await fetch('/api/children/chartData', {
        method: 'GET',
    })
    console.log(response.body)
    const data= await response.json()
    console.log(data)
    var ctx = document.getElementById('myPieChart').getContext('2d');
            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: data,
            });
}
getData()