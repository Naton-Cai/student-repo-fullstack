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
function twoSum(input, target) {
  // iterate through all possible combinations of numbers
  for (let i = 0; i < input.length; i += 1) {
    for (let j = i + 1; j < input.length; j += 1) {
      if (input[i] + input[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
console.log('Input: [2,7,11,15], 9');
console.log('Output:', twoSum([2, 7, 11, 15], 9));
console.log('Input: [3,2,4], 6');
console.log('Output:', twoSum([3, 2, 4], 6));
console.log('Input: [3,3], 6');
console.log('Output:', twoSum([3, 3], 6));