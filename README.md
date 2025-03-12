# EduConnect - College Management System  

## Overview  
EduConnect is a comprehensive College Management System designed to streamline administrative processes, enhance communication, and improve the educational experience for students, faculty, and administrators. The platform brings all aspects of college management into a single integrated system.  

---

## Features  

### For Students  
- Dashboard: Access to notices, attendance records, and upcoming tests  
- Attendance Tracking: View personal attendance records across subjects  
- Test Results: Monitor academic performance and assignment marks  
- Document Upload: Submit assignments and important documents  
- Profile Management: Update personal information and keep records current  

### For Faculty  
- Student Management: Track student attendance and performance metrics  
- Test Creation: Create and manage assignments and tests for different classes  
- Mark Uploading: Record and update student marks in a centralized system  
- Notice Publishing: Post announcements for specific classes or departments  
- Profile Management: Update personal information and credentials  

### For Administrators  
- User Management: Create and manage student and faculty accounts  
- Department Management: Organize academic departments and subjects  
- Notice Management: Post institution-wide announcements  
- Academic Oversight: Monitor overall institutional performance metrics  

---

## Technology Stack  
- **Frontend**: React, Redux, Tailwind CSS  
- **Backend**: Express.js, Node.js  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **File Storage**: Base64 encoding  

---

## Installation  

### Prerequisites  
- Node.js (v14+)  
- MongoDB  
- Git  

### Setup Instructions  
1. **Clone the repository**  
```bash
git clone https://github.com/your-repo/educonnect.git
cd educonnect
```

2. **Setup Backend**  
- Create a `.env` file in the `server` directory with:  
```
MONGODB_URI=your-mongodb-uri  
JWT_SECRET=your-jwt-secret  
```

3. **Setup Frontend**  
```bash
cd client  
npm install  
```

4. **Run the Application**  
- Start the backend server:  
```bash
cd server  
npm install  
npm start  
```
- Start the frontend application:  
```bash
cd client  
npm start  
```

5. **Access the Application**  
- Frontend: http://localhost:3000  
- Backend API: http://localhost:5002  

---

## Project Structure  
```
EduConnect/  
├── .gitignore  
├── LICENSE  
├── README.md  
├── client/  
│   ├── .gitignore  
│   ├── package.json  
│   ├── tailwind.config.js  
│   ├── public/  
│   │   └── logo.jpeg  
│   └── src/  
│       ├── App.js  
│       ├── index.css  
│       ├── index.js  
│       ├── components/  
│       │   ├── admin/  
│       │   ├── faculty/  
│       │   ├── login/  
│       │   ├── notices/  
│       │   ├── student/  
│       │   └── homepage/  
│       ├── redux/  
│       └── utils/  
├── server/  
│   ├── .env  
│   ├── .env.example  
│   ├── .gitignore  
│   ├── index.js  
│   ├── package.json  
│   ├── Procfile  
│   ├── controller/  
│   │   ├── adminController.js  
│   │   ├── facultyController.js  
│   │   └── studentController.js  
│   ├── middleware/  
│   │   └── auth.js  
│   ├── models/  
│   │   ├── admin.js  
│   │   ├── faculty.js  
│   │   ├── notice.js  
│   │   ├── student.js  
│   │   ├── subject.js  
│   │   └── test.js  
│   └── routes/  
│       ├── adminRoutes.js  
│       ├── facultyRoutes.js  
│       └── studentRoutes.js  

```

---

## User Flows  

### Student Workflow  
1. Login with provided credentials  
2. View dashboard with notices, attendance, and upcoming tests  
3. Check test results and assignment marks  
4. Upload assignments and documents  
5. Update personal information  

### Faculty Workflow  
1. Login with provided credentials  
2. Access student performance data  
3. Create tests and assignments  
4. Upload marks for students  
5. Post notices for students  

### Admin Workflow  
1. Login with admin credentials  
2. Create/manage faculty and student accounts  
3. Manage departments and subjects  
4. Post institution-wide notices  
5. Monitor system usage and performance  

---

## Default Login Credentials  
| Role     | Username | Password |  
|----------|----------|----------|  
| Admin    | admin    | admin     |  

---

## Contributing Guidelines  
1. **Fork the repository**  
2. **Create your feature branch**  
```bash
git checkout -b feature/amazing-feature  
```
3. **Commit your changes**  
```bash
git commit -m "Add some amazing feature"  
```
4. **Push to the branch**  
```bash
git push origin feature/amazing-feature  
```
5. **Open a Pull Request**  

---

## License  
This project is licensed under the **MIT License** – see the LICENSE file for details.  

---

## Team  
- **Knight_Photons** – HackNova  

---

## Acknowledgments  
- React and Node.js communities for excellent documentation  
- MongoDB for flexible data storage  
- TailwindCSS for streamlined styling  
- Everyone who contributed to the development and testing  

---

## Similar Code and License Matches  
This project contains code similar to other open-source projects under the following license types:  
- MIT License  
- Apache License 2.0  

---

**EduConnect – Streamlining College Management**  

---
