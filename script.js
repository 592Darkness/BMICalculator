document.addEventListener('DOMContentLoaded', function() {
    const unitSystemSelect = document.getElementById('unit-system');
    const heightInput = document.getElementById('height-input');
    const weightInput = document.getElementById('weight-input');
    const heightLabel = document.getElementById('height-label');
    const weightLabel = document.getElementById('weight-label');
    const heightFields = document.getElementById('height-fields');
    const weightField = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculate-btn');
    const bmiValueSpan = document.getElementById('bmi-value');
    const bmiCategorySpan = document.getElementById('bmi-category');

    function updateInputFields() {
        const unitSystem = unitSystemSelect.value;

        if (unitSystem === 'imperial') {
            heightLabel.textContent = 'Height (feet and inches):';
            weightLabel.textContent = 'Weight (pounds):';
            heightFields.innerHTML = `
                <input type="number" id="feet" placeholder="Feet" min="0">
                <input type="number" id="inches" placeholder="Inches" min="0" max="11">
            `;
            weightField.placeholder = 'How much you rocking, baby?';
        } else {
            heightLabel.textContent = 'Height (cm):';
            weightLabel.textContent = 'Weight (kg):';
            heightFields.innerHTML = `
                <input type="number" id="cm" placeholder="How long is your... height?" min="0">
            `;
            weightField.placeholder = 'What\'s your gravity, gorgeous?';
        }
    }

    function calculateBMI() {
        const gender = document.getElementById('gender').value;
        const unitSystem = unitSystemSelect.value;
        let height, weight, bmi;

        if (unitSystem === 'imperial') {
            const feet = parseFloat(document.getElementById('feet').value) || 0;
            const inches = parseFloat(document.getElementById('inches').value) || 0;
            weight = parseFloat(weightField.value);
            height = (feet * 12) + inches;
            bmi = (weight / (height * height)) * 703;
        } else {
            const cm = parseFloat(document.getElementById('cm').value);
            weight = parseFloat(weightField.value);
            height = cm / 100;
            bmi = weight / (height * height);
        }

        bmiValueSpan.textContent = bmi.toFixed(2);
        bmiCategorySpan.textContent = getBMICategory(bmi);
        addGenderContext(gender, bmi);
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) return 'Bedroom Breeze 💨';
        if (bmi < 25) return 'Prime Mating Material 💋';
        if (bmi < 30) return 'Voluptuous Vixen 🍈🍈';
        return 'Plus-Sized Passion 🌕';
    }

    function addGenderContext(gender, bmi) {
        const contextDiv = document.getElementById('gender-context');
        const flirtyComment = document.getElementById('flirty-comment');
        contextDiv.innerHTML = '';
        
        let comment = "";
        if (gender === 'female') {
            comment = "🔥 Those curves could start a wildfire! BMI can't measure what's under those clothes...";
            if (bmi < 25) flirtyComment.textContent = "That waist was made for grabbing 😈";
            else flirtyComment.textContent = "Those soft curves are nature's pillow 😇";
        } else if (gender === 'male') {
            comment = "💪 Is that a calculator in your pocket or...? Those muscles need their own ZIP code!";
            if (bmi < 25) flirtyComment.textContent = "Six-pack alert! 🚨 Can I take a swim?";
            else flirtyComment.textContent = "Big strong arms deserve big strong hugs 🥵";
        } else {
            comment = "🌈 Your body is a wonderland - when's the grand tour?";
            flirtyComment.textContent = "Mystery excites me... show me more 🔍";
        }

        const p = document.createElement('p');
        p.innerHTML = comment;
        contextDiv.appendChild(p);
    }

    unitSystemSelect.addEventListener('change', updateInputFields);
    calculateBtn.addEventListener('click', calculateBMI);

    updateInputFields();
});