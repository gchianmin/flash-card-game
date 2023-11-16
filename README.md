# flash-card-game

This is a flash card game called FlashMath that was built to practice multiplication tables. Other than multiplication, other operations are also available for practice. The applicatoin fulfills the following requirements:
1. Create a program for practicing multiplication tables
2. Generate two random numbers between zero and 12
3. Allow the user to input the product
4. Indicate whether the user was correct or incorrect
5. If the user was correct, generate two more numbers
6. Keep score: award one point for correct answers; subtract a point for incorrect answers
7. Add a timer. The goal is to achieve the highest score in one minute of play. Starting a new game resets the score to zero.
8. Add other operations (+, -, × , ÷)
9. Track which number combinations have been shown. Ensure that all 169 pairs are guaranteed to be shown eventually.

### Tech Stack
- Backend: ASP.NET
- Frontend: Next.js

### Running the Program
1. `git clone https://github.com/gchianmin/flash-card-game.git`
2. `cd src/FlashcardApi` and `dotnet run` to run the .NET API services. 
3.  `cd src/flashcard-app` and install the necessary node modules by running `npm install`. 
4. `npm run dev` to start using the application.


### Potential Improvement Points
1. Add Authentication, store user info and the highest score obtained.
2. The user interface could be further improved to enhance the user experience.
   
