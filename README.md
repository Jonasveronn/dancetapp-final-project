# 🕺💃 [DanceTapp!]
*Connecting dancers and event organizers through technology.*

## 🌟 Introduction
DanceTapp is an app designed to connect dancers and dance event organizers. Promote your events or search for them according to your preferences.

![DanceTapp Demo](https://i.gifer.com/placeholder.gif)

---

## ✨ Features
DanceTapp connects dancers and organizers by allowing users to:
- 🔍 Find nearby dance events with filters by location.
- 🗓️ Publish and manage events (organizers only).
- ❤️ Like, 🗨️ comment, and 🔄 share events.
- ⭐ Add events to favorites.
- 📅 Access a calendar with event schedules.
- 🛠️ Manage personal profiles: change password, email, and profile picture.

---

## 🎨 UX/UI Design
Explore the app's interface and user flows: [🌐 Figma Prototype](https://www.figma.com/proto/0u87rR655ioxblXuFer6mB/Untitled?node-id=0-1&t=uV9czdTHqqmrNzAg-1)

---

## 🛠️ Technical Details

### 📐 Architecture
DanceTapp is divided into the following components:
- **📱 App:** Mobile application developed in React.
- **🌐 API:** Backend for managing requests and business logic.
- **📂 DB:** MongoDB database for users, events, and roles.

---

### 🗂️ Data Models
#### 👤 User
| Field          | Type        | Description                               |
|-----------------|-------------|-------------------------------------------|
| `id`           | UUID        | Unique identifier                        |
| `name`         | String      | User's name                              |
| `email`        | String      | User's email                             |
| `profilePicture` | String    | URL to the user's profile picture        |
| `password`     | String      | Encrypted password                       |
| `role`         | String      | Role of the user (dancer | organizer)    |
| `permissions`  | Enum        | Permissions: read, write                 |
| `city`         | String      | User's city                              |
| `favorites`    | Array[Event]| List of favorited events                 |
| `createdAt`    | Date        | Timestamp of user creation               |

#### 🗓️ Event
| Field         | Type        | Description                               |
|---------------|-------------|-------------------------------------------|
| `id`          | UUID        | Unique identifier                        |
| `author`      | User.id     | Event creator                            |
| `type`        | Enum        | Event type (Sociales, Escuelas, etc.)    |
| `images`      | Array[String]| URLs of event images                    |
| `text`        | String      | Event description (max: 200 characters)  |
| `date`        | Date        | Event date                               |
| `location`    | Object      | Event location details                   |
| - `type`      | String      | Type of location (Point)                 |
| - `coordinates` | Array[Number] | Latitude and longitude                |
| - `address`   | String      | Full address                             |
| - `province`  | String      | Province                                 |
| `likes`       | Array[User.id]| Users who liked the event              |
| `createdAt`   | Date        | Timestamp of event creation              |

#### 💬 Comment
| Field         | Type        | Description                               |
|---------------|-------------|-------------------------------------------|
| `id`          | UUID        | Unique identifier                        |
| `author`      | User.id     | Comment creator                          |
| `text`        | String      | Comment text (max: 200 characters)       |
| `createdAt`   | Date        | Timestamp of comment creation            |

---

### ⚙️ Tech Stack
- **Frontend:** [⚛️ React](https://reactjs.org/), HTML, CSS, JavaScript, [🎨 TailwindCSS](https://tailwindcss.com/)
- **Backend:** [🌐 Node.js](https://nodejs.org/) + [📡 Express](https://expressjs.com/)
- **Database:** [🛢️ MongoDB](https://www.mongodb.com/)
- **Authentication:** [🔐 JWT](https://jwt.io/)
- **Testing:** [✅ Mocha](https://mochajs.org/) & [💡 Chai](https://www.chaijs.com/)
- **Map Integration:** [📍 Leaflet.js](https://leafletjs.com/)
- **Geocoding:** Integration with [📍 Nominatim API](https://nominatim.org/)

---

## ✅ Test Coverage
![Test Coverage 1](image.png)
![Test Coverage 2](image-1.png)

---

## 📅 Planning
Track the development progress here: [📝 TO DO List](https://github.com/b00tc4mp/isdi-bootcamp-202409/issues/233)
