export const isArrayNotEmpty = (array:any) => {
  if(array && array.length > 0){
    return true;
  }else{
    return false;
  }
}

export const isArrayEmpty = (array: any) => {
  if (array && array.length == 0) {
    return true;
  }else {
    return false;
  }
}
export const uniqueBy = (arr: any, prop:any) => {
  let uniqueValue: any =new Map(arr.map((m: any) => [m[prop], m])).values()
  return [...uniqueValue];
};

export const numInIndianFormat = (x: any) =>{
  // x=x.toString();
  // var lastThree = x.substring(x.length-3);
  // var otherNum = x.substring(0,x.length-3);
  // if(otherNum != '')
  //   lastThree = ',' + lastThree;
  // var res = otherNum.replace(/\B(?=(\d{3})+(?!\d))/g,",") + lastThree;
  // return res
  // Second Method:
  // var nf = new Intl.NumberFormat();
  // var res = nf.format(x);
  // Third Method
  //return (Math.round(x * 100) / 100).toLocaleString();
  // forth Method 
  return x.toLocaleString("en-IN");

}

export const deepCopyFunction = (inObject: any) => {
  let outObject: any, value, key;
  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }
  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}
  for (key in inObject) {
    value = inObject[key]
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = (typeof value === "object" && value !== null) ? deepCopyFunction(value) : value
  }
  return outObject
}
