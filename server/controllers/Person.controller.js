const ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")

const asyncHandler = require("../utils/asyncHandler.js")
const { Persons } = require("../models")

const createPerson = asyncHandler(async(req, res) => {
    const { name, email, phoneNumber, dateOfBirth } = req.body 
    
    if([ name, email, phoneNumber, dateOfBirth ].every((field) => field?.trim() === "")) {
        throw ApiError(401, "All details are required to create person!")
    }
    try{
        const reqPerson = req.body 
        reqPerson.phoneNumber = parseInt(reqPerson.phoneNumber);
        reqPerson.dateOfBirth = new Date(reqPerson.dateOfBirth)

        const results = await Persons.create(reqPerson)
        return res.status(201)
            .json(new ApiResponse(200, results, "Person created succesfully!"))
    } catch(error) {
        throw new ApiError(500, {}, `Some error while creating person! ${error}`)
    }
})

const fetchAllPerson = asyncHandler(async(req, res) => {
    let results;
    try{
        results = await Persons.findAll() 
        console.log(results)
        return res.status(200).json(new ApiResponse(200, results, "All persons fetched succesfully!"))
    } catch(error) {
        return new ApiError(500, `Some error while fetching persons: ${error}`)
    }
})

const fetchPerson = asyncHandler(async(req, res) => {
    const { id } = req.params 
    if(!id) {
        throw new ApiError(401, "Person is required to update!")
    }

    try{
        const person = await Persons.findByPk(id);
        if(person) {
            return res.status(201)
            .json(new ApiResponse(200, person, "Person created succesfully!"))
            
        } else {
            throw new ApiError(401, "No such user exists!")
        }
    } catch(error) {
        return new ApiError(500, `Some error while fetching persons: ${error}`)
    }
})

const updatePerson = asyncHandler(async(req, res) => {
    const reqPerson = req.body
    const { id } = req.params 

    if(!id) {
        throw new ApiError(401, "Person is required to update!")
    }
    if(!(reqPerson.name || reqPerson.email || reqPerson.phoneNumber || reqPerson.dateOfBirth)){
        throw new ApiError(401, "Details are required to update person!")
    }
    const fetchPerson = await Persons.findByPk(id); 
    try{
        
        if(!reqPerson.name || reqPerson.name == "") {
            reqPerson.name = fetchPerson.name 
        }
        if(!reqPerson.email || reqPerson.email == "") {
            reqPerson.email = fetchPerson.email 
        }
        if(!reqPerson.phoneNumber || reqPerson.phoneNumber == "") {
            reqPerson.phoneNumber = fetchPerson.phoneNumber 
        }
        if(!reqPerson.dateOfBirth || reqPerson.dateOfBirth == "") {
            reqPerson.dateOfBirth = fetchPerson.dateOfBirth 
        }
    } catch(error) {
        throw new ApiError(500, {}, `Some error while fetching person to update! ${error}`)
    }
    try{
        const updatedPerson = await Persons.update(reqPerson, {
            where: {
                id: id
            }
        }); 
        if(updatedPerson[0] === 1) {
            const person = await Persons.findOne({ where: {
                id: id 
            }})
            return res.status(200)
            .json(new ApiResponse(200, person, "Person updated succesfully!"))
        }
    } catch(error) {
        console.log(error)
        throw new ApiError(500, {}, `Some error while updating the person! ${error}`)
    }
    
})

const deletePerson = asyncHandler(async(req, res) => {
    const { id } = req.params 
    if(!id) {
        throw new ApiError(401, "Person is required to update!")
    }

    try{
        const person = await Persons.findByPk(id);
        if(!person) {
            throw new ApiError(404, "Person not found!")
        } 

        const deletedPerson = await person.destroy(); 
        
        if(deletedPerson) {
            return res.status(200)
            .json(new ApiResponse(200, {}, "Person deleted succesfully!"))
        } else {
            return res.status(200)
            .json(new ApiResponse(200, {}, "Person already deleted!"))
        }
    } catch(error) {
        return new ApiError(500, {}, `Some error while deleting persons: ${error}`)
    }
})   

module.exports = { createPerson, deletePerson, fetchAllPerson, fetchPerson, updatePerson }