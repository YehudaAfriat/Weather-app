
// // Test the bubble sort function
// const testArray = [64, 34, 25, 12, 22, 11, 90];
// console.log("Original array:", testArray);
// console.log("Sorted array:", bubbleSort(testArray));


function capitalize(fullName){
    let names = fullName.split(' ');
    console.log(names);
    let capitalizedNames = names.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
    return capitalizedNames.join(' ');
}
console.log(capitalize("yehuda afriat"));
// output: Yehuda Afriat


