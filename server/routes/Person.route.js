const express = require("express")
const router = express.Router() 

const { createPerson, deletePerson, fetchAllPerson, fetchPerson, updatePerson } = require("../controllers/Person.controller.js")

router.route("/")
    .get(fetchAllPerson)
    .post(createPerson)

router.route("/:id")
    .get(fetchPerson)
    .patch(updatePerson)
    .delete(deletePerson)

module.exports = router 