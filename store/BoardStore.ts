import { ID, databases, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";

interface BoardState {
    board: Board;
    getBoard: () => void;
    newTaskInput:string;
    setNewTaskInput:(input:string) => void;
    setBoardState:(board:Board)=> void;
    updateTodoInDB:(todo:Todo,columnId:TypedColumn) => void; 

    addTask:(todo:string,columnId:TypedColumn,image?:File|null) => void;

    newTaskType:TypedColumn;
    setNewTaskType:(columnId:TypedColumn)=>void;

    searchString:string;
    setSearchString:(seachString:string) => void;

    deleteTask:(taskIndex:number,todoId:Todo,id:TypedColumn)=>void;

    image:File|null;
    setImage:(image:File|null) => void;
};

export const useBoardStore = create<BoardState>((set,get) => ({
    image:null,
    setImage:(image:File|null)=>set({image}),
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    searchString:"",
    newTaskInput:"",
    setSearchString:(searchString) => set({searchString}),
    getBoard: async () => {
        const board = await getTodosGroupedByColumn();
        set({ board })
    },
setNewTaskInput:(input:string)=>set({newTaskInput:input}),
    deleteTask:async(taskIndex:number,todo:Todo,id:TypedColumn)=>{
const newColumns = new Map(get().board.columns);
newColumns.get(id)?.todos.splice(taskIndex,1);
set({board:{columns:newColumns}});

if(todo.image){
    await storage.deleteFile(todo.image.bucketId,todo.image.fileId);
}

await databases.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    todo.$id,
)

    },
newTaskType:"todo",
setNewTaskType:(columnId:TypedColumn)=>set({newTaskType:columnId}),


    setBoardState: (board) => set({board}),
    updateTodoInDB:async(todo,columnId)=>{
await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    todo.$id,
    {
     title:todo.title,
     status:columnId    
    }
)
    },
    addTask:async(todo:string,columnId:TypedColumn,image?:File|null)=>{
       let File:Image|undefined;
       
       if(image){
        const fileUploaded = await uploadImage(image);

        if(fileUploaded){
            File={
                bucketId:fileUploaded.bucketId,
                fileId:fileUploaded.$id

            }
        }
       }

     const {$id} =  await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID!,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,ID.unique(),{
        title:todo,
        status:columnId,
        ...(File && {image:JSON.stringify(File)})
       })

       set({newTaskInput:""})
       set((state)=>{
        const newColumns = new Map(state.board.columns);

        const newTodo:Todo = {
            $id,
            $createdAt:new Date().toISOString(),
            title:todo,
            status:columnId,
            ...(File && {image:File})
        };
        const column = newColumns.get(columnId);

        if(!column){
            newColumns.set(columnId,{
                id:columnId,
                todos:[newTodo],
            });
        }else{
            newColumns.get(columnId)?.todos.push(newTodo);
        }

        return {
            board:{
                columns:newColumns
            }
        }
       })

    },
}))