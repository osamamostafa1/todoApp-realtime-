const Todo = require('../models/todo.model')


//@desc     Get all todos
//@route    GET /api/vi/auth/todos
//@access   public
exports.getTodos = async (req, res, next) => {

    try {

        const todo = await Todo.find()
        res.status(200).json({ success: true, data: todo })

    } catch (err) {
        next(err)
    }

}


//@desc     Get single todo
//@route    GET /api/vi/auth/todos/:id
//@access   Private/Admin
exports.getTodo = async (req, res, next) => {

    try {

        const todo = await Todo.findById(req.params.id)
        res.status(200).json({ success: true, data: todo })

    } catch (err) {
        next(err)
    }

}


//@desc     Create Todo
//@route    POST /api/v1/todos
//@access   Public
exports.createTodo = async (req, res, next) => {
    const io = req.app.get('io')

    try {

        const todo = await Todo.create(req.body).then(() => {
            io.emit('changeData')
        })

        res.status(201).json({ success: true, data: todo })

    } catch (err) {
        next(err)
    }

}


//@desc     Update todo
//@route    POST /api/vi/auth/todos/:id
//@access   Public
exports.updateTodo = async (req, res, next) => {
    const io = req.app.get('io')
    try {

        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).then(() => {
            io.emit('changeData')
        })
        res.status(200).json({ success: true, data: todo })

    } catch (err) {
        next(err)
    }

}


//@desc     Delete todo
//@route    DELETE /api/vi/auth/todos/:id
//@access   Private/Admin
exports.deletetodo = async (req, res, next) => {
    const io = req.app.get('io')
    try {

        await Todo.findByIdAndDelete(req.params.id).then(() => {
            io.emit('changeData')
        })
        res.status(200).json({ success: true, data: {} })

    } catch (err) {
        next(err)
    }

}