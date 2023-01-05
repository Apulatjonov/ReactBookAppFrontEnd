import e from 'cors'
import React from 'react'

class Books extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allBooks: [],
            singleBook:{
                name: '',
                genre: '',
                id: ''
            }
        }
        this.getAllBooks = this.getAllBooks.bind(this)
        this.handleAddBook = this.handleAddBook.bind(this)
        this.getBook = this.getBook.bind(this)
        this.handleUpdateBook = this.handleUpdateBook.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
    }
    getAllBooks(){
        fetch('http://localhost:8080/api/books').then(res => res.json()).then(result => {
            this.setState({
                allBooks: result
            })
        }).catch(console.log)
    }

    deleteBook(e, id){
        console.log("ID: " + id)
        fetch('http://localhost:8080/api/bookDeleteById/' + id, {
            method: 'DELETE'
        }).then(
            this.getAllBooks()
        )
    }

    handleUpdateBook(){
        fetch('http://localhost:8080/api/books/' + this.state.singleBook.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.singleBook)
        }).then(
            this.getAllBooks()
        )
    }

    handleChangeOnName(e){
        this.setState({singleBook: {
            id: this.state.singleBook.id,
            name: e.target.value,
            genre: this.state.singleBook.genre
        }})
    }

    handleChangeOnID(a){
        this.setState({singleBook: {
            id: a.target.value,
            name: this.state.singleBook.name,
            genre: this.state.singleBook.genre
        }})
    }

    handleChangeOnGenre(e){
        this.setState({singleBook: {
            id: this.state.singleBook.id,
            name: this.state.singleBook.name,
            genre: e.target.value
        }})
    }

    handleAddBook(){
        fetch('http://localhost:8080/api/books/addBook', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.singleBook)
        }).then(this.setState({singleBook:{name: '',
        genre: '',
        id: 0}}))
        this.getAllBooks();
    }

    getBook(e, book){
        // fetch('http://localhost:8080/api/bookById/' + id).then(res => res.json()).then(result => {
            this.setState({
                singleBook: {name: book.name, id: book.id, genre: book.genre}
            })
        }

    render(){
        return (
            <div className='container'>
                <span className='title-bar'>
                <button className='btn btn-primary' type='button' onClick={this.getAllBooks}>Get Books</button>
                <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Book
                </button>
                </span>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.allBooks?.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.name}</td>
                            <td>{book.genre}</td>
                            <td>
                                <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={(e) => this.getBook(e, book)}>
                                    UPDATE
                                </button>
                                <button type="button" className="btn btn-info" onClick={(e) => this.deleteBook(e, book.id)}>
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                
                <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="UpdateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="UpdateModalLabel">Update book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor='titleUpdate'>Enter Book name </label>
                        <input type="text" id="titleUpdate" name='titleUpdate' onChange={this.handleChangeOnName.bind(this)} value={this.state.singleBook.name}/><br/>
                        <label htmlFor='genreUpdate'>Enter Book genre </label>
                        <input type="text" id="genreUpdate" name='genreUpdate' onChange={this.handleChangeOnGenre.bind(this)} value={this.state.singleBook.genre}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.handleUpdateBook}>Save Update</button>
                    </div>
                    </div>
                </div>
                </div>




                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor='bookId'>Enter Book ID </label>
                        <input type="text" id="bookId" name='bookId' onChange={this.handleChangeOnID.bind(this)} value={this.state.singleBook.id}/><br/>
                        <label htmlFor='title'>Enter Book name </label>
                        <input type="text" id="title" name='title' onChange={this.handleChangeOnName.bind(this)} value={this.state.singleBook.name}/><br/>
                        <label htmlFor='title'>Enter Book genre </label>
                        <input type="text" id="title" name='title' onChange={this.handleChangeOnGenre.bind(this)} value={this.state.singleBook.genre}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={this.handleAddBook}>Save Book</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Books