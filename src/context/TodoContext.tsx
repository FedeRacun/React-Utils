import { createContext, useContext, useState } from "react";

// ===================== Create Context |
interface TodoContextType {
  items: string[]
  completedItems: string[]
  addItem: (newItem: string) => void
  removeItem: (index: number) => void
  completeItem: (index: number) => void
}
const TodoContext = createContext<TodoContextType | undefined>(undefined)

// ===================== Provider |
export interface Props {
  children: React.ReactNode
}
export function TodoProvider({ children }: Props) {

  const [items, setItems] = useState<string[]>([])
  const [completedItems, setCompletedItems] = useState<string[]>([])

  const addItem = (newItem: string) => {
    console.log('Se añade: ', newItem)
    setItems([...items, newItem])
  }

  const completeItem = (index: number) => {
    const itemComplete = items[index]
    setCompletedItems((prevItems) => [...prevItems, itemComplete])
    removeItem(index);
  }

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  return (
    <TodoContext.Provider
      value={{
        items,
        completedItems,
        addItem,
        completeItem,
        removeItem
      }}
    >
      {children}
    </TodoContext.Provider>
  )

}

// ===================== Use Context |
export const useTodoContext = () => {
  const context = useContext(TodoContext)

  if (!context) throw new Error('useTodoContext must be used within an TodoProvider')

  return context
}