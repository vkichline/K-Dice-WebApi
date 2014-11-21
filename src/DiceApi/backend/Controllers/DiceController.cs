using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DiceApi.Controllers.Controllers
{
    [Route("api/dice")]
    public class DiceController : Controller
    {
        private Random _r = new Random((int)DateTime.Now.Ticks);

        // GET api/dice/2/6
        [HttpGet("{dice}/{sides}")]
        [NoCache]
        public IEnumerable<string> Get(int dice, int sides)
        {
            if(dice < 1 || dice > 32 || sides < 2 || sides > 32)
            {
                return new string[] { };
            }
            string[] results = new string[(2 == sides && 3 == dice) ? 4 : dice];
            int total = 0;
            for (int i = 0; i < dice; i++)
            {
                int result = _r.Next(sides) + 1;
                if(2 == sides)
                {
                    results[i] = (result > 1) ? "Tails" : "Heads";
                    total += result + 1;
                }
                else
                {
                    results[i] = result.ToString();
                }
            }
            if (3 == dice && 2 == sides)
            {
                // Special, for I Ching throwing
                results[3] = total.ToString();
            }
            return results;
        }
    }
}
