export function testLoad(test){
    return{
        type:'TEST_LOAD',
        payload : test 
    };
}
export function testPromisesLoad(name){
    return{
    type:'SET_NAME',
    payload : new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve([1,2,3,4])
        }, 2000);
    })
 }
}