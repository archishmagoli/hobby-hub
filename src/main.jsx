import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout';
import DetailView from './routes/DetailView';
import CreatePost from './routes/CreatePost';
import EditPost from './routes/EditPost'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} path='/' element={<App />} />
          <Route index={false} path="/create" element={<CreatePost />} />
          <Route index={false} path="/details/:id" element={<DetailView />} />
          <Route index={false} path="/details/:id/edit" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
