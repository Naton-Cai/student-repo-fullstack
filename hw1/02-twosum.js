/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/
function twoSum(inputArray) {
    outputArray = [];
    //iterate through all possible combinations of numbers, ignoring duplicates pairs and pairs using the same index
    for (let i = 0; i < inputArray.length; i++) {
        for (let y = i + 1; y < inputArray.length; y++) {
            if (inputArray[i] + inputArray[y] == inputTarget) {
                outputArray.push([i, y]);
            }
        }
    }
    return outputArray
}

inputArray = JSON.parse(process.argv[2]);
inputTarget = parseInt(process.argv[3], 10);
if (!Array.isArray(inputArray)) {
    console.log("array is missing or not formated correctly, arrays should be in the format '4,2,3'");
    return;
}

if (isNaN(inputTarget)) {
    console.log("Please provide a target number")
    return;
}

output = twoSum(inputArray)
console.log(output);