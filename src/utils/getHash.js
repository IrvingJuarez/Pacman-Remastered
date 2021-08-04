const getHash = () => {
    let validHash = location.hash
    if(validHash == ""){
        return "/"
    }else{
        return validHash.slice(2, validHash.length - 1)
    }
}

export default getHash;