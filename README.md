# WiFiAttendanceReactNative

This is a wifi attendence app 
using expo sandbox
using gifted chat with firebase.

# The flow of the app
Student 

1 => {
    Student Attempts to login to the WiFi Attendance app
        If Student uses device which was registered with mac address with courses.
            If Student connects to another classes wifi, he will be notified.
            Else Student Logs in Successfully.
        Else Student gets error message stating reason of login fail, either (Incorrect credentials/Invalid device MAC)
}
	
2 => {
    Student gets a modal popup and selects continue to get successfully logged into the app, which marks the attendance as present successfully.
        Student lands on Home Screen where he/she can view their attendance summary for that specific unit, attendance status, and current lecture summary.
        There is a bottom tab navigator which allows the student to access The Chat functionality.
    When and If WiFi disconnects, student automatically gets logged out of the app
}
	
3 => {
    Student is in Chat Tab, here student is allowed to chat anonymously with students, and students can openly put out their questions and views to the teachers.
    There is also a mechanism to upload files to the app server via the chat tab.
}

Teacher 

1 => {
    Teacher Attempts to login via WiFi Attendance app
        If Teacher uses device which has registered with mac address with courses.
            If Teacher connects to another classes wifi, he will be notified.
            Else Teacher Logs in Successfully.
        Else Teacher gets error message stating reason of login fail, either (Incorrect credentials/Invalid device MAC)
}
	
2 => {
    Teacher gets a modal popup and selects continue to get successfully logged into the app, Teacher lands on the home screen 
    where he/she is able to manage student attendance status and update it while the class is in process.
        There is a bottom tab navigator which allows the Teacher to access The Chat functionality.
    When and If WiFi disconnects, Teacher automatically gets logged out of the app
}
	
3 => {
    Teacher is in Chat Tab, here student is allowed to chat anonymously with students/teacher, and students can openly put out their questions and views to the teachers.
    There is also a mechanism to upload files to the app server via the chat tab.
}
	
# To run this app 
clone the app
have react native environment setup
Run npm install via command line and enjoy the app.

