document.addEventListener('DOMContentLoaded', function() {
    // Get form and result elements
    const form = document.getElementById('lectureForm');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsContainer = document.getElementById('results');
    const formulaDisplay = document.getElementById('formulaDisplay');
    const finalGradeElement = document.getElementById('finalGrade');
    
    // Add event listener to calculate button
    calculateBtn.addEventListener('click', calculateLectureGrade);
    
    // Function to calculate lecture grade
    function calculateLectureGrade() {
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
        
        // Get essay data
        const essayValue = parseInt(document.querySelector('input[name="essay"]:checked').value);
        
        // Get quiz data
        const quiz1Value = parseInt(document.getElementById('quiz1').value);
        const quiz2Value = parseInt(document.getElementById('quiz2').value);
        const quiz3Value = parseInt(document.getElementById('quiz3').value);
        
        // Calculate quiz percentages
        const quiz1Percentage = (quiz1Value / 60) * 100;
        const quiz2Percentage = (quiz2Value / 40) * 100;
        const quiz3Percentage = (quiz3Value / 40) * 100;
        
        // Calculate prelim quizzes
        const prelimQuizzes = (essayValue + quiz1Percentage + quiz2Percentage + quiz3Percentage) / 4;
        
        // Get prelim exam data
        const prelimExamValue = parseInt(document.getElementById('prelimExam').value);
        
        // Calculate prelim class standing
        const prelimClassStanding = (prelimQuizzes * 0.6) + (attendancePercentage * 0.4);
        
        // Calculate final prelim grade
        const prelimGrade = (prelimExamValue * 0.6) + (prelimClassStanding * 0.4);
        
        // Display the formula with calculations
        const formulaText = generateFormulaText(
            totalDates, checkedDates, numAbsences, attendancePercentage,
            essayValue,
            quiz1Value, quiz2Value, quiz3Value,
            quiz1Percentage, quiz2Percentage, quiz3Percentage,
            prelimQuizzes, prelimExamValue, prelimClassStanding, prelimGrade
        );
        
        formulaDisplay.innerHTML = formulaText;
        finalGradeElement.textContent = prelimGrade.toFixed(2);
        resultsContainer.style.display = 'block';
    }
    
    // Function to validate inputs
    function validateInputs() {
        let isValid = true;
        
        // Validate Quiz 1 (0-60)
        const quiz1 = document.getElementById('quiz1').value;
        if (quiz1 === '' || isNaN(quiz1) || parseInt(quiz1) < 0 || parseInt(quiz1) > 60 || !Number.isInteger(parseFloat(quiz1))) {
            document.getElementById('quiz1Error').textContent = 'Please enter a valid integer between 0 and 60';
            isValid = false;
        }
        
        // Validate Quiz 2 (0-40)
        const quiz2 = document.getElementById('quiz2').value;
        if (quiz2 === '' || isNaN(quiz2) || parseInt(quiz2) < 0 || parseInt(quiz2) > 40 || !Number.isInteger(parseFloat(quiz2))) {
            document.getElementById('quiz2Error').textContent = 'Please enter a valid integer between 0 and 40';
            isValid = false;
        }
        
        // Validate Quiz 3 (0-40)
        const quiz3 = document.getElementById('quiz3').value;
        if (quiz3 === '' || isNaN(quiz3) || parseInt(quiz3) < 0 || parseInt(quiz3) > 40 || !Number.isInteger(parseFloat(quiz3))) {
            document.getElementById('quiz3Error').textContent = 'Please enter a valid integer between 0 and 40';
            isValid = false;
        }
        
        // Validate Prelim Exam (0-100)
        const prelimExam = document.getElementById('prelimExam').value;
        if (prelimExam === '' || isNaN(prelimExam) || parseInt(prelimExam) < 0 || parseInt(prelimExam) > 100 || !Number.isInteger(parseFloat(prelimExam))) {
            document.getElementById('prelimExamError').textContent = 'Please enter a valid integer between 0 and 100';
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
        essayValue,
        quiz1Value, quiz2Value, quiz3Value,
        quiz1Percentage, quiz2Percentage, quiz3Percentage,
        prelimQuizzes, prelimExamValue, prelimClassStanding, prelimGrade
    ) {
        return `
<strong>Attendance Calculation:</strong>
Number of Absences = Total Dates - Checked Dates = ${totalDates} - ${checkedDates} = ${numAbsences}
Attendance = 100% - (10% × Number of Absences) = 100% - (10% × ${numAbsences}) = ${attendancePercentage.toFixed(2)}%

<strong>Prelim Quizzes Calculation:</strong>
Essay = ${essayValue}%
Quiz 1 = ${quiz1Value}/60 × 100 = ${quiz1Percentage.toFixed(2)}%
Quiz 2 = ${quiz2Value}/40 × 100 = ${quiz2Percentage.toFixed(2)}%
Quiz 3 = ${quiz3Value}/40 × 100 = ${quiz3Percentage.toFixed(2)}%
Prelim Quizzes = (Essay + Quiz 1 + Quiz 2 + Quiz 3) ÷ 4
                = (${essayValue}% + ${quiz1Percentage.toFixed(2)}% + ${quiz2Percentage.toFixed(2)}% + ${quiz3Percentage.toFixed(2)}%) ÷ 4
                = ${prelimQuizzes.toFixed(2)}%

<strong>Prelim Class Standing Calculation:</strong>
Prelim Class Standing = (60% × Prelim Quizzes) + (40% × Attendance)
                        = (60% × ${prelimQuizzes.toFixed(2)}%) + (40% × ${attendancePercentage.toFixed(2)}%)
                        = ${(prelimQuizzes * 0.6).toFixed(2)}% + ${(attendancePercentage * 0.4).toFixed(2)}%
                        = ${prelimClassStanding.toFixed(2)}%

<strong>Prelim Grade Calculation:</strong>
Prelim Grade = (60% × Prelim Exam) + (40% × Prelim Class Standing)
                = (60% × ${prelimExamValue}%) + (40% × ${prelimClassStanding.toFixed(2)}%)
                = ${(prelimExamValue * 0.6).toFixed(2)}% + ${(prelimClassStanding * 0.4).toFixed(2)}%
                = ${prelimGrade.toFixed(2)}%
    `;
    }
});