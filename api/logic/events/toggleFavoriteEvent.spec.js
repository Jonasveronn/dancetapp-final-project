import "dotenv/config"

import * as chai from "chai"
import chaiAsPromised from "chai-as-promised"

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Event } from "dat"
import { errors } from "com"

const { NotFoundError } = errors

import toggleFavoriteEvent from "./toggleFavoriteEvent.js"

describe("toggleFavoriteEvent", () => {
  before(() => db.connect(process.env.MONGO_URL_TEST))

  beforeEach(() => Promise.all([User.deleteMany(), Event.deleteMany()]))

  it("add a favorites to an event if the user exists", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    const event = await Event.create({
      author: user.id,
      images: [
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      ],
      type: "Sociales",
      text: "A bailar!",
      date: new Date("2024-12-07"),
      location: {
        type: "Point",
        address: "Barcelona",
        province: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      },
    })

    await toggleFavoriteEvent(user._id.toString(), event._id.toString())

    const updatedUser = await User.findById(user._id.toString()).lean()

    expect(updatedUser.favorites).to.have.lengthOf(1)
    expect(updatedUser.favorites[0].toString()).to.equal(event._id.toString())
  })

  it("delete a user's favorite event", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })
    const event = await Event.create({
      author: user.id,
      images: [
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      ],
      type: "Sociales",
      text: "A bailar!",
      date: new Date("2024-12-07"),
      likes: [user.id],
      location: {
        type: "Point",
        address: "Barcelona",
        province: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      },
    })
    const user2 = await User.create({
      name: "Juan Carlos",
      email: "juancarlos@dancer.com",
      password: "123123123",
      favorites: [event.id],
    })

    await toggleFavoriteEvent(user2._id.toString(), event._id.toString())

    const updatedUser = await User.findById(user._id).lean()

    expect(updatedUser.favorites).to.have.lengthOf(0)
  })

  it("if the user does not exist", async () => {
    const event = await Event.create({
      author: "012345678901234567890123",
      images: [
        "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
      ],
      type: "Sociales",
      text: "A bailar!",
      date: new Date("2024-12-07"),
      location: {
        type: "Point",
        address: "Barcelona",
        province: "Barcelona",
        coordinates: [41.3870154, 2.1700471],
      },
    })
    await expect(
      toggleFavoriteEvent("012345678901234567890123", event._id.toString())
    ).to.be.rejectedWith(NotFoundError, /^user not found$/)
  })

  it("if the event does not exist", async () => {
    const user = await User.create({
      name: "Carlos Diaz",
      email: "carlos@dancer.com",
      password: "123123123",
    })

    await expect(
      toggleFavoriteEvent(user._id.toString(), "012345678901234567890123")
    ).to.be.rejectedWith(NotFoundError, /^event not found$/)
  })

  after(() => db.disconnect())
})
