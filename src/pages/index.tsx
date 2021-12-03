import { Todo } from "../utils/types"
import Link from "next/link"

// Define the components props
interface IndexProps {
  todos: Array<Todo>
}

// define the page component
function Index(props: IndexProps) {
  console.log('props', props)
  const { todos } = props

  return (
    <div>
      <h1>My Todo List</h1>
      <h2>Click On Todo to see it individually</h2>
      {todos && todos.map(t => (
        <div key={t._id}>
          <Link href={`/todos/${t._id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {t.item} - {t.completed ? "completed" : "incomplete"}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(process.env.API_URL as string)
  const todos = await res.json()
  const teste = {
    teste:  'xxx'
  }

  // return props
  return {
    props: { todos, teste },
  }
}

export default Index
