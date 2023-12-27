const formatTodosForAI = (board:Board) => {
    const todos = Array.from(board.columns.entries());
    const flatArray = todos.reduce((map,[key,value])=>{
        map[key] = value.todos;
        return map;
    },{} as {[Key in TypedColumn]:Todo[]});

    const flatArrayCounted = Object.entries(flatArray).reduce(
        (map,[key,value]) => {
map[key as TypedColumn] = value.length;
return map;
        },
        {} as {[Key in TypedColumn]:number}
    );
    return flatArrayCounted;
};
export default formatTodosForAI;