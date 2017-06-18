const local = {
    result: null,
};

export default {
    setResult: (result) => local.result = result,
    getResult: () => local.result,
};
