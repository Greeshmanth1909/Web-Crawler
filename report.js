function reportResults(obj) {
    console.log('Printing Results to the Console');
    Object.keys(obj).forEach((val) => {
        console.log(`Found ${obj[val]} internal links to ${val}`);
    });
    console.log('DONE');
}
export { reportResults };
