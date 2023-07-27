function BMI_Calc(weight = 90, height = 178)
{
    height = height/100
    return weight / (height * height)
}

function BMI_Status(bmi)
{
    if (bmi < 18.5)
    {
        return "لديك نقص في الوزن"
    }
    else if (bmi >= 18.5 && bmi < 25)
    {
        return "وزنك صحي"
    }
    else if (bmi >= 25)
    {
        return "لديك زياده في الوزن"
    }
}

function Calculate()
{
    let weight = document.getElementById("weight").value 
    let height = document.getElementById("height").value
    displayDiv = document.getElementById("result")

    let bmiResult = BMI_Calc(weight, height)
    let desc = BMI_Status(bmiResult)

    displayDiv.innerText = desc
    if (desc == "لديك نقص في الوزن")
    {
        displayDiv.style.color = "orange";
    }
    else if (desc == "وزنك صحي")
    {
        displayDiv.style.color = "green"
    }
    else if (desc == "لديك زياده في الوزن")
    {
        displayDiv.style.color = "red"
    }
}