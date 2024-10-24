import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login.jsx'
import Signup from './components/signup1.jsx'
import Dashboard from "./components/Dashboard.jsx"
import Query from './components/query.jsx'
import Chat_customer from './components/chat_customer.jsx'
import Assigned_queries from './components/assigned_queries.jsx'
import Edit_query from './components/edit_query.jsx'
import Create_query from './components/create_query.jsx'
import Post_free_query from './components/post_free_query.jsx'
import { CategoryProvider } from './components/context/categoryContext.jsx'
import Post_paid_query from './components/post_paid_query.jsx'
import UnAssignedQuery from './components/unassignedquries.jsx'
import Completedquries from './components/completed_quries.jsx'
import Inprogress from './components/inprogress.jsx'
import Meeting from './components/meeting.jsx'
import Chat_converse from './components/chat_converse.jsx'
import Subscription from './components/subscription.jsx'
import Subscription_list from './components/subscription_list.jsx'
import Pending_reviews from './components/pending_reviews.jsx'
import Edit_client from './components/edit_client.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/query",
    element: <Query />
  },
  {
    path: "/chat_customer",
    element: <Chat_customer />
  },
  {
    path: "/assignedqueries",
    element: <Assigned_queries />
  },
  {
    path: "/editquery",
    element: <Edit_query />
  },
  {
    path:"/create_query",
    element:<Create_query/>
  },
  {
    path:"/postfreequery",
    element:<Post_free_query/>
  },
  {
    path:"/post_paid_query",
    element:<Post_paid_query/>
  },
  {
    path:"/UnAssignedQuries",
    element:<UnAssignedQuery/>
  },
  {
    path:"/completedquries",
    element:<Completedquries/>
  },
  {
    path:"/inprogress",
    element:<Inprogress/>
  },
  {
    path:"/meeting",
    element:<Meeting/>
  },
  {
    path:"/chat_converse",
    element:<Chat_converse/>
  },
  {
    path:"/subscription",
    element:<Subscription/>
  },
  {
    path:"/subscription_list",
    element:<Subscription_list/>
  },
  {
    path:"/pending_reviews",
    element:<Pending_reviews/>
  },
  {
    path:"/edit_client",
    element:<Edit_client/>
  }
])


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // {/* // <Provider store={store}> */ }
  <CategoryProvider>
  <RouterProvider router={router} />
  </CategoryProvider>
  // <Testupload/>
  // <BrowserRouter>
  //  <Create_query/> 
    //  <Edit_query />
  //  </BrowserRouter >
    // {/* //  <App /> */}

    // {/* // // </Provider> */}
    // {/* //  </StrictMode> */}
)
