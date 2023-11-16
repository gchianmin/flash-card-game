using Microsoft.AspNetCore.Mvc;

namespace FlashcardApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CalculatorController : ControllerBase
{
    private readonly ILogger<CalculatorController> _logger;
    private static HashSet<Tuple<int, int>> generatedPairs = new HashSet<Tuple<int, int>>();
    private static int totalPairs = 169;

    public CalculatorController(ILogger<CalculatorController> logger)
    {
        _logger = logger;
    }

    [HttpGet("generate")]
    public IActionResult Generate(int operandA, int operandB)
    {
        Operands randomOperands = ValidateUniqueOperands();

        return Ok(randomOperands);
    }

    [HttpGet("calculate")]
    public IActionResult Calculate(string operation, int operandA, int operandB, float answer)
    {
        float result = 0.0f;

        switch (operation)
        {   
            
            case "Addition":
                result = Add(operandA, operandB);
                break;
            
            case "Subtraction":
                result = Subtract(operandA, operandB);
                break;

            case "Multiplication":
                result = Multiply(operandA, operandB);
                break;
        
            case "Division":
                if (operandB == 0) 
                {
                    return BadRequest("Cannot divide by zero.");
                }

                result = Divide(operandA, operandB);

                break;
        }

        if (answer != result)
        {
            return BadRequest("Wrong answer!"); 
        }
        else
        {
            return Ok("Correct answer!");
        }

    }

    // [HttpGet("add")]
    // public IActionResult Add(int operandA, int operandB)
    // {
    //     int result = operandA + operandB;

    //     return Ok(result);
    // }

    // [HttpGet("subtract")]
    // public IActionResult Subtract(int operandA, int operandB)
    // {
    //     int result = operandA - operandB;

    //     return Ok(result);
    // }

    // [HttpGet("multiply")]
    // public IActionResult Multiply(int operandA, int operandB)
    // {
    //     int result = operandA * operandB;

    //     return Ok(result);
    // }

    // [HttpGet("divide")]
    // public IActionResult Divide(int operandA, int operandB)
    // {
    //     if (operandB == 0) {
    //         return BadRequest("Cannot divide by zero.");
    //     }

    //     int result = operandA / operandB;

    //     return Ok(result);
    // }

    [HttpGet("restart")]
    public IActionResult Restart()
    {
        generatedPairs.Clear();

        return Ok("Game Restarted");
    }

    [HttpGet("gethashset")]
    public IActionResult GetHashSet()
    {
        // generatedPairs.Clear();

        return Ok(generatedPairs);
    }

    private Operands GenerateOperands()
    {
        Random random = new Random();
        int operandA = random.Next(0, 13);
        int operandB = random.Next(0, 13);        

        return new Operands { operandA = operandA, operandB = operandB };
    }

    private Operands ValidateUniqueOperands()
    {
        while (generatedPairs.Count < totalPairs)
        {
            Operands operands = GenerateOperands();
            Tuple<int, int> pair = Tuple.Create(operands.operandA, operands.operandB);

            // Check if the pair is already generated
            if (!generatedPairs.Contains(pair))
            {
                generatedPairs.Add(pair);

                return operands;
            }
        }

        return null;
    }

    private int Add (int operandA, int operandB)
    {
        return operandA + operandB;
    }

    private int Subtract (int operandA, int operandB)
    {
        return operandA - operandB;
    }

    private int Multiply (int operandA, int operandB)
    {
        return operandA * operandB;
    }

    private float Divide (int operandA, int operandB)
    {
        float result = (float)operandA / operandB;
        return (float)Math.Round(result, 2);
    }

    private class Operands 
    {
        public int operandA { get; set; }
        public int operandB { get; set; }
        
    }
}
