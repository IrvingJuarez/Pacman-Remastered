const getHash = () => {
    return window.location.pathname.slice(5)
}

export default getHash;