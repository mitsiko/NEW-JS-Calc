document.addEventListener('DOMContentLoaded', function() {
    // Get form and result elements
    const form = document.getElementById('laboratoryForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContainer = document.getElementById('results');
    const formulaDisplay = document.getElementById('formulaDisplay');
    const finalGradeElement = document.getElementById('finalGrade');
    
    // Add event listener to calculate button
    calculateBtn.addEventListener('click', calculateLabGrade);
    
    // Function to calculate laboratory grade
    function calculateLabGrade() {
        // Clear previous errors
        clearErrors();
        
        // Validate and get all inputs
        const validInputs = validateInputs();
        
        // If validation failed, abort calculation
        if (!validInputs) {
            resultsContainer.style.display = 'none';
            return;
        }
        
        // Get attendance data
        const totalDates = 5;
        const checkedDates = document.querySelectorAll('input[name="attendance"]:checked').length;
        const numAbsences = totalDates - checkedDates;
        const attendancePercentage = 100 - (10 * numAbsences);
        
        // Get lab work data
        const mp1Value = parseInt(document.getElementById('mp1').value);
        const mp2Value = parseInt(document.getElementById('mp2').value);
        const mp3Value = parseInt(document.getElementById('mp3').value);
        const docValue = parseInt(document.querySelector('input[name="documentation"]:checked').value);
        
        // Calculate lab work average
        const labWork = (mp1Value + mp2Value + mp3Value + docValue) / 4;
        
        // Get exam data
        const javaExam1Value = parseInt(document.getElementById('javaExam1').value);
        const javaExam2Value = parseInt(document.getElementById('javaExam2').value);
        const jsExam1Value = parseInt(document.getElementById('jsExam1').value);
        const jsExam2Value = parseInt(document.getElementById('jsExam2').value);
        
        // Calculate prelim exam
        const prelimExam = (javaExam1Value * 0.2) + (javaExam2Value * 0.3) + (jsExam1Value * 0.2) + (jsExam2Value * 0.3);
        
        // Calculate prelim class standing
        const prelimClassStanding = (labWork * 0.6) + (attendancePercentage * 0.4);
        
        // Calculate final prelim grade
        const prelimGrade = (prelimExam * 0.6) + (prelimClassStanding * 0.4);
        
        // Display the formula with calculations
        const formulaText = generateFormulaText(
            totalDates, checkedDates, numAbsences, attendancePercentage,
            mp1Value, mp2Value, mp3Value, docValue, labWork,
            javaExam1Value, javaExam2Value, jsExam1Value, jsExam2Value, prelimExam,
            prelimClassStanding, prelimGrade
        );
        
        formulaDisplay.innerHTML = formulaText;
        finalGradeElement.textContent = prelimGrade.toFixed(2);
        resultsContainer.style.display = 'block';
    }
    
    // Function to validate inputs
    function validateInputs() {
        let isValid = true;
        
        // Validate Machine Problem 1 (0-100)
        const mp1 = document.getElementById('mp1').value;
        if (mp1 === '' || isNaN(mp1) || parseInt(mp1) < 0 || parseInt(mp1) > 100 || !Number.isInteger(parseFloat(mp1))) {
            document.getElementById('mp1Error').textContent = 'Please enter a valid integer between 0 and 100';
            isValid = false;
        }
        
        // Validate Machine Problem 2 (0-100)
        const mp2 = document.getElementById('mp2').value;
        if (mp2 === '' || isNaN(mp2) || parseInt(mp2) < 0 || parseInt(mp2) > 100 || !Number.isInteger(parseFloat(mp2))) {
            document.getElementById('mp2Error').textContent = 'Please enter a valid integer between 0 and 100';
            isValid = false;
        }
        
        // Validate Machine Problem 3 (0-100)
        const mp3 = document.getElementById('mp3').value;
        if (mp3 === '' || isNaN(mp3) || parseInt(mp3) < 0 || parseInt(mp3) > 100 || !Number.isInteger(parseFloat(mp3))) {
            document.getElementById('mp3Error').textContent = 'Please enter a valid integer between 0 and 100';
            isValid = false;
        }
        
        // Validate Java Exam 1 (0-100)
        const javaExam1 = document.getElementById('javaExam1').value;
        if (javaExam1 === '' || isNaN(javaExam1) || parseInt(javaExam1) < 0 || parseInt(javaExam1) > 100 || !Number.isInteger(parseFloat(javaExam1))) {
            document.getElementById('javaExam1Error').textContent = 'Please enter a valid integer between 0 and 100';
            isValid = false;
        }
        
        // Validate Java Exam 2 (0-100)
        const javaExam2 = document.getElementById('javaExam2').value;
        if (javaExam2 === '' || isNaN(javaExam2) || parseInt(javaExam2) < 0 || parseInt(javaExam2) > 100 || !Number.isInteger(parseFloat(javaExam2))) {
            document.getElementById('javaExam2Error').textContent = 'Please enter a valid integer between 0 and 100';
            isValid = false;
        }
        
        // Validate JS Exam 1 (0-100)
        const jsExam1 = document.getElementById('jsExam1').value;
        if (jsExam1 === '' || isNaN(jsExam1) || parseInt(jsExam1) < 0 || parseInt(jsExam1) > 100 || !Number.isInteger(parseFloat(jsExam1))) {
            document.getElementById('jsExam1Error').textContent = 'Please enter a valid integer between 0 and 100';
            isValid = false;
        }
        
        // Validate JS Exam 2 (0-100)
        const jsExam2 = document.getElementById('jsExam2').value;
        if (jsExam2 === '' || isNaN(jsExam2) || parseInt(jsExam2) < 0 || parseInt(jsExam2) > 100 || !Number.isInteger(parseFloat(jsExam2))) {
            document.getElementById('jsExam2Error').textContent = 'Please enter a valid integer between 0 and 100';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Function to clear all error messages
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    // Function to generate formula text
    function generateFormulaText(
        totalDates, checkedDates, numAbsences, attendancePercentage,
        mp1Value, mp2Value, mp3Value, docValue, labWork,
        javaExam1Value, javaExam2Value, jsExam1Value, jsExam2Value, prelimExam,
        prelimClassStanding, prelimGrade
    ) {
        return `
    <strong>Attendance Calculation:</strong>
    Number of Absences = Total Dates - Checked Dates = ${totalDates} - ${checkedDates} = ${numAbsences}
    Attendance = 100% - (10% × Number of Absences) = 100% - (10% × ${numAbsences}) = ${attendancePercentage.toFixed(2)}%

    <strong>Lab Work Calculation:</strong>
    Machine Problem 1 = ${mp1Value}%
    Machine Problem 2 = ${mp2Value}%
    Machine Problem 3 = ${mp3Value}%
    Documentation = ${docValue}%
    Lab Work = (Machine Problem 1 + Machine Problem 2 + Machine Problem 3 + Documentation) ÷ 4
             = (${mp1Value}% + ${mp2Value}% + ${mp3Value}% + ${docValue}%) ÷ 4
             = ${labWork.toFixed(2)}%

    <strong>Prelim Exam Calculation:</strong>
    Java Exam 1 (20%) = ${javaExam1Value}% × 0.2 = ${(javaExam1Value * 0.2).toFixed(2)}%
    Java Exam 2 (30%) = ${javaExam2Value}% × 0.3 = ${(javaExam2Value * 0.3).toFixed(2)}%
    JS Exam 1 (20%) = ${jsExam1Value}% × 0.2 = ${(jsExam1Value * 0.2).toFixed(2)}%
    JS Exam 2 (30%) = ${jsExam2Value}% × 0.3 = ${(jsExam2Value * 0.3).toFixed(2)}%
    Prelim Exam = (20% × Java Exam 1) + (30% × Java Exam 2) + (20% × JS Exam 1) + (30% × JS Exam 2)
                = ${(javaExam1Value * 0.2).toFixed(2)}% + ${(javaExam2Value * 0.3).toFixed(2)}% + ${(jsExam1Value * 0.2).toFixed(2)}% + ${(jsExam2Value * 0.3).toFixed(2)}%
                = ${prelimExam.toFixed(2)}%

    <strong>Prelim Class Standing Calculation:</strong>
    Prelim Class Standing = (60% × Lab Work) + (40% × Attendance)
                          = (60% × ${labWork.toFixed(2)}%) + (40% × ${attendancePercentage.toFixed(2)}%)
                          = ${(labWork * 0.6).toFixed(2)}% + ${(attendancePercentage * 0.4).toFixed(2)}%
                          = ${prelimClassStanding.toFixed(2)}%

    <strong>Prelim Grade Calculation:</strong>
    Prelim Grade = (60% × Prelim Exam) + (40% × Prelim Class Standing)
                 = (60% × ${prelimExam.toFixed(2)}%) + (40% × ${prelimClassStanding.toFixed(2)}%)
                 = ${(prelimExam * 0.6).toFixed(2)}% + ${(prelimClassStanding * 0.4).toFixed(2)}%
                 = ${prelimGrade.toFixed(2)}%
    `;
    }
});