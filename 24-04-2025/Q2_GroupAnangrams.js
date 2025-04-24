/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let map = {};
    for(let word of strs){
        let i = word.split('').sort().join('');
        if(map[i]){
            map[i].push(word);
        }else{
            map[i] = [word];
        }
    }
    return Object.values(map);
};